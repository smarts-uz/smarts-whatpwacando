import {isAndroidFirefox, isTouchScreen} from 'utils.js';

export const supported = {
  userMedia: ('mediaDevices' in navigator) && ('getUserMedia' in navigator.mediaDevices),
  mediaRecorder: 'MediaRecorder' in window,
  geolocation: 'geolocation' in navigator,
  notifications: 'PushManager' in window,
  viewTransitions: 'startViewTransition' in document,
  fileSystem: 'showDirectoryPicker' in window,
  opfs: 'getDirectory' in navigator.storage,
  authentication: 'credentials' in navigator,
  protocolHandling: 'registerProtocolHandler' in navigator,
  fileHandling: 'launchQueue' in window && 'files' in LaunchParams.prototype,
  contacts: 'contacts' in navigator && 'ContactsManager' in window,
  webShare: 'share' in navigator,
  barcodeDetection: 'BarcodeDetector' in window,
  faceDetection: 'FaceDetector' in window,
  vibration: 'vibrate' in navigator && isTouchScreen() && !isAndroidFirefox(),
  mediaSession: 'mediaSession' in window,
  audioSession: 'audioSession' in navigator,
  captureHandle: 'getCaptureHandle' in MediaStreamTrack.prototype && 'setCaptureHandleConfig' in navigator.mediaDevices,
  async backgroundSync() {
    const registration = await navigator.serviceWorker.getRegistration();
    return registration && 'sync' in registration;
  },
  backgroundFetch: 'BackgroundFetchManager' in window,
  persistentStorage: 'storage' in navigator,
  bluetooth: 'bluetooth' in navigator,
  nfc: 'NDEFReader' in window,
  ar_vr: document.createElement('a').relList.supports('ar'),
  payment: 'PaymentRequest' in window,
  applePay: 'ApplePaySession' in window && ApplePaySession.canMakePayments(),
  wakeLock: 'wakeLock' in navigator,
  deviceOrientation: 'DeviceOrientationEvent' in window && isTouchScreen(),
  deviceMotion: 'DeviceMotionEvent' in window && isTouchScreen(),
  networkInfo: 'connection' in navigator,
  speechSynthesis: 'speechSynthesis' in window,
  speechRecognition: 'webkitSpeechRecognition' in window,
}
