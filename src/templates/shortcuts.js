import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import 'src/elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="shortcuts-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Shortcuts</h2>
    
    <p>
      A PWA can provide shortcuts to pages (URLs) inside the app. These shortcuts are accessible by long-pressing the 
      app icon on an Android device, by right-clicking the app icon on a ChromeOS device, or by starting the app on a 
      macOS device or Windows device and then right-clicking the app icon in the Dock.
    </p>
    
    <p>
      Note that the shortcuts are available even when the app is not running only on Android and ChromeOS devices.
    </p>
    
    <p>
      Shortcuts are specified in the <code>shortcuts</code> member of the <code>manifest.json</code> file.
    </p>
    
    <code-snippet>
      <span lang="json">
"shortcuts": [
  {
    "name": "Media Capture",
    "short_name": "Media Capture",
    "description": "Media Capture allows apps to use the camera and microphone of a device",
    "url": "media",
    "icons": [
      {
        "src": "src/img/icons/mediacapture-96x96.png",
        "sizes": "96x96"
      }
    ]
  },
  
  ...
  
]
      </span>
    </code-snippet>
    
    <h2>Demo</h2>
    
    <p>
      Install this web app to your device and access the shortcuts by long-pressing the app icon on an Android device, 
      by right-clicking the app icon on a ChromeOS device, or by starting the app on a macOS device or Windows device 
      and then right-clicking the app icon in the Dock.
    </p>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@web.dev/articles/app-shortcuts" target="_blank" rel="noopener">
        App shortcuts on web.dev
      </a>
      
      <h3>Browser support</h3>
      <p>
        Shortcuts are available on desktop for web apps installed through Chrome and Edge, web apps added to the Dock 
        through Safari on macOS, and web apps installed through Chrome on Android.
      </p>
    </section>
  </div>
</div>
`;
