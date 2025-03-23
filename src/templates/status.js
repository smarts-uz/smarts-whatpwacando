import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-loader.js';
import 'src/elements/code-snippet.js';
import {supported} from 'lib/feature-support.js';

export const template = `
<div class="view next-screen" id="status-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Feature support</h2>
    
    <p>
      This page gives an overview of the support of the various features on your device.
    </p>
    
    <table>
      <thead>
        <tr>
          <th>
            Feature
          </th>
          <th>
            Support 
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Media capture</td>
          <td class="media-capture">
            <i class="material-icons supported">check_circle</i>
            <i class="material-icons not-supported">cancel</i>
          </td>
        </tr>
      </tbody>
    </table>
    
    
 
  </div>
</div>
`;
