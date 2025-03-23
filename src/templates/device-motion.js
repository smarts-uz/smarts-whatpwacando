import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import 'elements/device-motion.js';
import {isTouchScreen, isAndroidEdge, isAndroidChrome} from 'lib/utils.js';

const supported = 'DeviceMotionEvent' in window && isTouchScreen();
const noSensorPermission = supported && !('requestPermission' in DeviceMotionEvent);

export const template = `
<div class="view next-screen" id="device-motion-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Device motion</h2>
    
    ${!supported ? '<p class="no-support">This feature is not (yet) supported on your device</p>' : ''}
    
    <p>
      The DeviceMotionEvent gives information about the speed of changes for the position and orientation of the user's device.
    </p>
    
    <p>
      Shake your device to see the red dot below move.
    </p>
    
    <p id="enable-sensors">You may need to enable access to motion sensors, 
    <a id="sensor-button2">show me how</a></p>
    
    <device-motion></device-motion>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent" target="_blank" rel="noopener">
        DeviceMotionEvent on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=deviceorientation" target="_blank" rel="noopener">
        DeviceMotion and DeviceOrientation on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
