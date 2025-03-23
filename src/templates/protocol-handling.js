import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="protocol-handling-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Protocol Handling</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      Protocol handling enables web apps to register their ability to open links with particular URL schemes, also known 
      as protocols.
    </p>
    <p>
      This means that a web app can for example register itself as an app that will open links like 
      <code>web+foo://bar</code>. In this case, the app will register the protocol <code>web+foo</code> as the protocol 
      it can handle.
    </p>
    <p>
      If a user chooses the web app as the default app to open links with this protocol, the web app will be opened when 
      a link with this protocol is clicked.
    </p>
    
    <h2>Demo</h2>
    
    <p>
      Install this app and then click the "Open link page" link below. This will open a page in your default browser that 
      contains a list of links with the <code>web+pwatoday</code> protocol. Close the installed app and then click one 
      of the links. Each link will open a demo page in the installed app.
    </p>
    
    <p>
      Web apps can register as protocol handlers by adding the protocol handler to the manifest.json file or through 
      <code>navigator.registerProtocolHandler()</code>.
    </p>
    
    <p>
      <a href="../https@protocol-handler-demo.glitch.me" target="_blank" rel="noopener">Open link page</a>
    </p>

    <code-snippet>
    
    <span lang="json">
// manifest.json    
"protocol_handlers": [
  {
    "protocol": "web+pwatoday",
    "url": "protocol-handler-page@type=_25s"
  }
]    
    </span>
    <span lang="js">
// javascript    
navigator.registerProtocolHandler(
  'web+pwatoday', 
  'protocol-handler-page@type=_25s'
);
   
    </span>
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.chrome.com/docs/web-platform/best-practices/url-protocol-handler" target="_blank" rel="noopener">
        Protocol handler registration on Chrome developers.
      </a>

      <h3>Browser support</h3>
      <p>
        The File Handling API is supported on Chrome 96+ and Edge 96+.
      </p>
    </section>
  </div>
</div>
`;
