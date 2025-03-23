import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-textfield.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-dropdown.js';
import 'elements/speech-synthesis.js';

export const template = `
<div class="view next-screen" id="speech-synthesis-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Speech synthesis</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
  
    <p>
      Speech synthesis provides text-to-speech and allows apps to read out their text content.
    </p>
    
    <speech-synthesis></speech-synthesis>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" target="_blank" rel="noopener">
        SpeechSynthesis API on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=speech-synthesis" target="_blank" rel="noopener">
          SpeechSynthesis API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
