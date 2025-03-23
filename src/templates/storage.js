import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="storage-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Storage API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Storage API enables web apps to store structured data in IndexedDB, Cache Storage, LocalStorage, and 
      SessionStorage. The available and used storage space can be obtained through 
      <code>await navigator.storage.estimate()</code> which returns a <code>Promise</code> that resolves to the 
      <code>quota</code> and <code>usage</code> properties that return the available and used storage space respectively.
    </p>
    
    <p>
      In Chrome and Edge, an additional property <code>usageDetails</code> is returned that specifies the used space 
      by storage type which may vary per browser.
    </p>
    
    <table id="storage-stats">
      <thead>
        <tr>
          <th colspan="2">Storage usage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Available storage</td>
          <td id="quota"></td>
        </tr>
        <tr>
          <td>Used storage</td>
          <td id="usage"></td>
        </tr>
      </tbody>
    </table>

  
    <h2>Persistent storage</h2>
    <p>
      Web apps can request persistent storage which means that any data stored in IndexedDB and Cache Storage will no 
      longer be deleted by the browser when for example storage space runs low or the user hasn't interacted with the 
      app for a period of time. 
    </p>
    <p>
      The browser will retain the data as long as possible and in case it becomes necessary to remove data when storage 
      space runs low, the browser will notify the user and provide a way to remove some data manually. 
    </p>
    
    <p>
      In supporting browsers, web apps can request persistent storage through <code>navigator.storage.persist()</code>.
      Permission is granted by the browser based on how much the user has interacted with the app and if the app is 
      installed as a PWA. To check if an app already has persistent storage, use 
      <code>await navigator.storage.persisted()</code> which returns a <code>Promise</code> that resolves to 
      <code>true</code> or <code>false</code>.
    </p>
    
    <p>
      If persistent storage is not granted, try interacting with the app more or install it as a PWA.
    </p>

    <div id="has-persistent-storage">
      <i class="material-icons" translate="no">check_circle</i>This app has persistent storage!
    </div>
    

    <material-button
      id="request-persistent-storage-button"
      raised
      label="Request persistent storage"
      ></material-button>

    <div id="no-persistent-storage" hidden>
      <i class="material-icons" translate="no">cancel</i>Persistent storage refused, please try again later.
    </div>


    <code-snippet lang="js">
// check if Storage API is supported
const supported = 'storage' in navigator;

// check if persistent storage is supported
const persistentStorageSupported = navigator.storage && navigator.storage.persist;

// request persistent storage
const persist = await navigator.storage.persist();

// check if app already has persistent storage
const hasPersistentStorage = await navigator.storage.persisted();

// get usage statistics
const {quota, usage, usageDetails} = await navigator.storage.estimate();
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Storage_API" target="_blank" rel="noopener">
        Storage API on MDN
      </a>

      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/mdn-api_storagemanager_persist" target="_blank" rel="noopener">
          Storage API persist on caniuse.com
        </a>
      </p>
      
      <p>
        <a href="../https@caniuse.com/mdn-api_storagemanager_estimate" target="_blank" rel="noopener">
          Storage API estimate on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
