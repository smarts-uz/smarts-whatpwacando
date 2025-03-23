export const controller = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  const pushSubscription = await registration.pushManager.getSubscription();
  const supported = registration && 'sync' in registration;

  if(!supported ) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  let mainContent;
  const dialog = document.querySelector('#notification-dialog');
  const closeButton = document.querySelector('#notification-close');
  const syncButton = document.querySelector('#sync-button');
  const subscribeButton = document.querySelector('#subscribe');
  const unsubscribeButton = document.querySelector('#unsubscribe');

  if(pushSubscription) {
    subscribeButton.disabled = true;
    unsubscribeButton.disabled = false;
  }
  else {
    subscribeButton.disabled = false;
    unsubscribeButton.disabled = true;
  }

  // subscribeButton.disabled = !supported;
  // unsubscribeButton.disabled = !supported;
  syncButton.disabled = !supported || !pushSubscription;

  const preventSwipe = e => e.preventDefault();
  if(registration && 'sync' in registration) {
    let notificationNum = 0;

    syncButton.addEventListener('click', async () => {
      if(Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();

        if(permission !== 'granted') {
          // get reference to mainContent here, otherwise it still refers to the previous view
          mainContent = document.querySelector('.view.active .content') || document.querySelector('.view .content');

          mainContent.style.overflowY = 'hidden';
          mainContent.style.maxHeight = '100vh';
          document.documentElement.style.overflowY = 'hidden';
          document.documentElement.style.maxHeight = '100vh';
          mainContent.addEventListener('touchmove', preventSwipe);
          dialog.open();
        }
      }

      const notification = {
        timestamp: Date.now(),
        title: 'Background Sync Demo',
        message: `This is notification #${++notificationNum}`,
      };

      navigator.serviceWorker.controller.postMessage({type: 'schedule-notification', notification});
      console.log(`schedule-notification`);
    });

    closeButton.addEventListener('click', () => {
      dialog.close();
      mainContent.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
      mainContent.style.maxHeight = 'auto';
      document.documentElement.style.maxHeight = 'auto';
      mainContent.removeEventListener('touchmove', preventSwipe);
    });

    subscribeButton.addEventListener('click', async () => {
      const apiUrl = '../https@ca9akfgcre.execute-api.us-east-1.amazonaws.com';
      const response = await (await fetch(`${apiUrl}/public-key`)).json();
      const publicKey = response.publicKey;

      try {
        await subscribeToPushMessages(registration, publicKey);

        subscribeButton.disabled = true;
        unsubscribeButton.disabled = false;
        syncButton.disabled = false;
      }
      catch(err) {
        if(Notification.permission === 'denied') {

          // get reference to mainContent here, otherwise it still refers to the previous view
          mainContent = document.querySelector('.view.active .content') || document.querySelector('.view .content');

          mainContent.style.overflowY = 'hidden';
          mainContent.style.maxHeight = '100vh';
          document.documentElement.style.overflowY = 'hidden';
          document.documentElement.style.maxHeight = '100vh';
          mainContent.addEventListener('touchmove', preventSwipe);
          dialog.open();
        }
      }

    });

    unsubscribeButton.addEventListener('click', async () => {
      const pushSubscription = await getPushSubscription();

      try {
        const success = await unsubscribeFromPushMessages(pushSubscription);

        if(success) {
          console.log('successfully unsubscribed');

          subscribeButton.disabled = false;
          unsubscribeButton.disabled = true;
          syncButton.disabled = true;
        }
        else {
          console.log('unsubscribing was not successful');
        }
      }
      catch(err) {
        console.log('error unsubscribing', err);
      }
    });

    const base64UrlToUint8Array = base64UrlData => {
      const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
      const base64 = (base64UrlData + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

      const rawData = atob(base64);
      const buffer = new Uint8Array(rawData.length);

      for(let i = 0; i < rawData.length; ++i) {
        buffer[i] = rawData.charCodeAt(i);
      }

      return buffer;
    };

     const getPushSubscription = () => registration.pushManager.getSubscription();

    const subscribeToPushMessages = (registration, publicKey) => registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64UrlToUint8Array(publicKey)
    });

    const unsubscribeFromPushMessages = subscription => subscription.unsubscribe();
  }
}
