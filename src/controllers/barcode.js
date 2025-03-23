import {isIOSSafari} from 'lib/utils.js';

export const controller = async () => {
  const supported = ('BarcodeDetector' in window) && ((await BarcodeDetector.getSupportedFormats()).includes('qr_code'));

  if(!supported && !isIOSSafari()) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(!supported && isIOSSafari()) {
    document.querySelector(`[data-view="${location.pathname}"] .no-support-ios`).style.display = 'block';
  }

  const reader = document.querySelector('barcode-reader');
  const scanButton = document.querySelector('#scan-button');
  const stopScanButton = document.querySelector('#stop-scan-button');
  const codeDialog = document.querySelector('#code-dialog');
  const dialogBody = codeDialog.querySelector('[slot="body"]');
  const cancelButton = document.querySelector('#cancel-dialog');
  const closeButton = document.querySelector('#close-dialog');

  scanButton.disabled = !supported;

  scanButton.addEventListener('click', () => {
    reader.scan();
  });

  stopScanButton.addEventListener('click', () => {
    reader.stopScan();
  });

  closeButton.addEventListener('click', () => {
    codeDialog.close();
  });

  reader.addEventListener('scan-start', () => {
    scanButton.disabled = true;
    stopScanButton.disabled = false;
  });

  reader.addEventListener('scan-stop', () => {
    scanButton.disabled = false;
    stopScanButton.disabled = true;
  });

  reader.addEventListener('result', e => {
    const {rawValue} = e.detail.code;

    let url;
    let textContent;

    try {
      url = new URL(rawValue);
      textContent = `Navigate to ${rawValue}?`;
    }
    catch(e) {
      url = null;
      textContent = `Detected code: ${rawValue}`;
    }

    dialogBody.textContent = textContent;
    codeDialog.open();

    closeButton.addEventListener('click', (e) => {
      if(url) {
        window.open(url, '_blank');
      }

      codeDialog.close();

      reader.scan();
    });

    cancelButton.addEventListener('click', () => {
      codeDialog.close();

      reader.scan();
    });
  });
}
