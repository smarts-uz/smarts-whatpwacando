import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';

export const template = `
<div class="view next-screen">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Offline </h2>
    
    <p>
      We couldn't find the page you're looking for and it seems you're offline.
    </p>
    <p>
      Go back to the <a href="default.htm">home page</a> and try again.
    </p>
</div>
`;
