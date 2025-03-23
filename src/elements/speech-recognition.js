import '../_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '../_40dannymoerkerke/material-webcomponents/src/material-checkbox.js';

export class SpeechRecognition extends HTMLElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    this.audioContext = null;

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          width: 100%;
        }
        #audio-visualizer {
          width: 100%;
          height: 80px;
          background-color: #cccccc;
          display: none;
        }
        #results {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        textarea {
          margin-top: 10px;
          border: 1px solid #cccccc;
          width: 100%;
          background-color: var(--main-background);
          color: var(--base-font-color);
          font-size: 1em;
        }
        #interim {
          height: 70px;
        }
        #final {
          flex-grow: 1;
          min-height: 130px;
        }
        #interim-results {
          display: none;
        }
        #start, 
        #stop {
          display: inline-block;
          margin-bottom: 15px;
        }
        p {
          margin-bottom: 0;
        }
        material-button {
          --font-color: var(--base-font-color);
          --button-color: var(--base-3);
        }
      </style>
      
      <canvas id="audio-visualizer"></canvas>
            
      <material-button id="start" label="Start recognition" raised></material-button>      
      <material-button id="stop" label="Stop recognition" raised></material-button>
      
      <div id="results">
        <material-checkbox label="Show interim results"></material-checkbox>
        <div id="interim-results">
          <p><strong>Interim results</strong></p>
          <textarea id="interim" readonly></textarea>
        </div>
        
        <p><strong>Final result</strong></p>
        <textarea id="final" readonly></textarea>
      </div>
    `;
  }

  connectedCallback() {
    this.canvas = this.shadowRoot.querySelector('#audio-visualizer');
    this.canvasContext = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.interim = this.shadowRoot.querySelector('#interim');
    this.final = this.shadowRoot.querySelector('#final');
    this.startButton = this.shadowRoot.querySelector('#start');
    this.stopButton = this.shadowRoot.querySelector('#stop');
    const interimSwitch = this.shadowRoot.querySelector('material-checkbox');
    const interimResults = this.shadowRoot.querySelector('#interim-results');

    this.stopButton.style.display = 'none';

    this.recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : null;

    if(this.recognition) {
      this.checkAudio();

      this.recognition.lang = 'en-EN';
      this.recognition.interimResults = true;
      this.recognition.continuous = true;

      this.startButton.addEventListener('click', () => this.startRecognition());
      this.stopButton.addEventListener('click', () => this.stopRecognition());
      interimSwitch.addEventListener('change', e => {
        interimResults.style.display = e.detail.checked ? 'block' : 'none';
      });

      this.recognition.addEventListener('result', this.processSpeech.bind(this));

      this.recognition.addEventListener('start', async () => {
        // await this.initAudio();
      });

      this.recognition.addEventListener('end', () => {

        this.startButton.style.display = '';
        this.stopButton.style.display = 'none';
      });

      this.recognition.addEventListener('audiostart', () => {
      });

      this.recognition.addEventListener('audioend', () => {
      });

      this.recognition.addEventListener('soundstart', () => {
      });

      this.recognition.addEventListener('soundend', () => {
      });

      this.recognition.addEventListener('speechstart', () => {
      });

      this.recognition.addEventListener('speechend', () => {
      });

      this.recognition.addEventListener('error', (e) => {
        console.log('recognition error', e);
      });
    }
    else {
      this.startButton.disabled = true;
    }
  }

  attributeChangedCallback(attr, oldVal, newVal) {

  }

  set disabled(value) {
    this.startButton.disabled = value;
    this.stopButton.disabled = value;
  }

  startRecognition(mediaStreamTrack) {
    this.prevText = '';

    try {
      if(mediaStreamTrack) {
        this.recognition.start(mediaStreamTrack);
      }
      else {
        this.recognition.start();
      }

      this.startButton.style.display = 'none';
      this.stopButton.style.display = '';

      this.interim.value = '';
      this.final.value = '';
    }
    catch(e) {
      console.log('ERROR', e);

      this.recognition.stop();
      this.startButton.style.display = '';
      this.stopButton.style.display = 'none';
    }
  }

  stopRecognition() {
    this.recognition.stop();
    // this.stream.getTracks().forEach(track => track.stop());
    // this.clearCanvas();

    this.startButton.style.display = '';
    this.stopButton.style.display = 'none';
  }

  processSpeech(e) {
    const {results, resultIndex} = e;

    if(results === undefined) {
      this.recognition.onend = null;
      this.recognition.stop();

      return;
    }

    [...results].slice(resultIndex).map(result => {
      const {transcript, confidence} = result[0];
      const text = this.formatResult(transcript);
      const finalText = text !== this.prevText || result.isFinal ? text : '';

      this.prevText = finalText;

      result.isFinal && confidence > 0 ? this.final.value += finalText : this.interim.value = transcript;
    });
  }

  formatResult(result) {
    return `${result.substr(0, 1).toUpperCase()}${result.substr(1)}. `;
  }

  reset() {
    this.interim.value = '';
    this.final.value = '';
  }

  async checkAudio() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const audioInputs = devices.filter(device => device.kind === 'audioinput');

    if(audioInputs.length > 1) {
      // this.canvas.style.display = 'block';
    }
  }

  async initAudio() {
    try {
      this.audioContext = this.audioContext || new AudioContext();
      this.stream = await navigator.mediaDevices.getUserMedia({audio: true});
      this.audioSource = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.audioSource.connect(this.analyser);
      this.visualizeAudio();
    }
    catch(e) {
      console.log(e);
    }
  }

  clearCanvas() {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  visualizeAudio() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const barWidth = (this.canvasWidth / bufferLength) * 2.5;

    this.clearCanvas();

    const draw = () => {
      requestAnimationFrame(draw);
      this.analyser.getFloatFrequencyData(dataArray);
      this.canvasContext.fillStyle = 'rgb(255, 255, 255)';
      this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      let x = 0;

      dataArray.map((_, i) => {
        const barHeight = (dataArray[i] + 140) * 2;

        this.canvasContext.fillStyle = '#ff0000';
        this.canvasContext.fillRect(x, this.canvasHeight - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      });
    };

    draw();
  }
}

customElements.define('speech-recognition', SpeechRecognition);
