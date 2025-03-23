import {CustomElement} from '../_40dannymoerkerke/custom-element/dist/custom-element.es.js';
import '../_40dannymoerkerke/material-webcomponents/src/material-button.js';

export class DeviceMotion extends CustomElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        :host {
          --x-rotate: 0deg;
          --y-rotate: 0deg;
          --z-rotate: 0deg;  
        }
        
        #container {
          height: 300px;
          border: 1px solid #cccccc;
          position: relative;
        }
        
        #ball {
          position: absolute;
          width: 30px;
          height: 30px;
          background-color: #ff0000;
          border: 1px solid #ff0000;
          border-radius: 50%;
          transform: translate(50%, 50%);
        }
        
        #permission {
          margin-bottom: 15px;
        }
  
      </style>
      
      <h2>
      
      </h2>      
      
      <material-button id="permission" label="Enable sensors" raised></material-button>
      
      <div id="container">
        <div id="ball"></div>
      </div>
    `;
  }

  connectedCallback() {
    this.permissionButton = this.select('#permission');

    this.permissionButton.addEventListener('click', async e => {
      const permission = await this.requestPermission();
    });

    this.deviceMotionSupported() ? this.requestPermission() : this.hide(this.permissionButton);

    const container = this.select('#container');
    const ball = this.select('#ball');

    const {width, height} = container.getBoundingClientRect();
    const ballWidth = 60;
    const ballHeight = 60;
    const decay = .95;
    const bounceDecay = .95;
    const maxVelocity = 100;

    const velocity = {
      x: 0,
      y: 0
    };

    const position = {
      left: (width - ballWidth) / 2,
      top: (height - ballHeight) / 2
    };

    const updateVelocity = ({acceleration, accelerationIncludingGravity}) => {
      const {x, y} = acceleration;

      velocity.x += x;
      velocity.y += y;

      if(Math.abs(velocity.x) > maxVelocity) {
        velocity.x = velocity.x > 0 ? maxVelocity : -maxVelocity;
      }
      if(Math.abs(velocity.y) > maxVelocity) {
        velocity.y = velocity.y > 0 ? maxVelocity : -maxVelocity;
      }

      requestAnimationFrame(updateBall);
    };

    const constrain = (value, min, max) => Math.min(max, Math.max(min, value));

    const updateBall = () => {
      velocity.x = position.left <= -(ballWidth / 2) ? Math.abs(velocity.x * bounceDecay) :
        position.left >= (width - (ballWidth / 2)) ? -Math.abs(velocity.x * bounceDecay) : parseInt(velocity.x) * decay;

      velocity.y = position.top <= -(ballHeight / 2) ? -Math.abs(velocity.y * bounceDecay) :
        position.top >= (height - (ballHeight / 2)) ? Math.abs(velocity.y * bounceDecay) : parseInt(velocity.y) * decay;

      position.left += velocity.x;
      position.top -= velocity.y;

      position.left = constrain(position.left, 0, width - ballWidth);
      position.top = constrain(position.top, 0, height - ballHeight);

      ball.style.transform = `translate(${position.left}px, ${position.top}px`;
    };

    if(window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', updateVelocity, false);
    }
  }

  deviceMotionSupported() {
    return 'DeviceMotionEvent' in window && 'requestPermission' in DeviceMotionEvent;
  }

  async requestPermission() {
    let permission = null;

    try {
      permission = await DeviceMotionEvent.requestPermission();
      this.hide(this.permissionButton);
    }
    catch(e) {
      this.show(this.permissionButton);
    }

    return permission;
  }
}

customElements.define('device-motion', DeviceMotion);
