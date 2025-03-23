export const controller = () => {
  const userMediaSupported = ('mediaDevices' in navigator) && ('getUserMedia' in navigator.mediaDevices);
  const mediaCaptureSupported = 'capture' in document.createElement('input');
  const mediaRecorderSupported = 'MediaRecorder' in window;

  const supported = !userMediaSupported && mediaCaptureSupported ? `Your device only supports recording of 
audio and video.` : `Your device supports live streaming and recording of audio and video.`;

  let autoPipSupported = true;
  try {
    navigator.mediaSession.setActionHandler("enterpictureinpicture", () => {});
  }
  catch(e) {
    autoPipSupported = false;
  }

  if(autoPipSupported) {
    document.querySelector('.auto-pip-supported').style.display = 'block';
  }

  document.querySelector('#supported-info').innerText = supported;

  if(!mediaRecorderSupported) {
    document.querySelector('#mediarecorder-support').style.display = 'block';
  }
}
