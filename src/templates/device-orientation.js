import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import 'elements/device-orientation.js';

export const template = `
<div class="view next-screen" id="device-orientation-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Sensors</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
  
    <p>
      The DeviceOrientationEvent gives information about the physical orientation of the user's device.
    </p>
    
    <p>
      Change the orientation of your device to see the cube below move.
    </p>
    
    <p id="enable-sensors">You may need to enable access to motion sensors, 
    <a id="sensor-button1">show me how</a></p>
  
    <device-orientation></device-orientation>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent" target="_blank" rel="noopener">
        DeviceOrientationEvent on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=deviceorientation" target="_blank" rel="noopener">
            DeviceOrientation and DeviceMotion on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
