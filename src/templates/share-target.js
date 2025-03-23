import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';

export const template = `
<div class="view next-screen" id="share-target-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Web Share Target API</h2>
    
    <p>
      The Web Share Target API allows developers to register their app as a target to receive shared content from other 
      apps through the Web Share API. 
    </p>
    
    <p>
      On Android, this app is registered as a share target.
    </p>
  
    <h3>Shared content:</h3>
    <div id="shared-content"></div>
    
    <h3>Documentation</h3>
    <p>
      <a href="../https@web.dev/web-share-target/default.htm" target="_blank" rel="noopener">
        Web Share Target API on web.dev
      </a>
    </p>
    
    <h3>Browser support</h3>
    <p>
      The Web Share Target API is supported in Chrome for Android 71+
    </p>
    
  </div>
</div>
`;
