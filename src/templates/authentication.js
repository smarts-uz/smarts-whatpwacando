import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-loader.js';
import '_40dannymoerkerke/material-webcomponents/src/material-dialog.js';

const supported = 'credentials' in navigator;

export const template = `
<div class="view next-screen" id="authentication-demo">
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
      <p>Your device is currently offline.<br>Authentication will not work.</p>
    </header>
  </div>
  
  <div class="content">
    <h2>Web Authentication</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      Web Authentication API (WebAuthn) enables passwordless authentication through iOS FaceID, your device's fingerprint 
      reader or an external USB Security Key.
    </p>
    
    <p>
      Register a credential using the button below and choose if you would like to authenticate using FaceID, your 
      fingerprint or USB Security Key.
    </p>
    
    <p>
      After that, you can authenticate using the registered credential.
    </p>
    
    <h3>Demo</h3>
    
    <div id="demo-buttons">
      <material-button id="register-button" label="Register credential" raised></material-button>
      <material-button id="authenticate-button" label="Authenticate with credential" raised></material-button>
      <i class="material-icons" translate="no" id="loader">autorenew</i>
      
      <material-dialog id="auth-dialog">
        <h3 slot="header">Web Authentication</h3>
        <p slot="body"></p>
        <footer slot="footer">
          <material-button label="Close" id="close-dialog"></material-button>
        </footer>
      </material-dialog>
      
    </div>
    <material-button id="delete-button" label="Delete credential" raised>
    <i class="material-icons" translate="no" slot="left-icon">delete</i>
    </material-button>
    
    <section>
      <h3>Code</h3>
      <p>
        Check the webauthn-demo repo for the source code of this demo: 
      </p>
      <p> 
        <a href="../https@github.com/DannyMoerkerke/webauthn-demo" target="_blank" rel="noopener">
          https://github.com/DannyMoerkerke/webauthn-demo
        </a>
      </p>
    </section>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API">Web Authentication API on MDN</a>
      </p>
    
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=webauthn">Web Authentication API on caniuse.com</a>
      </p>
    </section>
  </div>
</div>
`;
