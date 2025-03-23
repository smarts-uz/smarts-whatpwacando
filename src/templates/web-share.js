import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-textfield.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

const files = [
    new File(['test'], 'test.txt', {
        type: 'text/plain'
    })
];
const supported = 'share' in navigator;

const canShareFiles = (navigator.canShare && navigator.canShare({files}));

export const template = `
<div class="view next-screen" id="web-share-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content web-share">
    <h2>Web share</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
  
    <p>
      The Web Share API invokes the native share mechanism of the device and allows users to share 
      text, URLs or files.
    </p>
    
      <p id="can-share-files">
        This app is itself also a share target which means content can also be shared to it. When sharing content, this 
        app will be listed as an app to share to.
      </p>
    
    
    <material-textfield 
        id="title"
        type="text" 
        label="Title"
        value="What PWA Can Do Today"
        error-required="This field is required"></material-textfield>
    
    <material-textfield 
        id="text"
        type="text" 
        label="Text"
        value="This is a demo of the Web Share API"
        error-required="This field is required"></material-textfield> 
        
    <material-textfield 
        id="link"
        type="text" 
        label="URL"
        value="http://whatpwacando.today"
        error-required="This field is required"></material-textfield>
    
      <div id="file-section">
          <material-button id="file-picker" label="Choose file" raised>
            <input type="file" id="file" slot="file-input">    
            <i class="material-icons" translate="no" slot="left-icon">attach_file</i>
          </material-button>   
            
          <span id="file-name"></span> 
      </div>
      
    <material-button label="Share" id="share-button" raised></material-button>  
    
    <code-snippet lang="js">
const shareButton = document.querySelector('#share-button');
const title = document.querySelector('#title').value;
const text = document.querySelector('#text').value;
const url = document.querySelector('#link').value;
const fileField = document.querySelector('#file');
const fileName = document.querySelector('#file-name');

shareButton.addEventListener('click', async () => {
  const files = fileField ? fileField.files : [];

  const data = {title, text, url};

  if(files.length) {
    data.files = files;
  }

  try {
    await navigator.share(data);
  }
  catch(e) {
    console.log('share error', e);
  }
});

if(fileField) {
  fileField.addEventListener('change', e => {
    const {files} = e.target;
    const {name} = files[0];

    if(name) {
      fileName.innerText = name;
    }
  });
}    
    </code-snippet>
    
    <h3>Documentation</h3>
    <p>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Navigator/share">
        Web Share API on MDN</a>
    </p>
  </div>
</div>
`;
