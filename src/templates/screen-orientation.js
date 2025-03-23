import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton-group.js';
import '_40dannymoerkerke/material-webcomponents/src/material-radiobutton.js';

export const template = `
<div class="view next-screen" id="screen-orientation-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Screen orientation</h2>
  
    <section>
      <material-radiobutton-group name="orientation" id="orientation">
        <material-radiobutton slot="radio" label="None" value="none" checked></material-radiobutton>
        <material-radiobutton slot="radio" label="Portrait" value="portrait"></material-radiobutton>
        <material-radiobutton slot="radio" label="Landscape" value="landscape"></material-radiobutton>
      </material-radiobutton-group>
    </section>

  </div>
</div>
`;
