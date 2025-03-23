import {CustomElement} from '../_40dannymoerkerke/custom-element/dist/custom-element.es.js';
import '../_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '../_40dannymoerkerke/material-webcomponents/src/material-progress.js';
import '../_40dannymoerkerke/material-webcomponents/src/material-dialog.js';
import {isTouchScreen, isIOS} from '../lib/utils.js';

export class WebCam extends CustomElement {
  #internals;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    const mediaRecorderSupported = 'MediaRecorder' in window;
    this.mediaRecorderSupported = mediaRecorderSupported;

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --video-width: 100%;
          --video-height: 300px;
        }
        
        @media screen and (min-width: 1024px) {
          :host {
            --video-width: 50%;
            --video-height: 450px;
          }
        }
        
        #container {
          position: relative;
          width: var(--video-width);
          background-color: #cccccc;
          perspective: 300px;
        }
        
        #video-container {
          height: var(--video-height);
          max-height: var(--video-height);
          transform-style: preserve-3d;
          transform-origin: center left;
          transition: transform 0.8s ease-out;
        }
        
        #video-container.rear-view {
          transform: translate(100%) rotateY(180deg);
        }
        
        #front-camera, 
        #rear-camera {
          position: absolute;
          top: 0;
          left: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        #rear-camera {
          transform: rotateY(180deg);
        }
        
        #preview-container {
          position: relative;
        }
        
        video {
          width: 100%;
          object-fit: cover;
        }
        
        canvas {
          position: absolute;
          visibility: hidden;
        }
        
        #video-buttons {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          z-index: 3;
        }
        
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        
        material-button {
          cursor: pointer;
          display: block;
        }
        material-button:not(#init-video) {
          display: none;
        }
        
        :host(:state(capturing)) :is(#record-video, #stop-video, #suspend-video) {
          display: block;
        }
        
        :host(:state(capturing):state(pipsupported)) #pip {
          display: block;
        }
       
        
        :host(:state(capturing)) #init-video {
          display: none;
        }
        :host(:state(capturing):state(autopipsupported)) #pip-label {
          display: flex;
        }
        
        /* no custom states supported */
        :host([capturing]) :is(#record-video, #stop-video, #suspend-video) {
          display: block;
        }
        
        :host([capturing][pipsupported]) #pip {
          display: block;
        }
        
        :host([capturing]) #init-video {
          display: none;
        }
        :host([capturing][autopipsupported]) #pip-label {
          display: flex;
        }
        
        #close-video {
          position: absolute;
          top: 0;
          right: 0;
        }
        
        #record-video,
        #stop-record-video {
          --font-color: #ff0000;
        }
        
        :host(:state(recording)) #record-video {
          display: none;
        }
        :host(:state(recording)) :is(#stop-video, #stop-record-video) {
          display: block;
        }
        :host(:state(recording):state(pipsupported)) #pip {
          display: block;
        }
        
        /* no custom states supported */
        :host([recording]) #record-video {
          display: none;
        }
        :host([recording]) :is(#stop-video, #stop-record-video) {
          display: block;
        }
        :host([recording][pipsupported]) #pip {
          display: block;
        }
        
        #download a {
          color: #000000;
          text-decoration: none;
        }
        #download a i {
          display: block;
          width: 100%;
          height: 100%;
        }
        
        #pip-label {
          display: none;
          align-items: center;
          padding-inline: 6px;
          background-color: #e2e2e2;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
        }
        #automatic-pip {
          margin-right: 6px;
        }
        
        :host(:state(videorecorded)) :is(#preview-container, #play, #close-video, #download) {
          display: block;
        }
        
        :host(:state(videorecorded):state(playing)) #play {
          display: none;
        }       
        :host(:state(videorecorded):state(playing)) #pause {
          display: block;
        } 
        
        :host(:state(videorecorded)) :is(#stop-video, #record-video, #stop-record-video, #video-container, #init-video, #pip-label) {
          display: none;
        }
        
        :host(:state(videorecorded):state(pipsupported)) #pip {
          display: block;
        }
        
        :host(:state(videorecorded):state(airplaysupported)) #airplay {
          display: block;
        }
        
        :host(:state(suspended)) :is(#record-video, #suspend-video, #pip, #pip-label) {
          display: none;
        }
        :host(:state(suspended)) #start-video {
          display: block;
        }
        
        #host(:state(hasrearcamera)) #toggle-camera {
          display: block;
        }
        
        /* no custom states supported */
        :host([videorecorded]) :is(#preview-container, #play, #close-video, #download) {
          display: block;
        }
        
        :host([videorecorded][playing]) #play {
          display: none;
        }       
        :host([videorecorded][playing]) #pause {
          display: block;
        } 
        
        :host([videorecorded]) :is(#stop-video, #record-video, #stop-record-video, #video-container, #init-video, #pip-label) {
          display: none;
        }
        
        :host([videorecorded][pipsupported]) #pip {
          display: block;
        }
        
        :host([videorecorded][airplaysupported]) #airplay {
          display: block;
        }
        
        :host([suspended]) :is(#record-video, #suspend-video, #pip, #pip-label) {
          display: none;
        }
        :host([suspended]) #start-video {
          display: block;
        }
        
        #host([hasrearcamera]) #toggle-camera {
          display: block;
        }
        
        @media all and (display-mode: picture-in-picture) {
          :is(#pip, #pip-label) {
            display: none !important;
          }
        }
        
        :host([no-auto-pip]) #pip-label {
           display: none !important;
        }
      </style>
      
      <div id="container">
        <canvas></canvas>
        
        <div id="video-container">
          <video id="front-camera" autoplay playsinline></video>
          <video id="rear-camera" autoplay playsinline></video>
        </div>
        
        <div id="preview-container" hidden>
          <video id="preview" playsinline></video>
          <material-button id="close-video" raised>
            <i class="material-icons" slot="left-icon">clear</i>
          </material-button>
        </div>
        
        <div id="video-buttons">
          <material-button id="init-video" raised>
            <i class="material-icons" slot="left-icon">video_call</i>
          </material-button>
          
          <material-button id="start-video" raised>
            <i class="material-icons" slot="left-icon">videocam</i>
          </material-button>
          
          <material-button id="suspend-video" raised>
            <i class="material-icons" slot="left-icon">videocam_off</i>
          </material-button>
          
          <material-button id="toggle-camera" raised>
            <i class="material-icons" slot="left-icon">switch_video</i>
          </material-button>
          
          <material-button id="pip" raised>
            <i class="material-icons" slot="left-icon">picture_in_picture_alt</i>
          </material-button>
          
          <material-button id="airplay" raised>
            <i class="material-icons" slot="left-icon">airplay</i>
          </material-button>
          
          <material-button id="record-video" raised ${!mediaRecorderSupported ? 'disabled' : ''}>
            <i class="material-icons" slot="left-icon">fiber_manual_record</i>
          </material-button>
          
          <material-button id="stop-record-video" raised ${!mediaRecorderSupported ? 'disabled' : ''}>
            <i class="material-icons" slot="left-icon">stop</i>
          </material-button>
          
          <material-button id="stop-video" raised>
            <i class="material-icons" slot="left-icon">power_settings_new</i>
          </material-button>
          
          <label id="pip-label">
            <input type="checkbox" id="automatic-pip"> Automatic Picture-in-Picture
          </label>
          
          <material-button id="play" raised>
            <i class="material-icons" slot="left-icon">play_arrow</i>
          </material-button>
          
          <material-button id="pause" raised>
            <i class="material-icons" slot="left-icon">pause</i>
          </material-button>
          
          <material-button id="download" raised>
            <a download="video.mp4" id="download-link" slot="left-icon" target="_blank">
              <i class="material-icons">get_app</i>
            </a>
          </material-button>
        </div>
      </div>      
      
      <material-dialog id="permission-dialog">
        <h3 slot="header">No access to media</h3>
        <p slot="body">Your device does not have permission to access the camera and microphone. Please enable this in your device's 
        settings.</p>
        <div slot="footer">
          <material-button id="dialog-close" label="Close" raised></material-button>
        </div>
    </material-dialog>
      
    `;

    this.constraints = {
      audio: false,
      video: {
        facingMode: 'user'
      }
    };

    this.userMediaSupported = ('mediaDevices' in navigator) && ('getUserMedia' in navigator.mediaDevices);
    this.mediaCaptureSupported = 'capture' in document.createElement('input');
    this.nativePipSupported = 'pictureInPictureEnabled' in document;
    this.safariPipSupported = document.createElement('video').webkitSupportsPresentationMode &&
      typeof document.createElement('video').webkitSetPresentationMode === 'function';

    this.pictureInPictureSupported = !isIOS() && (this.nativePipSupported || this.safariPipSupported);

    this.airPlaySupported = this.hasAttribute('airplay') ?
      'WebKitPlaybackTargetAvailabilityEvent' in window :
      false;
  }

  connectedCallback() {
    if(!this.#internals && this.supportsInternals()) {
      this.#internals = this.attachInternals();
    }

    this.setState('pipsupported', this.pictureInPictureSupported);
    this.setState('airplaysupported', this.airPlaySupported);
    this.setState('hasrearcamera', this.hasRearCamera());

    this.container = this.select('#container');
    this.videoContainer = this.select('#video-container');
    this.previewContainer = this.select('#preview-container');
    this.preview = this.select('#preview');
    this.canvas = this.select('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.frontCamera = this.select('#front-camera');
    this.rearCamera = this.select('#rear-camera');
    this.initButton = this.select('#init-video');
    this.startButton = this.select('#start-video');
    this.suspendButton = this.select('#suspend-video');
    this.stopButton = this.select('#stop-video');
    this.pipButton = this.select('#pip');
    this.airPlayButton = this.select('#airplay');
    this.recordButton = this.select('#record-video');
    this.closeButton = this.select('#close-video');
    this.playButton = this.select('#play');
    this.pauseButton = this.select('#pause');
    this.downloadButton = this.select('#download');
    this.stopRecordButton = this.select('#stop-record-video');
    this.toggleCameraButton = this.select('#toggle-camera');
    this.downloadLink = this.select('#download-link');
    this.permissionDialog = this.select('#permission-dialog');
    this.dialogCloseButton = this.select('#dialog-close');
    this.automaticPipCheckbox = this.select('#automatic-pip');
    this.video = this.getCurrentCamera();

    this.initButton.addEventListener('click', this.initVideo.bind(this, this.constraints));
    this.startButton.addEventListener('click', this.startVideo.bind(this));
    this.suspendButton.addEventListener('click', this.suspendVideo.bind(this));
    this.stopButton.addEventListener('click', this.stopVideo.bind(this));
    this.playButton.addEventListener('click', this.playVideoPreview.bind(this));
    this.pauseButton.addEventListener('click', this.pauseVideoPreview.bind(this));
    this.closeButton.addEventListener('click', this.closeVideo.bind(this));
    this.toggleCameraButton.addEventListener('click', this.toggleCamera.bind(this));

    this.pipButton.addEventListener('click', this.startPictureInPicture.bind(this));

    this.airPlayButton.addEventListener('click', () => this.video.webkitShowPlaybackTargetPicker());

    this.video.addEventListener('webkitplaybacktargetavailabilitychanged', ({availability}) => {
      this.airPlayButton.disabled = !(availability === 'available');
    });


    this.dialogCloseButton.addEventListener('click', e => this.permissionDialog.close());

    if(this.mediaRecorderSupported) {
      this.recordButton.addEventListener('click', this.recordVideo.bind(this));
      this.stopRecordButton.addEventListener('click', this.stopRecordVideo.bind(this));
    }

    this.video.onwebkitpresentationmodechanged = this.restartVideo.bind(this);
    this.video.onplaying = this.onPlaying.bind(this);

    this.preview.onended = () => {
      this.setState('playing', false);
    };

    if(this.getState('adopted')) {
      this.onPlaying();
    }

    const showFirstFrame = () => {
      this.preview.currentTime = 0.1;
      this.preview.pause();
      this.previewContainer.scrollIntoView(false);
    };

    this.preview.addEventListener('loadeddata', showFirstFrame);

    // set autoplay so 'loadeddata' event is thrown in Safari on iOS so first frame can be shown as poster
    if(this.mediaCaptureSupported && !this.userMediaSupported) {
      this.preview.setAttribute('autoplay', '');
    }
  }

  onPlaying() {
    if(!this.video.classList.contains('initialized')) {
      const {width} = this.video.getBoundingClientRect();
      const {height} = this.videoContainer.getBoundingClientRect();

      this.css([this.frontCamera, this.rearCamera, this.preview, this.container, this.videoContainer, this.previewContainer], {
        width: `${width}px`,
        height: `${height}px`
      });

      this.canvas.setAttribute('width', width);
      this.canvas.setAttribute('height', height);

      this.frontCamera.classList.add('initialized');
      this.rearCamera.classList.add('initialized');
    }

    this.constraints.video.facingMode === 'environment' ? this.videoContainer.classList.add('rear-view') : this.videoContainer.classList.remove('rear-view');
  }

  getCurrentCamera() {
    return this.constraints.video.facingMode === 'user' ? this.frontCamera : this.rearCamera;
  }

  async initVideo(constraints) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoTrack = this.stream.getVideoTracks()[0];

      this.startVideo();
    }
    catch(e) {
      this.permissionDialog.open();
    }
  }

  startVideo() {
    // controls need to be switched on and off for Safari to work (https://bugs.webkit.org/show_bug.cgi?id=262479)
    this.video.controls = true;
    this.video.srcObject = this.stream;
    this.video.controls = false;

    this.setState('suspended', false);
    this.setState('capturing', true);

    this.dispatchEvent(new CustomEvent('capturing', {composed: true, bubbles: true}));

    try {
      navigator.mediaSession.setActionHandler("enterpictureinpicture", () => {
        if(this.automaticPipCheckbox.checked) {
          this.video.requestPictureInPicture();
        }
      });

      this.setState('autopipsupported', true);
    }
    catch(e) {
      console.warn('automatic picture-in-picture not supported');
    }
  }

  suspendVideo() {
    this.setState('suspended', true);
    this.video.srcObject = null;
  }

  async stopVideo() {
    if(this.isPictureInPictureActive()) {
      await this.stopPictureInPicture();
    }

    this.stopTracks();

    this.setState('capturing', false);
    this.automaticPipCheckbox.checked = false;

    this.videoContainer.innerHTML = '';

    this.videoContainer.insertAdjacentHTML('afterbegin', `
      <video id="front-camera" autoplay playsinline></video>
      <video id="rear-camera" autoplay playsinline></video>
    `);

    this.frontCamera = this.select('#front-camera');
    this.rearCamera = this.select('#rear-camera');
    this.video = this.getCurrentCamera();

    this.video.onwebkitpresentationmodechanged = this.restartVideo.bind(this);
    this.video.onplaying = this.onPlaying.bind(this);

    this.dispatchEvent(new CustomEvent('stopped', {composed: true, bubbles: true}));
  }

  restartVideo() {
    if(this.video.paused) {
      this.video.play();
    }
  }

  recordVideo() {
    const mimeType = 'video/mpeg';
    const chunks = [];

    this.recorder = new MediaRecorder(this.stream);

    this.recorder.start();
    this.setState('capturing', false);
    this.setState('recording', true);

    const processVideo = () => {
      const recording = new Blob(chunks, {type: 'video/mp4'});
      this.preview.src = URL.createObjectURL(recording);
      this.video = this.preview;
      this.video.onwebkitpresentationmodechanged = this.restartVideo.bind(this);

      const reader = new FileReader();

      reader.onloadend = e => {
        this.downloadLink.href = e.target.result;
      };

      reader.readAsDataURL(recording);
    };

    const processChunk = ({data}) => {
      if(data !== undefined && data.size !== 0) {
        chunks.push(data);
      }
    };

    this.recorder.addEventListener('dataavailable', processChunk);
    this.recorder.addEventListener('stop', processVideo);
  }

  stopRecordVideo() {
    this.recorder.stop();
    this.stopTracks();
    this.setState('recording', false);
    this.setState('videorecorded', true);
  }

  playVideoPreview() {
    this.preview.play();
    this.setState('playing', true);
  }

  pauseVideoPreview() {
    this.preview.pause();
    this.setState('playing', false);
  }

  startPictureInPicture() {
    this.nativePipSupported ? this.video.requestPictureInPicture() : this.video.webkitSetPresentationMode('picture-in-picture');
  }

  stopPictureInPicture() {
    return this.nativePipSupported ? document.exitPictureInPicture() : this.video.webkitSetPresentationMode('inline');
  }

  isPictureInPictureActive() {
    return this.nativePipSupported ? !!document.pictureInPictureElement : this.video.webkitPresentationMode === 'picture-in-picture';
  }

  closeVideo() {
    if(this.isPictureInPictureActive()) {
      this.stopPictureInPicture();
    }

    this.preview.src = '';
    this.video = this.getCurrentCamera();
    this.setState('videorecorded', false);
  }

  stopTracks() {
    this.stream.getTracks().map(track => track.stop());
    this.stream = null;
  }

  toggleCamera() {
    this.stopTracks();

    const {facingMode} = this.constraints.video;

    this.constraints.video.facingMode = facingMode === 'user' ? 'environment' : 'user';
    this.video = this.getCurrentCamera();
    this.video.onplaying = this.onPlaying.bind(this);
    this.video.onwebkitpresentationmodechanged = this.restartVideo.bind(this);

    this.initVideo(this.constraints);
  }

  hasRearCamera() {
    return this.videoTrack && this.videoTrack.getCapabilities().facingMode
      && this.videoTrack.getCapabilities().facingMode.length;
  }

  supportsInternals() {
    return 'ElementInternals' in window && 'attachInternals' in this;
  }

  supportsCustomStates() {
    return 'CustomStateSet' in window;
  }

  setState(name, state) {
    if(this.supportsInternals() && this.supportsCustomStates()) {
      if(state) {
        console.log('set state', name);
        this.#internals.states.add(name);
      }
      else {
        console.log('remove state', name);
        this.#internals.states.delete(name);
      }
    }
    else {
      if(state) {
        this.wrapper.setAttribute(name, '');
      }
      else {
        this.wrapper.removeAttribute(name);
      }
    }
  }

  getState(name) {
    return this.supportsInternals() && this.supportsCustomStates() ? this.#internals.states.has(name) : this.wrapper.hasAttribute(name.substring(2));
  }
}

customElements.define('web-cam', WebCam);
