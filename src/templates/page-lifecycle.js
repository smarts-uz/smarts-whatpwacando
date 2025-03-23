import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';

const supported = 'wasDiscarded' in document;

export const template = `
<div class="view next-screen" id="page-lifecycle-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Page lifecycle</h2>
    
    ${!supported ? '<p class="no-support">Your device may not fully support this feature</p>' : ''}
    
    <div class="log"></div>
  
  </div>
</div>
`;
