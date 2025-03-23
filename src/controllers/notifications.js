export const controller = async () => {
  const supported = 'Notification' in window;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  const notification = document.querySelector('#notification');
  const sendButton = document.querySelector('#send');
  const subscribeButton = document.querySelector('#subscribe');
  const unsubscribeButton = document.querySelector('#unsubscribe');
  const dialog = document.querySelector('#notification-dialog');
  const closeButton = document.querySelector('#notification-close');

  subscribeButton.disabled = !supported;
  unsubscribeButton.disabled = !supported;
  sendButton.disabled = !supported;

  let mainContent;

  const registration = await navigator.serviceWorker.getRegistration();
  const pushSubscription = await registration.pushManager.getSubscription();

  const titleField = document.querySelector('#title');
  const messageField = document.querySelector('#message');
  const delayField = document.querySelector('#delay');
  const interactionField = document.querySelector('#interaction');

  if(pushSubscription) {
    subscribeButton.disabled = true;
    unsubscribeButton.disabled = false;
    sendButton.disabled = false;
  }
  else {
    subscribeButton.disabled = false;
    unsubscribeButton.disabled = true;
    sendButton.disabled = true;
  }

  const preventSwipe = e => e.preventDefault();

  closeButton.addEventListener('click', () => {
    dialog.close();
    mainContent.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
    mainContent.style.maxHeight = 'auto';
    document.documentElement.style.maxHeight = 'auto';
    mainContent.removeEventListener('touchmove', preventSwipe);
  });

  subscribeButton.addEventListener('click', async () => {
    const response = await (await fetch(`${apiUrl}/public-key`)).json();
    const publicKey = response.publicKey;

    try {
      await subscribeToPushMessages(registration, publicKey);

      subscribeButton.disabled = true;
      unsubscribeButton.disabled = false;
      sendButton.disabled = false;
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
        sendButton.disabled = true;
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

  const subscribeToPushMessages = (registration, publicKey) => registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: base64UrlToUint8Array(publicKey)
  });

  const unsubscribeFromPushMessages = subscription => subscription.unsubscribe();

  const getPushSubscription = () => registration.pushManager.getSubscription();

  const apiUrl = '../https@ca9akfgcre.execute-api.us-east-1.amazonaws.com';
  const sendPushMessage = async ({title, message, delay, interaction}) => {
    const pushSubscription = await getPushSubscription();
    const delayTime = !Number.isInteger(parseInt(delay, 10)) ? 0 :
      delay > 5 ? 5 : delay;

    fetch(`${apiUrl}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pushSubscription,
        title,
        message,
        delay: delayTime * 1000,
        interaction
      })
    });
  };

  sendButton.addEventListener('click', () => {
    const title = titleField.value;
    const message = messageField.value;
    const delay = delayField.value !== '' ? delayField.value : 0;
    const interaction = interactionField.checked;

    sendPushMessage({title, message, delay, interaction});
  });

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
      body,
      icon: 'src/img/icons/icon-512x512.png',
      image: 'src/img/icons/icon-512x512.png',
    };

    if('showNotification' in registration) {
      registration.showNotification(title, payload);
    }
    else {
      new Notification(title, payload);
    }
  };
}
