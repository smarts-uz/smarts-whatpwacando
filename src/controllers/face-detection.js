import {isIOSSafari} from 'lib/utils.js';

export const controller = async () => {
  const supported = await (async () => 'FaceDetector' in window &&
    await new FaceDetector().detect(document.createElement('canvas'))
    .then(_ => true)
    .catch(e => e.name === 'NotSupportedError' ? false : true))();

  if(!supported && !isIOSSafari()) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(!supported && isIOSSafari()) {
    document.querySelector(`[data-view="${location.pathname}"] .no-support-ios`).style.display = 'block';
  }

  const detector = document.querySelector('face-detector');
  const scanButton = document.querySelector('#scan-button-face');
  const stopScanButton = document.querySelector('#stop-scan-button-face');
  const showFacialFeatures = document.querySelector('#facial-features');

  scanButton.disabled = !supported;

  scanButton.addEventListener('click', () => {
    detector.scan();
  });

  stopScanButton.addEventListener('click', () => {
    detector.stopScan();
  });

  detector.addEventListener('scan-start', () => {
    scanButton.disabled = true;
    stopScanButton.disabled = false;
  });

  detector.addEventListener('scan-stop', () => {
    scanButton.disabled = false;
    stopScanButton.disabled = true;
  });

  showFacialFeatures.addEventListener('change', ({detail}) => {
    console.log(detail);
    detector.facialFeatures = detail.checked;
  })

}
