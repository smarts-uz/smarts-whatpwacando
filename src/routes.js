
export const routes = [
  {
    url: 'default.htm',
    template: 'templates/home.js',
    controller: 'controllers/home.js'
  },
  {
    url: 'installation',
    template: 'templates/installation.js',
    controller: 'controllers/installation.js',
    title: 'Installation'
  },
  {
    url: 'offline-support',
    template: 'templates/offline-support.js',
    title: 'Offline Support'
  },
  {
    url: 'shortcuts',
    template: 'templates/shortcuts.js'
  },
  {
    url: 'media',
    template: 'templates/media.js',
    controller: 'controllers/media.js',
    title: 'Media Capture',
    onExit() {
      const webCam = document.querySelector('web-cam');
      try {
        if(webCam.preview.src !== '') {
          webCam.closeVideo();
        }
        if(webCam.stream) {
          webCam.stopVideo();
        }
      }
      catch(e) {
        console.error(e);
      }
    },
    exitOnHidden: true
  },
  {
    url: 'pip',
    template: 'templates/pip.js',
    controller: 'controllers/pip.js',
    title: 'Document Picture-in-Picture API',
    onExit() {
      const webCam = document.querySelector('web-cam');
      try {
        if(webCam.preview.src !== '') {
          webCam.closeVideo();
        }
        if(webCam.stream) {
          webCam.stopVideo();
        }
      }
      catch(e) {
        console.error(e);
      }
    },
    exitOnHidden: true
  },
  {
    url: 'airplay',
    template: 'templates/media-airplay.js',
    controller: 'controllers/media.js',
    onExit() {
      const webCam = document.querySelector('web-cam');
      try {
        if(webCam.preview.src !== '') {
          webCam.closeVideo();
        }
        if(webCam.stream) {
          webCam.stopVideo();
        }
      }
      catch(e) {
        console.error(e);
      }
    },
    exitOnHidden: true
  },
  {
    url: 'audio',
    template: 'templates/audio.js',
    controller: 'controllers/audio.js',
    title: 'Audio Capture'
  },
  {
    url: 'view-transitions',
    template: 'templates/view-transitions.js',
    controller: 'controllers/view-transitions.js',
    title: 'View Transitions'
  },
  {
    url: 'audio-recording',
    template: 'templates/audio-recording.js',
    controller: 'controllers/audio-recording.js',
    title: 'Audio Recording'
  },
  {
    url: 'authentication',
    template: 'templates/authentication.js',
    controller: 'controllers/authentication.js',
    title: 'Biometric Authentication'
  },
  {
    url: 'geolocation',
    template: 'templates/geolocation.js',
    controller: 'controllers/geolocation.js',
    title: 'Geolocation'
  },
  {
    url: 'device-orientation',
    template: 'templates/device-orientation.js',
    controller: 'controllers/device-orientation.js',
    title: 'Device Orientation'
  },
  {
    url: 'device-motion',
    template: 'templates/device-motion.js',
    controller: 'controllers/device-motion.js',
    title: 'Device Motion'
  },
  {
    url: 'web-share',
    template: 'templates/web-share.js',
    controller: 'controllers/web-share.js',
    title: 'Web Share API',
    onExit() {
      const title = document.querySelector('#title');
      const text = document.querySelector('#text');
      const url = document.querySelector('#url');
      const fileField = document.querySelector('#file');
      const fileName = document.querySelector('#file-name');

      title.value = title.getAttribute('value');
      text.value = text.getAttribute('value');
      url.value = url.getAttribute('value');

      if(fileField && fileName) {
        fileField.value = '';
        fileName.innerText = '';
      }
    }
  },
  {
    url: 'share-target',
    template: 'templates/share-target.js',
    controller: 'controllers/share-target.js',
    onExit() {
      document.querySelector('#shared-content').innerHTML = '';
    }
  },
  {
    url: 'multi-touch',
    template: 'templates/multi-touch.js',
    title: 'Multi-Touch'
  },
  {
    url: 'ar-vr',
    template: 'templates/ar-vr.js',
    controller: 'controllers/ar-vr.js',
    title: 'Augmented Reality'
  },
  {
    url: 'speech-synthesis',
    template: 'templates/speech-synthesis.js',
    controller: 'controllers/speech-synthesis.js',
    title: 'Speech Synthesis'
  },
  {
    url: 'speech-recognition',
    template: 'templates/speech-recognition.js',
    controller: 'controllers/speech-recognition.js',
    title: 'Speech Recognition',
    onExit() {
      document.querySelector('speech-recognition').reset();
    }
  },
  {
    url: 'page-lifecycle',
    template: 'templates/page-lifecycle.js',
    controller: 'controllers/page-lifecycle.js'
  },
  {
    url: 'notifications',
    template: 'templates/notifications.js',
    controller: 'controllers/notifications.js',
    title: 'Push Notifications'
  },
  {
    url: 'bluetooth',
    template: 'templates/bluetooth.js',
    controller: 'controllers/bluetooth.js',
    title: 'Bluetooth'
  },
  {
    url: 'bluetooth-test',
    template: 'templates/bluetooth2.js',
    controller: 'controllers/bluetooth2.js'
  },
  {
    url: 'contacts',
    template: 'templates/contacts.js',
    controller: 'controllers/contacts.js',
    title: 'Contact Picker API',
    onExit() {
      document.querySelector('#contacts').innerHTML = '';
    }
  },
  {
    url: 'network-info',
    template: 'templates/network-info.js',
    controller: 'controllers/network-info.js',
    title: 'Network Information API'
  },
  {
    url: 'info',
    template: 'templates/info.js',
    controller: 'controllers/info.js'
  },
  {
    url: 'payment',
    template: 'templates/payment.js',
    controller: 'controllers/payment.js',
    title: 'Payment Request API'
  },
  {
    url: 'wake-lock',
    template: 'templates/wake-lock.js',
    controller: 'controllers/wake-lock.js',
    title: 'Wake Lock API'
  },
  {
    url: 'vibration',
    template: 'templates/vibration.js',
    controller: 'controllers/vibration.js',
    title: 'Vibration API'
  },
  {
    url: 'nfc',
    template: 'templates/nfc.js',
    controller: 'controllers/nfc.js',
    title: 'NFC API'
  },
  {
    url: 'file-system',
    template: 'templates/file-system.js',
    controller: 'controllers/file-system.js',
    title: 'File System Access API'
  },
  {
    url: 'file-handling',
    template: 'templates/file-handling.js',
    controller: 'controllers/file-handling.js',
    title: 'File Handling API'
  },
  {
    url: 'protocol-handling',
    template: 'templates/protocol-handling.js',
    controller: 'controllers/protocol-handling.js',
    title: 'Protocol Handling API'
  },
  {
    url: 'protocol-handler-page',
    template: 'templates/protocol-handler-page.js',
    controller: 'controllers/protocol-handler-page.js',
  },
  {
    url: 'barcode',
    template: 'templates/barcode.js',
    controller: 'controllers/barcode.js',
    title: 'Barcode Detection'
  },
  {
    url: 'face-detection',
    template: 'templates/face-detection.js',
    controller: 'controllers/face-detection.js',
    title: 'Face Detection'
  },
  {
    url: 'background-sync',
    template: 'templates/background-sync.js',
    controller: 'controllers/background-sync.js',
    title: 'Background Sync API'
  },
  {
    url: 'background-fetch',
    template: 'templates/background-fetch.js',
    controller: 'controllers/background-fetch.js',
    title: 'Background Fetch API'
  },
  {
    url: 'storage',
    template: 'templates/storage.js',
    controller: 'controllers/storage.js',
    title: 'Web Storage API'
  },
  {
    url: 'audiosession',
    template: 'templates/audiosession.js',
    controller: 'controllers/audiosession.js',
    title: 'Audio Session API'
  },
  {
    url: 'capture-handle',
    template: 'templates/capture-handle.js',
    controller: 'controllers/capture-handle.js',
    title: 'Capture Handle API'
  },
  {
    url: 'image-gallery',
    template: 'templates/image-gallery.js',
    controller: 'controllers/image-gallery.js'
  },
  {
    url: 'element-capture',
    template: 'templates/element-capture.js',
    controller: 'controllers/element-capture.js',
    title: 'Element Capture API'
  },
  {
    url: 'offline',
    template: 'templates/offline.js'
  },
  {
    url: 'email-list',
    template: 'templates/email-list.js',
  },
  {
    url: 'audit',
    template: 'templates/audit.js',
    controller: 'controllers/audit.js'
  }
];
