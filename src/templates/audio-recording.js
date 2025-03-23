import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/audio-recorder/dist/audio-recorder.js';

const userMediaSupported = ('mediaDevices' in navigator) && ('getUserMedia' in navigator.mediaDevices);
const mediaRecorderSupported = 'MediaRecorder' in window;

export const template = `
<div class="view next-screen" id="audio-recording-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Audio recording</h2>
    
    <p>
      This demo captures audio through the device's microphone and enables recording using the MediaRecorder API.
    </p>
    
    <p>
      It provides real-time frequency analysis and displays the recording audio as a waveform using the Web Audio API.
    </p>
    
    <p>
      The recorded file can be downloaded or saved to the device's file system using the Native File System API when
      supported.
    </p>
    
    <p id="mediarecorder-support">
      On iOS, you may need to enable MediaRecorder in:<br>
      Settings > Safari > Advanced > Experimental Features > MediaRecorder
    </p>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
  
    <section>
      <audio-recorder bars="40"></audio-recorder>
    </section>
    
    <section>
      <h3>Code</h3>
      <p>
        Check the audio-recorder repo for the source code of the Web Component that was used in this demo: 
      </p>
      <p> 
        <a href="../https@github.com/DannyMoerkerke/audio-recorder" target="_blank" rel="noopener">
          https://github.com/DannyMoerkerke/audio-recorder
        </a>
      </p>
    </section>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia" target="_blank" rel="noopener">
          getUserMedia on MDN
        </a>
      </p>
      
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/MediaRecorder" target="_blank" rel="noopener">
          MediaRecorder on MDN
        </a>
      </p>
      
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" target="_blank" rel="noopener">
          Web Audio API on MDN
        </a>
      </p>
      
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=stream" target="_blank" rel="noopener">
          getUserMedia on caniuse.com
        </a>
      </p>
      <p>
        <a href="../https@caniuse.com/@search=mediarecorder" target="_blank" rel="noopener">
          MediaRecorder on caniuse.com
        </a>
      </p>
      <p>
        <a href="../https@caniuse.com/@search=web%20audio%20api" target="_blank" rel="noopener">
          Web Audio API on caniuse.com
        </a>
      </p>
    </section>

  </div>
  
  <material-dialog id="mic-permission-dialog">
    <h3 slot="header">No access to media</h3>
    <p slot="body">Your device does not have permission to access the microphone. Please enable this in your device's 
    settings.</p>
    <div slot="footer">
      <material-button id="dialog-close" label="Close" raised></material-button>
    </div>
  </material-dialog>
</div>
`;
