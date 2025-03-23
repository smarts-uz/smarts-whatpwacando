import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-progress.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="background-fetch-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Background Fetch API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    <p class="no-support-ios">This feature is implemented in Safari but not yet functional</p>
    
    <p>
      The Background Fetch API enables an app to download large files in the background even when the app is not running.
      It pauses the downloads when the app is offline and continues to download when the app is back online.
    </p>
    
    <p>
      The downloading can even be started while the app is offline. The process will then be started once the app is 
      online again.
    </p>
    
    <h3>Demo</h3>
    <p>
      Below you can start downloading three files at a deliberately slow speed to simulate a large download. Close the 
      app to see the downloads continue in the background. Go offline (for example, by enabling flight mode) to see that 
      the downloads are paused. Go back online to see the downloads continue in the background.
    </p>
    
    <p>
      When downloads are running in the background and you open the app again, you will see the progress continue.
    </p>
    
    <p>
      <material-button id="clear" label="Clear all" raised></material-button>
    </p>
    
    <ul class="tracklist">
      <li>
        <span>
          <img src="src/img/media/mirror-conspiracy64x64.jpeg">
          <span class="track-info">
            <span>Thievery Corporation</span>
            <span>Track 1</span>
          </span>
          <material-button data-track="1">
            <i class="material-icons" translate="no" slot="left-icon">download</i>
          </material-button>
          <material-progress value="0" max="100" circle="36" id="track-1"></material-progress>
        </span>
      </li>
      <li>
        <span>
          <img src="src/img/media/mirror-conspiracy64x64.jpeg">
          <span class="track-info">
            <span>Thievery Corporation</span>
            <span>Track 2</span>
          </span>
          <material-button data-track="2">
            <i class="material-icons" translate="no" slot="left-icon">download</i>
          </material-button>
          <material-progress value="0" max="100" circle="36" id="track-2"></material-progress>
        </span>
      </li>
      <li>
        <span>
          <img src="src/img/media/mirror-conspiracy64x64.jpeg">
          <span class="track-info">
            <span>Thievery Corporation</span>
            <span>Track 3</span>
          </span>
          <material-button data-track="3">
            <i class="material-icons" translate="no" slot="left-icon">download</i>
          </material-button>
          <material-progress value="0" max="100" circle="36" id="track-3"></material-progress>
        </span>
      </li>
    </ul>
   
<!--    <code-snippet lang="js">-->

<!--    </code-snippet>-->
    
    <h3>Documentation</h3>
    <p>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API" target="_blank" rel="noopener">
        Background Fetch API on MDN</a>
    </p>
    
    <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/@search=serviceworkerregistration_backgroundfetch" target="_blank" rel="noopener">
          Background Fetch API on caniuse.com
        </a>
      </p>
  </div>
</div>
`;
