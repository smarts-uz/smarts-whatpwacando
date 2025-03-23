import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="file-handling-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>File Handling API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The File Handling API enables web apps to register their ability to handle file types with the operating system. 
      This enables the file manager of the OS or other operating system flows to use the web app to open the file, just 
      like with a native app.
    </p>
    
    <p>This feature is desktop only.</p>
    
    <p>
      Open the file manager of the OS of your device and select one or multiple files of type .png, .jpg, .jpeg or .webm 
      by right-clicking it and then select this PWA to open it (make sure it's installed as a PWA first).
    </p>
    
    <p>
      The opened image(s) will then be displayed below.
    </p>
    
    <div id="selected-images"></div>

    <code-snippet>
    
    <span lang="json">
// manifest.json    
"file_handlers": [
  {
    "action": "file-handling",
    "accept": {
      "image/pgn": [".png"],
      "image/jpeg": [".jpg", ".jpeg"]
    },
    "icons": [

    ],
    "launch_type": "single-client"
  }
]    
    
  </span>
    <span lang="js">
// javascript    
const selectedImages = document.querySelector('#selected-images');

launchQueue.setConsumer(async (launchParams) => {
  if(launchParams.files.length) {
    const fragment = document.createDocumentFragment();
    for(const fileHandle of launchParams.files) {
      const file = await fileHandle.getFile();
      const url = URL.createObjectURL(file);
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = url;

      div.appendChild(img);
      fragment.appendChild(div);
    }

    selectedImages.appendChild(fragment);
  }
});
   
    </span>
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.chrome.com/docs/capabilities/web-apis/file-handling" target="_blank" rel="noopener">
        File Handling API on Chrome developers.
      </a>

      <h3>Browser support</h3>
      <p>
        The File Handling API is supported on Chrome 102+ and Edge 102+.
      </p>
    </section>
  </div>
</div>
`;
