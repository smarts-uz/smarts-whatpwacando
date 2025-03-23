import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-textfield.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';

export const template = `
<div class="view next-screen" id="info-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Audit</h2>
  
    <p>
      Do you already have a PWA but are you running into issues with performance, security, or functionality?
    </p>
    
    <p>
      Or are you not sure how to make your PWA better?
    </p>
    
    <p>
      I can help you by running an audit of your PWA that evaluates it on 35+ criteria and provides you with 
      <strong>clear</strong> and <strong>actionable</strong> instructions on how to improve it. No generic stuff that 
      you can get anywhere but an in-depth quality checkup to get you on your way to a great PWA.
    </p>
    
    <p>Some of the criteria for the audit:</p>
    <ul>
      <li>
        Installability
      </li>
      <li>
        Cross-device and cross-platform compatibility
      </li>
      <li>
        Offline support
      </li>
      <li>
        Usability
      </li>
      <li>
        Effective use of modern web APIs
      </li>
      <li>
        Performance
      </li>
      <li>
        Security
      </li>
    </ul>
    
    <h2>Ready to improve your PWA?</h2>
    <p>
      Your investment in the improvement of your PWA through the audit is €799 excluding VAT (where applicable).
    </p>
    
    <p>
      Would you like to request an audit or would you first like to know more?
    </p>
    
    <p>
      Fill in the form below to contact me or <a href="../https@cal.com/dannymoerkerke" target="_blank">book a call</a> 
      to discuss things further.
    </p>
    
    <form id="contact-form">
      <material-textfield id="name" label="Name" type="text"></material-textfield>
      <material-textfield
        error-required="Please enter a valid email address"
        error-type="Please enter a valid email address"
        id="email"
        label="Email"
        type="email">
      </material-textfield>
      <textarea id="message" name="message" required rows="12"></textarea>

      <material-textfield id="challenge" label="Anti-spam: 2+5=" type="text"></material-textfield>

      <div class="flex">
        <material-button id="send-button" label="Send" raised></material-button>
        <p id="result"></p>
      </div>
    </form>
  </div>
</div>
`;
