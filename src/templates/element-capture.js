import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="element-capture-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Element Capture API</h2>
    
    <p class="no-support-screencapture">Screen capturing is not (yet) supported on your device</p>
    <p class="no-support">Element Capture is not (yet) supported on your device
  
    <p>
      The Element Capture API enables screen capturing web apps to record specific HTML elements.
    </p>
    <p>
      It works by restricting the video stream resulting from a call to <code>navigator.mediaDevices.getDisplayMedia()</code>
       to a chosen HTML element.
    </p>
    
    <h3>Demo</h3>
    
    <p>
      Click the "Start camera" button below to start your webcam. The four previews will show the original camera 
      preview and the camera stream in grayscale, sepia and with inverted colors. Click one of the previews to capture. 
      You will see that when you hover the mouse over the captured camera preview, the mouse pointer will also be visible
       in the video stream of the captured element. 
    </p>
    <p>
      You can click the video stream of the captured element to take a screenshot of it.
    </p>
    
    <div id="buttons">
      <material-button label="Start camera" id="start-camera-button" raised></material-button>
      <material-button label="Stop camera" id="stop-camera-button" raised hidden></material-button>
      <material-button label="Stop share" id="stop-share-screen-button" raised hidden></material-button>
      <material-button label="Capture original" id="capture-original-button" raised hidden></material-button>
      <material-button label="Capture grayscale" id="capture-grayscale-button" raised hidden></material-button>
      <material-button label="Capture inverted" id="capture-inverted-button" raised hidden></material-button>
    </div>
    
    <div class="media">
      <div class="previews">
        <p class="title1">Camera previews</p>
        <p class="title2">Captured element</p>
        <p class="title3">Screenshot</p>
        
        <video id="camera-preview" autoplay playsinline></video>
        <canvas id="grayscale-canvas"></canvas>
        <canvas id="inverted-canvas"></canvas>
        <canvas id="sepia-canvas"></canvas>
        <video id="capture-preview" autoplay playsinline></video>
        <canvas id="screenshot-canvas"></canvas>
      </div>
      
    </div>
    
    
    <code-snippet lang="js">
const restrictToTarget = async ({target}) => {
  // the current tab is already shared so the capturePreview &lt;video&gt; element
  // already has a stream that we can restrict to the clicked HTML element
  if (capturePreview.srcObject && capturePreview.srcObject.getVideoTracks().length > 0 &&
    capturePreview.srcObject.getVideoTracks()[0].readyState === "live") {
    
    // get the HTML element we want to restrict the video stream to
    const restrictionTarget = await RestrictionTarget.fromElement(
      target
    );
    const [videoTrack] = capturePreview.srcObject.getVideoTracks();
    
    // restrict the video stream to the clicked HTML element
    await videoTrack.restrictTo(restrictionTarget);
  }
  else {
    // start capturing the current tab
    captureStream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });
    const [videoTrack] = captureStream.getVideoTracks();
    
    // get the HTML element we want to restrict the video stream to
    const restrictionTarget = await RestrictionTarget.fromElement(
      target
    );

    // restrict the video stream to the clicked HTML element
    await videoTrack.restrictTo(restrictionTarget);
    
    // set the video stream of the captured tab to the capturePreview &lt;video&gt; element
    capturePreview.srcObject = captureStream;
  }
};

cameraPreview.onclick = restrictToTarget;
grayscaleCanvas.onclick = restrictToTarget;
invertedCanvas.onclick = restrictToTarget;
sepiaCanvas.onclick = restrictToTarget;
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.chrome.com/docs/web-platform/element-capture" target="_blank" rel="noopener">
          Element Capture on Chrome Developers.
        </a>
      </p>
      
      <h3>Browser support</h3>
      <p>
        Element Capture is supported in Chrome and Edge 121+ on Desktop as an Origin Trial
      </p>
    </section>
  </div>
</div>
`;
