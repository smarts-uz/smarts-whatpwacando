import {ShapeDetector} from 'shape-detector.js';

export class BarcodeReader extends ShapeDetector {

  async getDetector() {
    const formats = await BarcodeDetector.getSupportedFormats();
    return new BarcodeDetector({formats});
  }
  parseResults(results) {
    const code = results.length > 0 ? results[0] : undefined;

    if(code && code.rawValue !== '') {
      clearTimeout(this.scanId);
      this.code = code;

      this.drawFrame();

      const {cornerPoints} = code;
      this.drawBoundingBox(cornerPoints, false);

      this.capturing = false;

      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('result', {
          detail: {code}
        }));
      }, 500);
    }
    else {
      this.scanId = setTimeout(this.getResults.bind(this), 1000);
    }
  }
}

customElements.define('barcode-reader', BarcodeReader);
