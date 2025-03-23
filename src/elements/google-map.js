import '../_40dannymoerkerke/material-webcomponents/src/material-loader.js';

export class GoogleMap extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    this.timerId = null;

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        material-loader {
          width: 68px;
          display: block;
          margin: 0 auto;
        }
      </style>
      
      <div id="container">
        <material-loader size="64"></material-loader>
        <div id="map"></div>
      </div>
    `;
  }

  connectedCallback() {
    window.addEventListener('navigate', (e) => {
      if(this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    });

    if(!this.hasAttribute('api-key')) {
      throw new Error('A valid Google API key is required');
    }

    this.loader = this.shadowRoot.querySelector('material-loader');

    const defaultZoom = 15;
    this.zoom = this.getAttribute('zoom') || defaultZoom;

    this.initialized = false;
    this.apiKey = this.getAttribute('api-key');
    this.container = this.shadowRoot.querySelector('#container');
    this.mapContainer = this.shadowRoot.querySelector('#map');

    const height = this.getAttribute('height') || 300;
    this.mapContainer.style.height = `${height}px`;
  }

  async getCurrentPosition() {
    if(!this.initialized && !this.isGoogleScriptLoaded()) {
      await this.loadGoogleScript();
    }

    const positionPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const {latitude, longitude} = coords;
        const center = {
          lat: latitude,
          lng: longitude
        };

        this.map = new google.maps.Map(this.mapContainer, {
          center,
          zoom: this.zoom
        });

        this.map.setCenter(center);

        this.map.addListener('tilesloaded', () => {
          resolve({latitude, longitude});
          this.loader.style.display = 'none';
        });

        this.map.addListener('idle', () => {
          this.loader.style.display = 'none';
        });

      },
err => reject(err),
    {timeout: 4000})
    });

    const timeoutPromise = new Promise((resolve, reject) => {
      this.timerId = setTimeout(() => {
        this.timerId = null;
        resolve({error: 'Permission error'});
      }, 4500);
    });

    return Promise.race([positionPromise, timeoutPromise]);
  }

  addMarker(lat, lng) {
    return new google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      animation: google.maps.Animation.DROP
    });
  }

  loadGoogleScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;

      script.onload = () => resolve(true);
      script.onerror = err => reject(err);

      this.shadowRoot.appendChild(script);
    });
  }

  isGoogleScriptLoaded() {
    return 'google' in window && 'maps' in google;
  }
}

customElements.define('google-map', GoogleMap);
