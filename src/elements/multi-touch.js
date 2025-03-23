export class MultiTouch extends HTMLElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;  
        }
        #container {
          height: 100%;
        }
        canvas {
          border: 1px solid #000000;
        }
        @media (prefers-color-scheme: dark) {
          canvas {
          border: 1px solid var(--base-font-color);
          }
        }
      </style>
        
      <div id="container">
        <canvas width="376" height="332"></canvas>
      </div>      
      
    `;
  }

  connectedCallback() {
    this.output = this.shadowRoot.querySelector('#output');
    this.canvas = this.shadowRoot.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.touches = [];

    const getCanvasDimensions = e => {
      const rect = this.canvas.getBoundingClientRect();

      this.canvasTop = rect.top;
      this.canvasLeft = rect.left;
      this.canvasWidth = rect.width;
      this.canvasHeight = rect.height;

      this.handleTouchStart(e);

      this.canvas.removeEventListener('touchstart', getCanvasDimensions);
      this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    };

    this.canvas.addEventListener('touchstart', getCanvasDimensions);
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
  }

  handleTouchStart(e) {
    e.preventDefault();

    const touches = [...e.changedTouches];

    touches.forEach((touch) => {
      this.touches.push(this.copyTouch(touch));

      if(this.touches.length === 2) {
        this.drawCircle(this.calculateCircle(this.touches));
      }
    });
  }

  handleTouchEnd(e) {
    e.preventDefault();

    const touches = [...e.changedTouches];
    this.touches = this.touches.filter(ct => !touches.find(t => t.identifier === ct.identifier));

    if(this.touches.length < 2) {
      this.clearCanvas();
    }
  }

  handleTouchMove(e) {
    e.preventDefault();

    const touches = [...e.changedTouches];

    this.touches = this.touches.map(ct => touches.find(t => t.identifier === ct.identifier) || ct);

    if(this.touches.length === 2) {
      this.drawCircle(this.calculateCircle(this.touches));
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  calculateCircle([t1, t2]) {
    const diffX = Math.abs(t1.clientX - t2.clientX);
    const diffY = Math.abs(t1.clientY - t2.clientY);

    const x = (t1.clientX + t2.clientX) / 2;
    const y = (t1.clientY + t2.clientY) / 2;
    const radius = diffX > diffY ? diffX / 2 : diffY / 2;

    return {x, y, radius};
  }

  drawCircle({x, y, radius}) {
    this.clearCanvas();
    this.ctx.beginPath();
    this.ctx.arc(x - this.canvasLeft, y - this.canvasTop, radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fill();
  }

  copyTouch({identifier, clientX, clientY}) {
    return {identifier, clientX, clientY};
  }
}

customElements.define('multi-touch', MultiTouch);
