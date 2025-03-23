import {ShapeDetector} from 'shape-detector.js';

export class FaceRecognizer extends ShapeDetector {
  constructor() {
    super();
    this.setAttribute('no-frame', '');
  }

  connectedCallback() {
    super.connectedCallback();
    this.prevFace = null;
    this.facialFeatures = false;
  }

  get facialFeatures() {
    return this.hasAttribute('facial-features');
  }

  set facialFeatures(showFeatures) {
    showFeatures ? this.setAttribute('facial-features', '') : this.removeAttribute('facial-features');
  }

  async isSupported() {
    return await (async () => 'FaceDetector' in window &&
      await new FaceDetector().detect(document.createElement('canvas'))
      .then(_ => true)
      .catch(e => e.name === 'NotSupportedError' ? false : true))();
  }

  async getDetector() {
    if(await this.isSupported()) {
      return new FaceDetector();
    }
    console.warn('Face Recognition is not supported in this browser');
    return null;
  }

  parseResults(results) {
    const face = results.length > 0 ? results[0] : undefined;

    if(face) {
      const {x, y} = face.boundingBox;
      let drawNewBox = true;

      if(this.facialFeatures && face.landmarks) {
        face.landmarks.forEach(({locations}) => {
          this.drawShapeFromCoords(locations)
        })
      }

      if(this.prevFace) {
        const {x: prevX, y: prevY} = this.prevFace.boundingBox;

        const diffX = Math.abs(x - prevX);
        const diffY = Math.abs(y - prevY);

        drawNewBox = diffX + diffY >= 4;
      }

      this.prevFace = face;

      if(drawNewBox) {
        this.drawBoundingBox(this.DOMRectToBoundingBox(face.boundingBox));
      }
    }
    else {
      this.clearCanvas();
    }

    if(this.capturing) {
      this.getResults();
    }
  }
}

customElements.define('face-detector', FaceRecognizer);
