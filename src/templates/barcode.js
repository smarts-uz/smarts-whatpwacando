import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-dialog.js';
import 'elements/barcode-reader.js';

export const template = `
<div class="view next-screen" id="barcode-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Barcode and QR code reader</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    <p class="no-support-ios">From iOS 17 this feature can be enabled in Settings &gt; 
Safari &gt; Advanced &gt; Feature Flags &gt; Shape Detection API. Currently, this feature does not work on iOS 18.</p>
    <p>
      The Barcode Detection API detects barcodes and QR codes in images
    </p>
    
    <p>
      Scan a code using the button below using the camera of your device.
    </p>
    
    <p>
      When a URL is detected, you will be asked if you want to navigate to it.
    </p>
    
    <h3>Demo</h3>
    
    <div id="demo-buttons">
      <material-button id="scan-button" label="Scan code" raised></material-button>
      <material-button id="stop-scan-button" label="Stop scan" raised disabled></material-button>
    </div>
      
    <barcode-reader></barcode-reader>
    
    <material-dialog id="code-dialog">
      <h3 slot="header">Code detected</h3>
      <p slot="body"></p>
      <footer slot="footer">
        <material-button label="Cancel" id="cancel-dialog"></material-button>
        <material-button label="Ok" id="close-dialog"></material-button>
      </footer>
    </material-dialog>
      
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API">Barcode Detection API on MDN</a>
      </p>
    
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/mdn-api_barcodedetector">Barcode Detection API on caniuse.com</a>
      </p>
    </section>
  </div>
</div>
`;
