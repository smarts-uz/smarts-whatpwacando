import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton-group.js';
import 'elements/file-tree.js';

export const template = `
  <div class="view next-screen" id="file-system-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>File System Access API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p id="fs-support" class="partial-support">Your device supports the File System Access API</p>
    <p id="opfs-support" class="partial-support">Your device supports Origin Private File System</p>
  
    <p>
      The File System Access API allows apps to access the native file system of a user's device after permission has 
      been granted. The Origin Private File System is an origin-specific virtual filesystem that is highly optimized 
      for performance.
    </p>
    
    <p>
      Click the button "Open directory" below to browse the file system of your device and click a file to open it.
    </p>
    <p>
      Text-based files can be edited and saved. Images will be opened and shown as read-only files.
    </p>
    
    <h3>Demo</h3>
    
    <div class="filesystem-switch">
      <material-radiobutton-group name="filesystem-switch">
        <material-radiobutton slot="radio" label="Native File System" value="native" checked></material-radiobutton>
        <material-radiobutton slot="radio" label="Origin Private File System" value="opfs"></material-radiobutton>
      </material-radiobutton-group>
    </div>
    
    <section id="file-container">
      <file-tree>
        <material-button id="browse-button" slot="browse-button" label="Open directory" raised></material-button>
      </file-tree>
    
      <div id="file-preview">
        <div class="buttons">
          <material-button id="create-file-button" label="Create file" raised></material-button>
          <material-button id="create-directory-button" label="Create directory" raised></material-button>
          <material-button id="save-button" label="Save" raised disabled></material-button>
          <material-button id="save-as-button" label="Save as..." raised disabled></material-button>
        </div>
        <div id="file-content"></div>
      </div>
    </section>
    
    <section>
      <h3>Code</h3>
      <p>
        Check the file-tree repo for the source code of the Web Component that was used in this demo: 
      </p>
      <p> 
        <a href="../https@github.com/DannyMoerkerke/file-tree" target="_blank" rel="noopener">
          https://github.com/DannyMoerkerke/file-tree
        </a>
      </p>
    </section>
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@web.dev/native-file-system/default.htm" target="_blank" rel="noopener">
        File System Access API on web.dev
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/native-filesystem-api" target="_blank" rel="noopener">
          File System Access API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
