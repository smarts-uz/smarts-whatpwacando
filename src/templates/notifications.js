import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-textfield.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="notifications-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Notifications</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
  
    <p>
      The Push API and Notifications API enable web apps to receive and display push notifications from a server, even 
      when the app is in the background or not running at all. 
    </p>
    
    <h3>Demo</h3>
    
    <p>
      Click the "Subscribe" button below to subscribe to notifications. Once subscribed, you will send a notification to 
      yourself by filling out the form below. You can specify a delay in seconds so you can schedule a notification and 
      close the app in the meantime to check it is delivered while the app is not running.
    </p>
    
    <p>
      The "require interaction" checkbox will make the notification persistent on supporting devices, which means it will 
      not disappear until the user interacts with it.
    </p>
    
    <div class="buttons">
      <material-button id="subscribe" label="Subscribe" raised></material-button>
      <material-button id="unsubscribe" label="Unsubscribe" raised></material-button>
    </div>
    
    <p>
      You can send a notification through the form below.
    </p>
    
    <material-textfield 
      type="text" 
      label="Title" 
      id="title"
      value="What PWA Can Do Today"></material-textfield>
      
    <material-textfield 
      type="text" 
      label="Notification" 
      id="message"
      value="Hi, this is a notification"></material-textfield>
      
    <material-textfield 
      type="number" 
      label="Delay (max 5 seconds for demo purposes)" 
      id="delay"
      value="0"></material-textfield>
      
    <label class="checkbox">
      <input type="checkbox" id="interaction">
      Require interaction
    </label>  
        
    <material-button id="send" label="Send" raised></material-button>
    
    <code-snippet lang="js">
const notification = document.querySelector('#notification');
const sendButton = document.querySelector('#send');
const registration = await navigator.serviceWorker.getRegistration();

const sendNotification = async () => {
  if(Notification.permission === 'granted') {
    showNotification(notification.value);
  }
  else {
    if(Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
  
      if(permission === 'granted') {
        showNotification(notification.value);
      }
    }
  }
  };
  
  const showNotification = body => {
  const title = 'What PWA Can Do Today';
  
  const payload = {
    body
  };
  
  if('showNotification' in registration) {
    registration.showNotification(title, payload);
  }
  else {
    new Notification(title, payload);
  }
};

sendButton.addEventListener('click', sendNotification);
    </code-snippet>
    
    <section>
    <h3>Documentation</h3>
    <p>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification">
        ServiceWorkerRegistration.showNotification on MDN</a> which is required by Chrome.
    </p>
    
    <p>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Notifications_API" target="_blank" rel="noopener">
        Notifications API on MDN
      </a>
    </p>
    </section>
    
  <material-dialog id="notification-dialog">
    <h3 slot="header">Notification error</h3>
    <p slot="body">Your device does not have permission to show notifications. Please enable this in your device's 
    settings.</p>
    <div slot="footer">
    <material-button id="notification-close" label="Close" raised></material-button>
    </div>
  </material-dialog>
    
    <h3>Browser support</h3>
    <a href="../https@caniuse.com/#feat=notifications" target="_blank" rel="noopener">
      Web Notification on caniuse.com
    </a>
  </div>
  
  
</div>
`;
