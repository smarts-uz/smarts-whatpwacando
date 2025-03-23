import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="capture-handle-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Capture Handle and Captured Surface Control</h2>
    
    <p class="no-support-screencapture">Screen capturing is not (yet) supported on your device</p>
    <p class="no-support-surface-control">Captured Surface Control is not (yet) supported on your device
    <p class="no-support">Capture Handle is not (yet) supported on your device</p>
  
    <p>
      Capture Handle and Captured Surface Control enable screen capturing web apps to remotely control captured web apps.
    </p>
    
    <p> 
      The capturing web app can send arbitrary commands to the capturing web app, scroll it and zoom it in and out.
      A great use-case for this is a screen capture web 
      app that can remotely control a presentation inside the web app that is captured. 
    </p>
    
    <p>
      The user of the capturing web app then doesn't need to switch between the capturing and captured app anymore to 
      control that presentation.
    </p>
    
    <p>
      The captured app can opt-in through a call to <code>navigator.mediaDevices.setCaptureHandleConfig(config)</code>.
      The <code>config</code> parameter has a <code>handle</code> property containing a string that uniquely identifies 
      the captured app.
    </p>
    
    <p>
      The capturing app retrieves the handle by calling <code>getCaptureHandle</code> on the <code>VideoTrack</code> of 
       the screen capturing <code>MediaStream</code>. It then uses that handle in messages it sends to the captured app 
       through <code>BroadcastChannel</code>. These messages instruct the captured app to go to the previous or next 
       image in the gallery.
    </p>
    
    <h3>Demo</h3>
    <p>
      Click the button "Open page" below to open a page containing an image gallery. Then capture the screen of that 
      page by clicking the button "Share screen". 
    </p>
    <p>  
      After that, you can go back and forth between the images in the gallery from this page by clicking the "Previous" 
      and "Next" buttons, scroll the captured page and zoom it in and out. No need to switch between this app and the
      captured app anymore!
    </p>
    
    <div id="buttons">
      <material-button label="Open page" id="open-page-button" raised></material-button>
      <material-button label="Share screen" id="share-screen-button" raised></material-button>
      <material-button label="Stop share" id="stop-share-screen-button" raised hidden></material-button>
      <material-button label="Previous" id="previous-button" raised disabled></material-button>
      <material-button label="Next" id="next-button" raised disabled></material-button>
      <material-button label="Enable scrolling" id="enable-scrolling-button" raised disabled></material-button>
      <material-button id="zoom-out-button" raised disabled>
        <i class="material-icons" translate="no" slot="left-icon">zoom_out</i>
      </material-button>
      <material-button id="zoom-in-button" raised disabled>
        <i class="material-icons" translate="no" slot="left-icon">zoom_in</i>
      </material-button>
    </div>
    
    <div style="display: flex">
      <video id="preview" autoplay playsinline></video>
    </div>
    
    
    <code-snippet lang="js">
// capturing side
let controller;

// CaptureController keeps the focus on the capturing web app
if ('CaptureController' in window && 'setFocusBehavior' in CaptureController.prototype) {
  controller = new CaptureController();
  controller.setFocusBehavior('no-focus-change');
}

const stream = await navigator.mediaDevices.getDisplayMedia({
  video: {
    displaySurface: 'browser', 
  },
  audio: true,
  surfaceSwitching: 'exclude', 
  selfBrowserSurface: 'exclude', 
  preferCurrentTab: false, 
  systemAudio: 'include', 
  monitorTypeSurfaces: "exclude", 
  ...(controller && {controller})
});

const [videoTrack] = stream.getVideoTracks();
let captureHandle = videoTrack.getCaptureHandle();
if (captureHandle) {
  previousButton.disabled = false;
  nextButton.disabled = false;
}

videoTrack.addEventListener('capturehandlechange', (e) => {
  captureHandle = e.target.getCaptureHandle();
});

const broadcastChannel = new BroadcastChannel("capture-handle");

previousButton.addEventListener('click', () => {
  broadcastChannel.postMessage({
    handle: captureHandle.handle,
    command: 'previous',
  });
});

nextButton.addEventListener('click', () => {
  broadcastChannel.postMessage({
    handle: captureHandle.handle,
    command: 'next',
  });
});

// captured side
const config = {
  handle: crypto.randomUUID(),
  exposeOrigin: true,
  permittedOrigins: ['*'],
};
navigator.mediaDevices.setCaptureHandleConfig(config);

const gallery = document.querySelector('image-gallery');
const broadcastChannel = new BroadcastChannel("capture-handle");

broadcastChannel.addEventListener('message', ({data}) => {
  const {handle, command} = data;

  // only accept commands if the handle matches
  if(handle === config.handle) {
    switch(command) {
      case 'previous':
        gallery.previous();
        break;
        
      case 'next':
        gallery.next();
        break;
    }
  }
});

// trigger permission prompt for Captured Surface Control
enableScrollingButton.onclick = (e) => {
  captureController.sendWheel({});
}

// get available zoom levels
const zoomLevels = CaptureController.getSupportedZoomLevels();

// zoom in
zoomInButton.addEventListener('click', async () => {
  const index = zoomLevels.indexOf(captureController.getZoomLevel());
  const newZoomLevel = zoomLevels[Math.min(index + 1, zoomLevels.length - 1)];

  try {
    await captureController.setZoomLevel(newZoomLevel);
  }
  catch(err) {
    console.log('zoom in error', err);
  }
});

// zoom out
zoomOutButton.addEventListener('click', async () => {
  const index = zoomLevels.indexOf(captureController.getZoomLevel());
  const newZoomLevel = zoomLevels[Math.max(index - 1, 0)];

  try {
    await captureController.setZoomLevel(newZoomLevel);
  }
  catch(err) {
    console.log('zoom out error', err);
  }
});

// scroll captured side by scrolling the video track
preview.onwheel = async (e) => {
  const {offsetX, offsetY, deltaX, deltaY} = e;
  const [x, y] = translateCoordinates(offsetX, offsetY);
  const [wheelDeltaX, wheelDeltaY] = [-deltaX, -deltaY];

  try {
    await captureController.sendWheel({ x, y, wheelDeltaX, wheelDeltaY });
  }
  catch (error) {
    console.log(error);
  }
};

// translate coordinates between preview and captured side
function translateCoordinates(offsetX, offsetY) {
  const previewDimensions = preview.getBoundingClientRect();
  const trackSettings = preview.srcObject.getVideoTracks()[0].getSettings();
  const x = (trackSettings.width * offsetX) / previewDimensions.width;
  const y = (trackSettings.height * offsetY) / previewDimensions.height;

  return [Math.floor(x), Math.floor(y)];
}
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.chrome.com/docs/web-platform/capture-handle" target="_blank" rel="noopener">
          Capture Handle on Chrome Developers.
        </a>
      </p>

      <p>
        <a href="../https@developer.chrome.com/docs/web-platform/captured-surface-control" target="_blank" rel="noopener">
          Captured Surface Control on Chrome Developers.
        </a>
      </p>
      
      <h3>Browser support</h3>
      <p>
        Capture Handle is supported in Chrome and Edge 102+.
      </p>
      <p>
        Captured Surface Control is supported in Chrome and Edge 122+ as an Origin Trial.
      </p>
    </section>
  </div>
</div>
`;
