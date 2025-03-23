import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import 'elements/web-cam.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="pip-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  <div class="content">
    <h2>Picture-in-picture for any element</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Document Picture-in-Picture API makes it possible to open an always-on-top window that can be populated with 
      arbitrary HTML content, not just a &lt;video&gt; element.
    </p>
    
    <p id="mediarecorder-support">
      On iOS, you may need to enable MediaRecorder in:<br>
      Settings > Safari > Advanced > Experimental Features > MediaRecorder
    </p>
  
    <h3>Demo</h3>
    <p>
      Click the "+" button of the web cam Web component below to start your web cam. Then click the 
      "Start picture-in-picture" button and see that the entire Web Component is moved to the picture-in-picture window.
    </p>
    
    <p>
      You can use all controls of the Web Component while it's in the picture-in-picture window.
    </p>
    <p>
      <material-button label="Start picture-in-picture" id="pip-button" raised></material-button>
    </p>
    
    <section class="web-cam-container">
      <web-cam no-auto-pip></web-cam>
    </section>
    
    <code-snippet>
     <span lang="js">
pipButton.addEventListener('click', async () => {
  // open the picture-in-picture window and save the reference to it
  const pipWindow = await documentPictureInPicture.requestWindow({
    width: 800,
    height: 600
  });
  
  // get a reference to the web cam Web Component
  const webCam = document.querySelector('web-cam');

  // add the web cam to the picture-in-picture window
  pipWindow.document.body.appendChild(webCam);

  // when the picture-in-picture window is closed, remove the web cam from it and append it back 
  // to its container the main document
  pipWindow.addEventListener('unload', (e) => {
    const webCamContainer = document.querySelector('.web-cam-container');
    const webCam =  e.target.querySelector('web-cam');
    webCamContainer.appendChild(webCam);
  })
});    
      </span>
    </code-snippet>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API" target="_blank" rel="noopener">
         Document Picture-in-Picture API on MDN
        </a>
      </p>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/@search=document-picture-in-picture" target="_blank" rel="noopener">
          Document Picture-in-Picture API on caniuse.com
        </a>
      </p>
    </section>

  </div>
</div>
`;
