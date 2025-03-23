import {isInstalled, isIOSSafari} from 'src/lib/utils.js';

export const controller = () => {
  const supported = 'webkitSpeechRecognition' in window;
  let recorder;
  let stream;
  const audioPlayer = document.querySelector('audio');
  const speechRecognition = document.querySelector('speech-recognition');
  const recordButton = document.querySelector('#record-button');
  const stopButton = document.querySelector('#stop-button');
  const recognizeIndicator = document.querySelector('#recognize-indicator');
  function isMediaStreamTrackSupported() {
    const iframe = document.createElement("iframe");
    iframe.src = URL.createObjectURL(new Blob([], { type: "text/html" }));
    document.body.appendChild(iframe);
  
    const recognition = new iframe.contentWindow.webkitSpeechRecognition();
    iframe.remove();
  
    try {
      recognition.start(0);
      return false;
    } catch (error) {
      return error.name == "TypeError";
    }
  }

  let mediaStreamTrackSupported = isMediaStreamTrackSupported();

  document.querySelector('#media-stream-track-supported').style.display = mediaStreamTrackSupported ? 'block' : 'none';

  recordButton.addEventListener('click', async () => {
    stream = await navigator.mediaDevices.getUserMedia({audio: true});
    speechRecognition.disabled = true;
    recordButton.disabled = true;
    stopButton.disabled = false;
    recordAudio(stream);
  });

  stopButton.addEventListener('click', () => {
    recorder.stop();
    stream.getTracks().forEach(track => track.stop());
    stopButton.disabled = true;
    recognizeIndicator.style.display = 'block';
  });

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(supported && isIOSSafari() && isInstalled()) {
    document.querySelector(`[data-view="${location.pathname}"] .no-support-ios`).style.display = 'block';
  }

  const recordAudio = (stream) => {
    const chunks = [];
    const mimeTypes = [
      {
        type: 'audio/mpeg',
        ext: 'mp3'
      },
      {
        type: 'audio/webm',
        ext: 'webm',
      },
      {
        type: 'audio/mp4',
        ext: 'mp4'
      }
    ];

    const isSupportedMimeType = ({type}) => MediaRecorder.isTypeSupported(type);
    const defaultMime = {type: 'audio/mpeg', ext: 'mp3'};

    const mimeType = 'isTypeSupported' in MediaRecorder ? mimeTypes.find(isSupportedMimeType) : defaultMime;

    recorder = new MediaRecorder(stream);

    const options = {type: `${mimeType.type}`};

    recorder.start(250);

    const handleStopRecording = async () => {
      const recording = new Blob(chunks, options);

      const reader = new FileReader();

      reader.onloadend = e => {
        audioPlayer.src = e.target.result;
        audioPlayer.onloadedmetadata = () => {
          audioPlayer.play().then(() => {
            const stream = audioPlayer.captureStream();
            const tracks = stream.getTracks();

            if (tracks.length > 0) {
              speechRecognition.startRecognition(tracks[0]);
            } else {
              console.error('No tracks found in the stream');
            }
          }).catch(error => {
            console.error('Error playing audio:', error);
          });
          audioPlayer.onended = () => {
            speechRecognition.stopRecognition();
            speechRecognition.disabled = false;
            recordButton.disabled = false;
            recognizeIndicator.style.display = 'none';
          };
        };
      };

      reader.readAsDataURL(recording);
    };

    const processChunk = ({data}) => {
      if(data !== undefined && data.size !== 0) {
        chunks.push(data);
      }
    };

    recorder.addEventListener('dataavailable', processChunk);
    recorder.addEventListener('stop', handleStopRecording);
  }
}
