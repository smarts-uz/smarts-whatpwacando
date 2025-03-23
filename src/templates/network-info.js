import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/network-information.js';

export const template = `
<div class="view next-screen" id="network-info-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Network information</h2>
    
    <p class="no-support">Your device may not fully support this feature</p>
    
    <p>
      The NetworkInformation API provides information about the connection of a device, allowing web apps to adapt 
      functionality based on network quality.
    </p>
    
    <p>
      The reported information includes effective bandwidth (in mbps), effective type (wifi, cellular, ethernet etc.) and 
      if the user has activated reduced data usage.
    </p>
    
    <p>
     The online/offline status indicates if the user is connected to a network and is not part of the Network Information 
     API.
    </p>
    
    <h2>Network info:</h2>
    <network-information></network-information>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/NetworkInformation" target="_blank" rel="noopener">
        NetworkInformation API on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=mdn-api_networkinformation" target="_blank" rel="noopener">
          NetworkInformation API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
