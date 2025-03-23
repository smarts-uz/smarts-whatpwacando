import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import 'elements/web-cam.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="media-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  <div class="content">
    <h2>Media capture</h2>
    
    <p>
      Media capture allows apps to use the camera and microphone of a device. After recording a video you can play it,
      download it or record another one.
    </p>
    
    <p id="mediarecorder-support">
      On iOS, you may need to enable MediaRecorder in:<br>
      Settings > Safari > Advanced > Experimental Features > MediaRecorder
    </p>
    
    <p id="supported-info"></p>
    
    <h3>Demo</h3>
    <p>
      Click the "+" button to start your web cam. You can then record a video, play it and download it.
    </p>
    
    <p class="auto-pip-supported">
      You can check the "Automatic Picture-in-Picture" box to enable automatic Picture-in-Picture when you focus 
      another browser tab.
    </p>
  
    <section class="web-cam-container">
      <web-cam></web-cam>
    </section>
    
    <code-snippet>
      <span lang="js">
// request the user's camera and microphone as a MediaStream      
const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});

// attach the stream to the video element
const video = document.querySelector('video');
video.srcObject = stream;

// set a handler for the media session's picture-in-picture action
navigator.mediaSession.setActionHandler("enterpictureinpicture", () => {
  // display the video in Picture-in-Picture mode
  video.requestPictureInPicture();
});      
      </span>
    </code-snippet>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia" target="_blank" rel="noopener">
          getUserMedia on MDN
        </a>
      </p>
      
      <p>
        <a href="../https@developer.chrome.com/blog/automatic-picture-in-picture/default.htm" target="_blank" rel="noopener">
          Automatic picture-in-picture on Chrome Developers
        </a>
      </p>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=stream" target="_blank" rel="noopener">
          getUserMedia on caniuse.com
        </a>
      </p>
      
      <p>
        Automatic Picture-in-Picture is supported in Chromium-based browsers.
      </p>
    </section>

  </div>
</div>
`;
