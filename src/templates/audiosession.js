import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton-group.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="audiosession-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>AudioSession API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Audio Session API configures how audio from web apps should mix with audio from native apps.
    </p>
    
    <h3>Demo</h3>
    
    <p>
      On a supporting device, play audio from another native app (for example, Music on iOS) and then also play the 
      audio below with the radiobutton "auto" selected. You will notice the audio from the other app will be paused.
    </p>
    
    <p>
      If you restart the audio from the other app and then play the audio below again with the radiobutton "transient" 
      selected, you will notice the audio from the other app will not be paused but will be mixed with this audio.
    </p>
    
    <p>
      If you do it the other way around and start audio from this app first and then play audio from another app with the 
      radiobutton "auto" selected, you will notice that the audio from this app will be paused.
    </p>
    
    <p>
      If you play audio from this app and then switch to another app with the radiobutton "transient" selected, the 
      audio will be paused but if you then switch back to this app, the audio will resume playing. If you keep the 
      audio from the other app playing when you switch back to this app, the audio will be mixed with the audio from the 
      other app.
    </p>
    
    <material-radiobutton-group name="audiosession-type">
      <material-radiobutton slot="radio" label="auto" value="auto" checked></material-radiobutton>
      <material-radiobutton slot="radio" label="transient" value="transient"></material-radiobutton>
    </material-radiobutton-group>

    <audio controls src="src/thievery-corporation.mp3"></audio>
    
    <code-snippet lang="js">

    </code-snippet>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Media_Session_API" target="_blank" rel="noopener">
          Media Session API on MDN
        </a>
      </p>
      
      <h3>Browser support</h3>
      <a href="../https@caniuse.com/#search=mediasession" target="_blank" rel="noopener">
        MediaSession API on caniuse.com
      </a>
    </section>
  </div>
</div>
`;
