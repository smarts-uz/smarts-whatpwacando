import {CustomElement} from '../_40dannymoerkerke/custom-element/dist/custom-element.es.js';

export class NetworkInformation extends CustomElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
        }
        tr td:first-child {
          font-weight: bold;
        }
      </style>
            
      <table>
        <tbody>
          <tr>
            <td>Status</td>
            <td data-bind="connection.status"></td>
          </tr>
          <tr>
            <td>Network type</td>
            <td data-bind="connection.type"></td>
          </tr>
          <tr>
            <td>Network effective type</td>
            <td data-bind="connection.effectiveType"></td>
          </tr>
          <tr>
            <td>Download speed</td>
            <td data-bind="connection.downlink"></td>
          </tr>
          <tr>
            <td>RTT</td>
            <td data-bind="connection.rtt"></td>
          </tr>
        </tbody>
      </table>      
      
    `;
  }

  connectedCallback() {
    const connection = navigator.connection;

    const status = navigator.onLine ? 'online' : 'offline';

    this.setState({
      connection: {
        effectiveType: connection && connection.effectiveType ? connection.effectiveType : 'n/a',
        type: connection && connection.type ? connection.type : 'n/a',
        downlink: connection ? `${connection.downlink} mbps` : 'n/a',
        rtt: connection ? `${connection.rtt} ms` : 'n/a',
        status
      }
    });


    connection && connection.addEventListener('change', this.networkChanged.bind(this));

    window.addEventListener('offline', () => this.setState({connection: {status: 'offline'}}));
    window.addEventListener('online', () => this.setState({connection: {status: 'online'}}));
  }

  networkChanged({target}) {
    const {effectiveType, type, downlink, rtt} = target;

    const connection = {
      effectiveType,
      type,
      downlink,
      rtt
    };

    this.setState({connection});

    this.dispatchEvent(new CustomEvent('networkchange', {
      composed: true,
      bubbles: true,
      detail: {connection}
    }));
  }
}

customElements.define('network-information', NetworkInformation);
