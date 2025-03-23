import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
  <div class="view next-screen" id="contacts-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Contact picker</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    <p class="no-support-ios">In Safari this feature can be enabled in Settings &gt; Safari 
      &gt; Experimental Features or on iOS 17 in Settings &gt; Safari &gt; Advanced &gt; Feature Flags</p>
    
    <p>
      The Contact Picker API allows apps to select the user's contacts after permission has been granted.
    </p>
    
    <h3>Demo</h3>
    <p>
      <material-button id="select-contacts" label="Select contacts" raised></material-button>
    </p>
    
    <h3>Selected contacts</h3>
    <section id="contacts"></section>
    
    <code-snippet lang="js">
if('contacts' in navigator && 'ContactsManager' in window) {
  const props = await navigator.contacts.getProperties();
  const list = document.querySelector('#contacts');
  const button = document.querySelector('#select-contacts');

  list.innerHTML = '';

  const showContacts = contacts => {
    const html = contacts.reduce((html, contact) => {
      const names = contact.name.join(', ');
      const emails = contact.email.join(', ');
      const telephone = contact.tel.join(', ');

      return \`$\{html\}
        &lt;p&gt;
          &lt;span&gt;
            &lt;i class="material-icons"&gt;person&lt;/i&gt;
            &lt;strong&gt;$\{names\}&lt;/strong&gt;&lt;br&gt;
          &lt;/span&gt;
          &lt;span&gt;
            &lt;i class="material-icons"&gt;mail_outline&lt;/i&gt;
            $\{emails\}&lt;br&gt;
          &lt;/span&gt;
          &lt;span&gt;
            &lt;i class="material-icons"&gt;phone&lt;/i&gt;
            $\{telephone\}&lt;/p&gt;
          &lt;/span&gt;
        \`;
      }, \`\`);

    list.innerHTML = html;
  };

  button.addEventListener('click', async e => {
    const contacts = await navigator.contacts.select(props, {multiple: true});

    showContacts(contacts);
  });
}    
    </code-snippet>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@wicg.github.io/contact-api/spec/default.htm" target="_blank" rel="noopener">
        Contact Picker API on WICG
      </a>
      
      <h3>Browser support</h3>
      <p>
        The Contact Picker API is available in Chrome 80+
      </p>
    </section>
  </div>
</div>
`;
