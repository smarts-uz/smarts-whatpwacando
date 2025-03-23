import {isIOSSafari} from 'lib/utils.js';

export const controller = () => {
  const supported = 'wakeLock' in navigator;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(supported && isIOSSafari()) {
    document.querySelector(`[data-view="${location.pathname}"] .no-support-ios`).style.display = 'block';
  }
  const wakeLockSwitch = document.querySelector('#wake-lock');
  const restoreSwitch = document.querySelector('#restore-wake-lock');
  const restoreLabel = document.querySelector('#restore-label');
  wakeLockSwitch.disabled = !supported;
  restoreSwitch.disabled =!supported;

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

      if(onVisibilityChange) {
        restoreLabel.classList.add('restored');
        wakeLockSwitch.checked = true;

        setTimeout(() => {
          restoreLabel.classList.remove('restored');
        }, 3000);
      }
    }
    catch(err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  const releaseWakeLock = () => {
    console.log('releasing wakeLock');

    wakeLock.release();
    wakeLock = null;
  };

  wakeLockSwitch.addEventListener('change', (e) => {
    const {checked} = e.target;

    checked ? requestWakeLock() : releaseWakeLock();
  });

  const handleVisibilityChange = async () => {
    if (supported && restoreSwitch.checked && document.visibilityState === 'visible') {
      setTimeout(async () => {
        await requestWakeLock(true);
      }, 1000);
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
}
