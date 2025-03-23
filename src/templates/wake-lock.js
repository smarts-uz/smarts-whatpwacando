import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-switch.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="wake-lock-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Screen Wake Lock</h2>
    
    <p class="no-support">Your device may not fully support this feature</p>
    
    <p class="no-support-ios">
      This feature works in Safari on iOS but not (yet) for installed web apps.
    </p>
    
    <p>
      The Screen Wake Lock API enables web apps to prevent devices from dimming or locking the screen when the app needs 
      to keep running.
    </p>
    
    <h3>Demo</h3>
    <p>
      Check the box below to prevent your screen from locking. The wake lock will be released when you minimize the app 
      or focus another browser tab on desktop. To restore the wake lock when you focus the app or tab, check the 
      "Restore wake lock on visibility change" box.
    </p>
    <label>
      <input type="checkbox" id="wake-lock">
      Prevent your screen from locking
    </label>
    
    <label id="restore-label">
      <input type="checkbox" id="restore-wake-lock">
      Restore wake lock on visibility change
    </label>
    
    <code-snippet lang="js">
const wakeLockSwitch = document.querySelector('#wake-lock');
const restoreSwitch = document.querySelector('#restore-wake-lock');

let wakeLock = null;

const requestWakeLock = async (onVisibilityChange = false) => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');

    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
      wakeLockSwitch.checked = false;
      wakeLock = null;
    });
    console.log('Wake Lock is active');
    
    // if the wake lock is restored on visibility change, check the checkbox
    if(onVisibilityChange) {
      wakeLockSwitch.checked = true;
    }
  }
  catch(err) {
    console.error(err);
  }
};

const releaseWakeLock = () => {
  console.log('releasing wakeLock');

  wakeLock.release();
  wakeLock = null;
};

wakeLockSwitch.addEventListener('change', ({detail}) => {
  const {checked} = detail;

  checked ? requestWakeLock() : releaseWakeLock();
});   

const handleVisibilityChange = async () => {
  // add a delay to show the wake lock is restored on visibility change
  // so the user can see the checkbox is checked
  if (supported && restoreSwitch.checked && document.visibilityState === 'visible') {
    setTimeout(async () => {
      await requestWakeLock(true);
    }, 1000);
  }
};

document.addEventListener('visibilitychange', handleVisibilityChange);   
    </code-snippet>
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@web.dev/wakelock/default.htm" target="_blank" rel="noopener">
        Screen Wake Lock API on web.dev
      </a>
      
      <h3>Browser support</h3>
      <p>
        The Screen Wake Lock API is available from Chrome 84. 
      </p>
    </section>
  </div>
</div>
`;
