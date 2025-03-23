import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/google-map.js';

export const template = `
<div class="view next-screen" id="geolocation-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  <div class="network-status">
    <header>
      <i class="material-icons" translate="no">wifi_off</i>
      <p>Your device is currently offline.<br>Geolocation will not work.</p>
    </header>
  </div>
  
  <div class="content">
    <h2>Geolocation</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Geolocation API enables users to share their location with a web app. Below you will see your current location 
      on a Google Map.
    </p>
    
    <h3>Demo</h3>
    
    <google-map api-key="AIzaSyCMUcOHbCnwHLo9KpKcvXjjNutAfm1wB3g"></google-map>
    
    <section class="documentation">
    
    <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Geolocation_API">Geolocation API on MDN</a>
      </p>
    
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=geolocation">Geolocation API on caniuse.com</a>
      </p>
    </section>
  </div>
</div>
`;
