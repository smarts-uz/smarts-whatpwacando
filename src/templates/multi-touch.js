import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/multi-touch.js';

export const template = `
<div class="view next-screen" id="multi-touch-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Multi touch</h2>
    
    <p>
      On a device with touch screen, place two fingers in the square below to see a red circle appear. Move your fingers 
      to change the size and position of the circle.
    </p>
  
    <multi-touch></multi-touch>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/TouchEvent" target="_blank" rel="noopener">
        TouchEvent on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=mdn-api_touchevent" target="_blank" rel="noopener">
          TouchEvent on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
