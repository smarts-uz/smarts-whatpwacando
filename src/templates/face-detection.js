import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-dialog.js';
import '_40dannymoerkerke/material-webcomponents/src/material-checkbox.js';
import 'elements/face-detector.js';

export const template = `
<div class="view next-screen" id="face-detection-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Face detection</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    <p class="no-support-ios">From iOS 17 this feature can be enabled in Settings &gt; 
Safari &gt; Advanced &gt; Feature Flags &gt; Shape Detection API. Currently, this feature does not work on iOS 18.</p>
    
    <p>
      The Shape Detection API detects faces and in some browsers also features like eyes, mouth, and nose.
    </p>
    
    <p>
      Detect your face using the button below using the camera of your device. When a face is detected, a box will 
      be drawn around it which will follow the face.
    </p>
    
    <p>
      Check the checkbox to also show detection of the eyes, nose and mouth.
    </p>
    
    <h3>Demo</h3>
    
    <material-checkbox label="Show eyes, nose and mouth" id="facial-features"></material-checkbox>
    <div id="demo-buttons">
      <material-button id="scan-button-face" label="Detect face" raised></material-button>
      <material-button id="stop-scan-button-face" label="Stop detection" raised disabled></material-button>
    </div>
      
    <face-detector></face-detector>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.chrome.com/en/articles/shape-detection/default.htm">Shape Detection API on Google Developers</a>
      </p>
    
      <h3>Browser support</h3>
      <p>
        This demo currently only works on Chrome Canary and Edge Canary with the Experimental Web Platform features flag 
        enabled and Safari Tech Preview with the Shape Detection API feature flag enabled.
      </p>
    </section>
  </div>
</div>
`;
