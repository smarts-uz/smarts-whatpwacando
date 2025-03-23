import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'src/elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="offline-support-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Offline support</h2>
    
    <p>
      Web apps can register a Service Worker to implement offline support. 
    </p>
    
    <p>
      A Service Worker is a special kind of Web Worker that serves as a proxy for the web app, allowing it to intercept 
      and control network requests. When a request is made while the web app is offline, the Service Worker can intercept 
      it and serve a response from its cache. This cache typically contains static assets like images, stylesheets, 
      JavaScript etc. but it can also contain full HTML pages. In addition to this, it can also defer requests that are 
      made while the user is offline and retry them later when the network is back. 
    </p>
    
    <h2>Demo</h2>
    <p>
      Disconnect your device from the internet by switching off your WiFi or put your device in Airplane Mode. Vist any 
      demo in this app and notice how they keep working (with exception of demos that require network access like 
      geolocation for example).
    </p>
    
    <p>
      To implement offline support for your web app, you can use this 
      <a href="../https@github.com/DannyMoerkerke/basic-service-worker" target="_blank">Basic Service Worker</a> that is 
      also used in What PWA Can Do Today.
    </p>
    
    <p>
      It also takes care of installing a new version of your web app automatically and as soon as possible.
    </p>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API" target="_blank" rel="noopener">
        Service Worker API on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        The Service Worker API is supported in all modern browsers.
      </p>
    </section>
  </div>
</div>
`;
