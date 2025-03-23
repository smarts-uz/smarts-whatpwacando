import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-textfield.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-dialog.js';
import 'elements/code-snippet.js';

export const template = `
<div id="nfc" class="view next-screen">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Web NFC</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device.</p>
  
    <p>
      The Web NFC API enables web apps to read and write to NFC tags when they are in close proximity to the 
      device, usually 5-10 cm or 2-4 inches.
    </p>
    
    <h3>Demo</h3>
    
    <p>
      Fill in the form with your data below and write it to the NFC tag by tapping the "Write" button and holding the 
      tag close to your device.
    </p>
    
    <p>
      After that you can read the data back by tapping the "Scan" button and holding the tag close to your device.
    </p>
    
    <material-textfield 
      type="text" 
      label="Full name" 
      id="name"
      value=""></material-textfield>
      
    <material-textfield 
      type="number" 
      label="Age" 
      id="age"
      value=""></material-textfield>  
      
    <material-textfield 
      type="text" 
      label="City" 
      id="city"
      value=""></material-textfield>  

    <div id="nfc-buttons">
      <material-button id="write" label="Write" raised>
        <i class="material-icons" translate="no" slot="left-icon">edit</i>
      </material-button>
      <material-button id="scan" label="Scan" raised>
        <i class="material-icons" translate="no" slot="left-icon">speaker_phone</i>
      </material-button>
      <material-button id="stop-scan" label="Stop scan" raised>
        <i class="material-icons" translate="no" slot="left-icon">stop</i>
      </material-button>
    </div>
    
    <code-snippet lang="js">
const scanButton = document.querySelector('#scan');
const stopScanButton = document.querySelector('#stop-scan');
const writeButton = document.querySelector('#write');
const name = document.querySelector('#name');
const age = document.querySelector('#age');
const city = document.querySelector('#city');

const nfcDialog = document.querySelector('#nfc-dialog');
const closeButton = document.querySelector('#close-dialog');

let scanning = false;

closeButton.addEventListener('click', () => {
  nfcDialog.close();
});

stopScanButton.disabled = true;

const capitalize = string => \`$\{string.substr(0, 1).toUpperCase()\}$\{string.substr(1)\}\`;

const showTagData = data => {
  nfcDialog.body = [...Object.entries(data)].reduce((html, [key, value]) => \`$\{html\}<p>$\{capitalize(key)\}: $\{value\}</p>\`, \`\`);

  nfcDialog.open();
};

const readTag = ({message}) => {
  const {records} = message;

  return records.map(record => {
    const {id, recordType, mediaType, encoding, data} = record;

    const decoder = encoding ? new TextDecoder(encoding) : new TextDecoder();

    switch(recordType) {
      case 'url':
      case 'text':
        console.log('data', decoder.decode(data));
        break;

      case 'mime':
        showTagData(JSON.parse(decoder.decode(data)));

        break;
    }

    return ['url', 'text'].includes(recordType) ? decoder.decode(data) : JSON.parse(decoder.decode(data));
  });
};

let abortController;

const scanTag = () => {
  scanButton.disabled = true;
  stopScanButton.disabled = false;

  return new Promise((resolve, reject) => {
    try {
      const reader = new NDEFReader();
      abortController = new AbortController();

      reader.scan({signal: abortController.signal});
      scanning = true;

      reader.addEventListener('reading', e => resolve(readTag(e)));

      reader.addEventListener('readingerror', e => {
        console.log('error reading tag', e);
        reject(e);
      });
    }
    catch(e) {
      console.log('error scanning tag:', e);

      scanButton.disabled = false;
      stopScanButton.disabled = true;
      scanning = false;

      reject(e);
    }
  });
};

const stopScan = () => {
  abortController.abort();

  scanButton.disabled = false;
  stopScanButton.disabled = true;
  scanning = false;
};

const writeTag = async () => {
  writeButton.disabled = true;

  if(scanning) {
    stopScan();
  }
  const encoder = new TextEncoder();

  const data = {
    name: name.value,
    age: age.value,
    city: city.value
  };

  const records = [];

  records.push({
    recordType: 'mime',
    mediaType: 'application/json',
    data: encoder.encode(JSON.stringify(data))
  });

  const reader = new NDEFReader();
  abortController = new AbortController();

  reader.scan({signal: abortController.signal});

  try {
    await reader.write({records}, {
      overwrite: true
    });

    setTimeout(() => abortController.abort(), 3000);
  }
  catch(e) {
    console.log('error writing tag', e);
  }
  finally {
    writeButton.disabled = false;
  }
};

scanButton.addEventListener('click', scanTag);
stopScanButton.addEventListener('click', stopScan);
writeButton.addEventListener('click', writeTag);    
    </code-snippet>
    
    <h3>Documentation</h3>
    <p>
      <a href="../https@web.dev/nfc/default.htm">Web NFC API on web.dev</a>
    </p>
    
    <p>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/NDEFReader">NDEFReader on MDN</a>
    </p>
    
    <h3>Browser support</h3>
    <p>
      The Web NFC API is available from Chrome 89 for Android. 
    </p>
  </div>
  
  <material-dialog id="nfc-dialog">
    <h3 slot="header">NFC tag data</h3>
    <p slot="body"></p>
    <footer slot="footer">
      <material-button label="Close" id="close-dialog"></material-button>
    </footer>
  </material-dialog>
</div>
`;
