import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader
} from '../three/build/three.module.js';

import {CustomElement} from '../_40dannymoerkerke/custom-element/dist/custom-element.es.js';
import '../_40dannymoerkerke/material-webcomponents/src/material-button.js';

export class DeviceOrientation extends CustomElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        #container {
          width: 100%;
          height: 300px;
        }
        
        #permission {
          margin-bottom: 15px;
        }
      </style>
       
      
       <material-button id="permission" label="Enable sensors" raised></material-button>
      
      <div id="container"></div>
    `;
  }

  connectedCallback() {
    this.permissionButton = this.select('#permission');

    this.permissionButton.addEventListener('click', async e => {
      const permission = await this.requestPermission();
    });

    this.deviceOrientationSupported() ? this.requestPermission() : this.hide(this.permissionButton);

    const container = this.shadowRoot.querySelector('#container');
    const {width, height} = container.getBoundingClientRect();

    const init = texture => {
      const scene = new Scene();
      const camera = new PerspectiveCamera(30, width / height, 0.1, 1000);
      const geometry = new BoxBufferGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({map: texture});
      const cube = new Mesh(geometry, material);

      scene.add(cube);

      camera.position.z = 4;

      const renderer = new WebGLRenderer({antialias: true});
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      renderer.render(scene, camera);

      if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', ({beta, gamma}) => {
          requestAnimationFrame(() => {
            cube.rotation.x = parseInt(beta, 10) / 50;
            cube.rotation.y = parseInt(gamma, 10) / 50;

            renderer.render(scene, camera);
          });
        });
      }
    };

    new TextureLoader().load('../src/img/crate.gif', init);
  }

  deviceOrientationSupported() {
    return 'DeviceOrientationEvent' in window && 'requestPermission' in DeviceOrientationEvent;
  }

  async requestPermission() {
    let permission = null;

    try {
      permission = await DeviceOrientationEvent.requestPermission();
      this.hide(this.permissionButton);
    }
    catch(e) {
      this.show(this.permissionButton);
    }

    return permission;
  }
}

customElements.define('device-orientation', DeviceOrientation);
