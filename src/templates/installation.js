import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'src/elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="installation-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Installation</h2>
    
    <p>
      Progressive Web Apps can be installed to the home screen on mobile devices and desktop on laptops and desktop 
      computers. On Chromium based browsers, the <code>beforeinstallprompt</code> event is fired when the web app is 
      eligible to be installed. This event will display a native install dialog that includes a button to install the 
      web app.
    </p>
    
    <h2>Demo</h2>
    <p>
      Click the "Install" button below to install this web app. In supporting browsers, the native install dialog will 
      appear and in non-supporting browsers, a bottom sheet with instructions how to install this web app will be 
      displayed. 
    </p>
    
    <p>
      <material-button id="install-button" label="Install to home screen" raised>
        <i class="material-icons" translate="no" slot="left-icon">add_to_home_screen</i>
      </material-button>
    </p>
    
    <h2>Handling the install prompt</h2>
    <p>
      A best-practice is to defer the display of the install dialog using <code>event.preventDefault()</code> and 
      displaying it when it makes more sense, for example, when the user explicitly clicks a button to install the web 
      app.
    </p>
    
    <code-snippet>
      <span lang="js">
let deferredEvent;

window.addEventListener('beforeinstallprompt', (e) => {
  // prevent the browser from displaying the default install dialog
  e.preventDefault();
  
  // Stash the event so it can be triggered later when the user clicks the button
  deferredEvent = e;
});

installButton.addEventListener('click', () => {
  // if the deferredEvent exists, call its prompt method to display the install dialog
  if(deferredEvent) {
    deferredEvent.prompt();
  }
});
      </span>
    </code-snippet>
    
    <p>
      For a web app to be eligible to be installed, it must meet some technical requirements:
    </p>
      
    <ul>
      <li>The web app must have a manifest.json file</li>
      <li>The web app must be served over https</li>
    </ul>      
    
    <p>
      The manifest.json file tells the browser how the PWA should appear and behave on the device and for a web app to 
      be installable it must have the following required members:
    </p>
      
    <ul>
      <li><code>name</code> or <code>short_name</code></li>
      <li><code>icons</code> must contain a 192px and a 512px icon</li>
      <li><code>start_url</code></li>
      <li><code>display</code> and/or <code>display_override</code></li>
      <li><code>prefer_related_applications</code> must be <code>false</code> or not present</li>
    </ul>
    
    <p>For a description of these members, see the 
      <a href="../https@developer.mozilla.org/en-US/docs/Web/Manifest" target="_blank">
        Web app manifest reference
      </a>
    </p>
    
    <p>
      In addition to these required members, a description of the web app and an optional array of screenshots can be 
      included that will be shown in the native install dialog, bringing the install process closer to that of native 
      apps. 
    </p>
    
    <p>
      Screenshots must follow these criteria:
    </p>

    <ul>
      <li>Width and height must be at least 320px and at most 3,840px.</li>
      <li>The maximum dimension can't be more than 2.3 times as long as the minimum dimension.</li>
      <li>All screenshots with the same form factor value must have identical aspect ratios.</li>
      <li>Only JPEG and PNG image formats are supported.</li>
      <li>Only eight screenshots will be shown. If more are added, the user agent simply ignores them.</li>
    </ul>
      
    <p>
      In addition, all screenshots must have a <code>form_factor</code> property that indicates whether the screenshot is 
      displayed on mobile devices (value is "narrow") or desktop devices (value is "wide").
    </p>  
    
    <code-snippet>
      <span lang="html">
&lt;!doctype html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;!-- manifest.json must be included on each page like this --&gt;
    &lt;link rel="manifest" href="manifest.json"&gt;
    
  &lt;/head&gt;
  &lt;body&gt;&lt;/body&gt;
&lt;/html&gt;
      
      </span>
      <span lang="json">
{
  "name": "What PWA Can Do Today",
  "short_name": "PWA Today",
  "description": "What PWA Can Do Today is a showcase of what is possible with Progressive Web Apps today.\\n\\nThe app is itself a Progressive Web App which means it can be installed to the home screen of your mobile device or to your desktop.",
  "id": "pwa-today",
  "start_url": "@source=pwa",
  "display": "standalone",
  "icons": [
    {
      "src": "src/img/icons/manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "src/img/icons/manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    },
  ],
  "screenshots": [
    {
      "src": "src/img/screenshots/shot1.png",
      "sizes": "400x822",
      "type": "image/png",
      "form_factor": "narrow"   <--- screenshot for mobile devices
    },
    {
      "src": "src/img/screenshots/shot7.png",
      "sizes": "1280x676",
      "type": "image/png",
      "form_factor": "wide"     <--- screenshot for desktop devices
    },
  ]
}  
      </span>
      
      <span lang="js">
// handle the beforeinstallprompt event 
window.addEventListener('beforeinstallprompt', e => {
  // prevent the install dialog from appearing too early
  e.preventDefault();

  // store the event for later use
  window.deferredPrompt = e;
});

// event listener for the install button click
installButton.addEventListener('click', () => {
  if(window.deferredPrompt) {
    // call the prompt method on the deferredPrompt object to display the install dialog
    window.deferredPrompt.prompt();
  }
  else {
    // show a dialog with instructions for browsers that don't support beforeinstallprompt
  }
}
      </span>
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable" target="_blank" rel="noopener">
        Making Progressive Web Apps Installable on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        The <code>beforeinstallprompt</code> event and the <code>screenshots</code> member of the manifest.json file are 
        supported in Chromium based browsers, including Chrome, Edge, and Opera. For other browsers, you need to display 
        a dialog with instructions on how to install the web app. 
      </p>
    </section>
  </div>
</div>
`;
