import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="background-sync-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Background Sync API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Background Sync API enables an app to defer tasks when it's offline so they can be run when the network 
      connection is restored.
    </p>
    
    <p>
      For example, a messaging app can store all messages that are sent while the app is offline and then send them 
      when the app is back online. The API handles checking the status of the user's internet connection and decides if 
      the task can be run immediately or if it should be delayed until the network connection is restored.
    </p>
    
    <p>
      On a supporting device, click the button below to send a notification. When the app is online it will be sent 
      immediately. Then go offline (for example, by enabling flight mode) and click the button again.
    </p>
    
    <p>
      The message won't be sent while offline but when you go back online, it will be sent.
    </p>
    
    <p>
      When multiple notifications are sent while offline, all notifications will be sent on Android hen the app is back 
      online but a single notification may be sent on desktop. This is because the browser will not show multiple 
      notifications at the same time to prevent spam.
    </p>
    
    <p>
      This is accomplished by saving each notification to IndexedDB. When the app is online the notification is sent 
      immediately and removed from the database, but when offline the notifications are all saved and then sent when the 
      app is back online.  
    </p>
    
    <p>
      This "outbox" functionality can also be used to save API calls for example that are made when the app is offline.
      When the app is back online, the API calls can then be sent. 
    </p>
  
  <div class="buttons">
      <material-button id="subscribe" label="Subscribe" raised></material-button>
      <material-button id="unsubscribe" label="Unsubscribe" raised></material-button>
      <material-button id="sync-button" label="Send notification" raised></material-button>
    </div>
    
    <code-snippet lang="js">
// inside the service worker an event handler is registered for the 'sync' event
// that sends the notification
self.addEventListener('sync', e => {
  e.waitUntil(
    self.registration.showNotification(title, options)
    .catch(err => console.log(err))
  )
}); 

// in the browser:   
const syncButton = document.querySelector('#sync-button');
const registration = await navigator.serviceWorker.getRegistration();

if('sync' in registration) {
  // the button doesn't actually send the notification, it only  
  // requests a synchronization that triggers a sync event inside
  // the service worker when the network connection is available.
  // This means that if the network connection is available 
  // when the button is clicked, the sync event handler inside 
  // the service worker will be called immediately and the notification 
  // will be sent. But when the button is clicked when there is no network
  // the task will be deferred until the network connection is restored.
  // At that point, the sync event will be fired and the notification will
  // be sent.
  syncButton.addEventListener('click', async () => {
    await registration.sync.register('sync-demo');
  });
}    
    
    </code-snippet>
    
    <material-dialog id="notification-dialog">
      <h3 slot="header">Notification error</h3>
      <p slot="body">Your device does not have permission to show notifications. Please enable this in your device's 
      settings.</p>
      <div slot="footer">
        <material-button id="notification-close" label="Close" raised></material-button>
      </div>
    </material-dialog>
    
    <h3>Documentation</h3>
    <p>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API" target="_blank" rel="noopener">
        Background Sync API on MDN</a>
    </p>
    
    <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/background-sync" target="_blank" rel="noopener">
          Background Sync API on caniuse.com
        </a>
      </p>
  </div>
</div>
`;
