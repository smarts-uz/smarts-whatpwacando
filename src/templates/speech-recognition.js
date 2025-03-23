import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import 'elements/speech-recognition.js';

export const template = `
<div class="view next-screen" id="speech-recognition-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Speech recognition</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p class="no-support-ios">
      This feature works in Safari on iOS but not (yet) for installed web apps.
    </p>
    
    <p>
      Speech recognition is part of the Web Speech API and provides the ability to recognize voice context from an 
      audio input.
    </p>

    <h2>Demo</h2>

    <p>
      Click "Start recognition" and speak into your microphone to start the speech recognition.
      Click "Stop recognition" to stop the speech recognition. You should see the results of the 
      speech recognition. Check "Show interim results" to see the interim results of the speech recognition.
    </p>

    <div id="media-stream-track-supported">
      <p>
        Your browser also supports recognizing speech from audio sources other than the microphone.
        Click "Record" to start recording audio from your microphone.
        Click "Stop recording" to stop the recording. After stopping the recording, the audio will play and speech 
        recognition will start using the audio you just recorded.
      </p>
      
      <div class="buttons">
        <material-button id="record-button" label="Record" raised></material-button>
        <material-button id="stop-button" label="Stop recording" raised disabled></material-button>
        <p id="recognize-indicator">
          Recognizing speech from audio...
        </p>
      </div>
    </div>
        
    <audio></audio>
    <speech-recognition></speech-recognition>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition" target="_blank" rel="noopener">
        SpeechRecognition API on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/speech-recognition" target="_blank" rel="noopener">
          SpeechRecognition API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
