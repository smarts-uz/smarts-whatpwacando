import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'src/elements/form-field.js';

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
    <h2>Email list </h2>
    
    <p>
      Join my email list for a weekly update on PWAs and new features of the modern web, tested and explained in plain 
      English.
    </p>
    <iframe 
        src="../https@modernwebweekly.substack.com/embed" 
        width="480" 
        height="160" 
        style="background: #ffffff;" frameborder="0" scrolling="no"></iframe>
</div>
`;
