import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-progress.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="bluetooth2-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Web Bluetooth API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Web Bluetooth API enables apps to connect to Bluetooth Low Energy (BLE) devices and read values from or write 
      values to it.
    </p>
    
    <p>
      <label>
        BGM serial number
        <input type="text" id="bgm-serial-number">
      </label>
    </p>
       
    <material-button id="scan" label="Connect" raised></material-button>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web" target="_blank" rel="noopener">
        Interact with Bluetooth devices on the Web on developers.google.com
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=web-bluetooth" target="_blank" rel="noopener">
            Web Bluetooth API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
