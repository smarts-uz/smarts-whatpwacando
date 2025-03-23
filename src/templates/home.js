import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'src/elements/form-field.js';

export const template = `
<div class="view home" data-view="default.htm">
  <header id="main-header">
    <img class="logo" src="src/img/pwalogo.svg">
  </header>
  <div class="network-status">
    <header>
      <i class="material-icons" translate="no">wifi_off</i>
      <p>Your device is currently offline.</p>
    </header>
  </div>
  <div class="content">
    <h1>What PWA Can Do Today</h1>
    <p>
      A showcase of what is possible with Progressive Web Apps today. 
    </p>
    <p>
      A Progressive Web App (PWA) is a website that can be installed on your device and provide an app-like experience 
      <a href="info">read more</a>
    </p>
    
    <section id="installation">
      <h2>How to use this app</h2>
    
      <p>
        This app is itself a PWA so you can install it on your device and then check the <a href="#demos">demos</a> below to see what is supported on your device.
      </p>
      
      <p>
        When the button below becomes enabled, you can install this app.
      </p>
      
      <p>
        <material-button id="install-button" label="Install to home screen" raised>
          <i class="material-icons" translate="no" slot="left-icon">add_to_home_screen</i>
        </material-button>
      </p>
    </section>
    
    <h2>Stay up to date</h2>
    <p>
      Join my email list for a weekly update on PWAs and new features of the modern web, tested and explained in plain 
      English.
    </p>

    <iframe 
        src="../https@modernwebweekly.substack.com/embed" 
        width="480" 
        height="160" 
        style="background: #ffffff;" frameborder="0" scrolling="no"></iframe>

    <h2>Need help?</h2>
    <p>
      If you run into issues when implementing a PWA I can help by running an <a href="audit">audit</a> of it.
    </p>
    
    <h2 id="demos">Demos</h2>
    
    <section id="installed">
      <p>
        Check the demos to see what is supported on your device.
      </p>
      <a id="expand-feature-grid">
        <span class="show-demo-info">Show demo info</span>
        <span class="hide-demo-info">Hide demo info</span>
      </a>
    </section>
    
    <section class="feature-grid">
      <div class="feature" id="installation-demo-button">
        <a href="installation">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">install_mobile</i>
          </material-button>
        </a>
        <aside>
          <header>Installation</header>
          <p>Using the beforeinstallprompt event, a native dialog can be displayed to install a web app</p>
        </aside>
      </div>
      
      <div class="feature" id="offline-support-demo-button">
        <a href="offline-support">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">download_for_offline</i>
          </material-button>
        </a>
        <aside>
          <header>Offline support</header>
          <p>The Service Worker enables web apps to work offline</p>
        </aside>
      </div>
      
      <div class="feature" id="notifications-demo-button">
        <a href="notifications">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">notifications_none</i>
          </material-button>
        </a>
        <aside>
          <header>Notifications</header>
          <p>
            The Notifications API enables web apps to display notifications, even when the app is not active.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="shortcuts-demo-button">
        <a href="shortcuts">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">app_shortcut</i>
          </material-button>
        </a>
        <aside>
          <header>Shortcuts</header>
          <p>
            Shortcuts provide quick access to pages in your app from the app icon.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="view-transitions-demo-button">
        <a href="view-transitions">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">auto_awesome_motion</i>
          </material-button>
        </a>
        <aside>
          <header>View Transitions</header>
          <p>
            The View Transitions API enables app-like transitions between pages.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="geolocation-demo-button">
        <a href="geolocation">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">gps_fixed</i>
          </material-button>
        </a>
        <aside>
          <header>Geolocation</header>
          <p>
            The Geolocation API enables users to share their location with web apps .
          </p>
        </aside>
      </div>
      
      <div class="feature" id="media-demo-button">
        <a href="media">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">videocam</i>
          </material-button>
        </a>
        <aside>
          <header>Media capture</header>
          <p>Media capture allows web apps to use the camera and microphone of a device</p>
        </aside>
      </div>
      
      <div class="feature" id="pip-demo-button">
        <a href="pip">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">picture_in_picture</i>
          </material-button>
        </a>
        <aside>
          <header>Picture-in-picture</header>
          <p>The Document Picture-in-Picture API makes it possible to open an always-on-top window that can be populated 
          with arbitrary HTML content</p>
        </aside>
      </div>
      
      <div class="feature" id="file-system-demo-button">
        <a href="file-system">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">insert_drive_file</i>
          </material-button>
        </a>
        <aside>
          <header>File System</header>
          <p>
            Access to the file system of the user's device
          </p>
        </aside>
      </div>
      
      <div class="feature" id="authentication-demo-button">
        <a href="authentication">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">fingerprint</i>
          </material-button>
        </a>
        <aside>
          <header>Authentication</header>
          <p>
            Web Authentication API (WebAuthn) enables passwordless authentication through your device's fingerprint 
            reader or an external USB Security Key.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="protocol-handling-demo-button">
        <a href="protocol-handling">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">language</i>
          </material-button>
        </a>
        <aside>
          <header>Protocol Handling</header>
          <p>
            Protocol handling enables web apps to register their ability to open links with particular URL schemes.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="file-handling-demo-button">
        <a href="file-handling">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">folder_open</i>
          </material-button>
        </a>
        <aside>
          <header>File Handling API</header>
          <p>
            The File Handling API enables web apps to register as file handlers with the operating system
          </p>
        </aside>
      </div>
      
      <div class="feature" id="contacts-demo-button">
        <a href="contacts">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">account_box</i>
          </material-button>
        </a>
        <aside>
          <header>Contact picker</header>
          <p>
            The Contact Picker API allows web apps to select the user's contacts after permission has been granted.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="web-share-demo-button">
        <a href="web-share">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">share</i>
          </material-button>
        </a>
        <aside>
          <header>Web share</header>
          <p>
            The Web Share API invokes the native share mechanism of the device and allows users to share 
            text, URLs or files.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="barcode-demo-button">
        <a href="barcode">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">qr_code_scanner</i>
          </material-button>
        </a>
        <aside>
          <header>Barcode detection</header>
          <p>
            The Barcode Detection API detects barcodes and qr-codes in images.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="face-detection-demo-button">
        <a href="face-detection">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">face</i>
          </material-button>
        </a>
        <aside>
          <header>Face detection</header>
          <p>
            The Shape Detection API detects faces in images.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="vibration-demo-button">
        <a href="vibration">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">vibration</i>
          </material-button>
        </a>
        <aside>
          <header>Vibration</header>
          <p>
            The Vibration API enables web apps to make a mobile device vibrate.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="audio-recording-demo-button">
        <a href="audio-recording">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">mic</i>
          </material-button>
        </a>
        <aside>
          <header>Audio recording</header>
          <p>
            Record audio using MediaRecorder and visualize audio using Web Audio API.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="audio-demo-button">
        <a href="audio">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">play_circle_filled</i>
          </material-button>
        </a>
        <aside>
          <header>Audio</header>
          <p>
            The Media Session API allows web apps to display controls for media playback on a device's lock screen.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="audiosession-demo-button">
        <a href="audiosession">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">tune</i>
          </material-button>
        </a>
        <aside>
          <header>Audio Session API</header>
          <p>
            The Audio Session API configures how audio from web apps should mix with audio from native apps.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="capture-handle-demo-button">
        <a href="capture-handle">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">screen_share</i>
          </material-button>
        </a>
        <aside>
          <header>Screen Capturing</header>
          <p>
            Capture Handle and Captured Surface Control enable screen capturing web apps to remotely control captured web apps.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="element-capture-demo-button">
        <a href="element-capture">
          <material-button>
            <img src="src/img/icons/element-capture.svg" alt="element capture icon" slot="left-icon">
          </material-button>
        </a>
        <aside>
          <header>Element Capture</header>
          <p>
            Element Capture enables screen capturing web apps to record specific HTML elements.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="background-sync-demo-button">
        <a href="background-sync">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">sync</i>
          </material-button>
        </a>
        <aside>
          <header>Background Sync API</header>
          <p>
            The Background Sync API enables web apps to defer tasks when it's offline so they can be run when the network 
            connection is restored.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="background-fetch-demo-button">
        <a href="background-fetch">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">downloading</i>
          </material-button>
        </a>
        <aside>
          <header>Background Fetch API</header>
          <p>
            The Background Fetch API enables web apps to download large files in the background even when the app is 
            running.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="storage-demo-button">
        <a href="storage">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">inventory</i>
          </material-button>
        </a>
        <aside>
          <header>Storage API</header>
          <p>
            The Storage API enables web apps to persist structured data in the user's browser.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="bluetooth-demo-button">
        <a href="bluetooth">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">bluetooth</i>
          </material-button>
        </a>
        <aside>
          <header>Bluetooth</header>
          <p>
            The Web Bluetooth API enables web apps to connect to Bluetooth Low Energy (BLE) devices and read values from or 
            write values to it.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="nfc-demo-button">
        <a href="nfc">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">nfc</i>
          </material-button>
        </a>
        <aside>
          <header>NFC</header>
          <p>
            The Web NFC API enables web apps to read and write to NFC tags.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="ar-vr-demo-button">
        <a href="ar-vr">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">layers</i>
          </material-button>
        </a>
        <aside>
          <header>AR/VR</header>
          <p>
            Augmented reality enables web apps to place virtual objects in reality.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="payment-demo-button">
        <a href="payment">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">credit_card</i>
          </material-button>
        </a>
        <aside>
          <header>Payment</header>
          <p>
            The Payment Request API provides a browser-based method to enable users to make payments on the web, using a credit 
            card, Apple Pay or Google Pay.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="wake-lock-demo-button">
        <a href="wake-lock">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">screen_lock_portrait</i>
          </material-button>
        </a>
        <aside>
          <header>Wake lock</header>
          <p>
            The Screen Wake Lock API enables web apps to prevent devices from dimming or locking the screen when the app 
            needs to keep running.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="device-orientation-demo-button">
        <a href="device-orientation">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">screen_rotation</i>
          </material-button>
        </a>
        <aside>
          <header>Orientation</header>
          <p>
            The DeviceOrientationEvent gives information about the physical orientation of the user's device.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="device-motion-demo-button">
        <a href="device-motion">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">3d_rotation</i>
          </material-button>
        </a>
        <aside>
          <header>Motion</header>
          <p>
            The DeviceMotionEvent gives information about the speed of changes for the position and orientation of 
            the user's device.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="network-info-demo-button">
        <a href="network-info">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">network_check</i>
          </material-button>
        </a>
        <aside>
          <header>Network info</header>
          <p>
            The NetworkInformation API provides information about the connection of a device, allowing web apps to adapt 
            functionality based on network quality.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="speech-synthesis-demo-button">
        <a href="speech-synthesis">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">record_voice_over</i>
          </material-button>
        </a>
        <aside>
          <header>Speech synthesis</header>
          <p>
            Speech synthesis provides text-to-speech and allows programs to read out their text content.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="speech-recognition-demo-button">
        <a href="speech-recognition">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">hearing</i>
          </material-button>
        </a>
        <aside>
          <header>Speech recognition</header>
          <p>
            Speech recognition is part of the Web Speech API and provides the ability to recognize voice context from an 
            audio input.
          </p>
        </aside>
      </div>
      
      <div class="feature" id="multi-touch-demo-button">
        <a href="multi-touch">
          <material-button>
              <i class="material-icons" translate="no" slot="left-icon">touch_app</i>
          </material-button>
        </a>
        <aside>
          <header>Multi touch</header>
          <p>
            Touch events enable web apps to capture complex touch behaviour.
          </p>
        </aside>
      </div>
    </section>
  </div>
</div>
`;
