import {FormElementMixin} from 'FormElementMixin.js';

class formField extends FormElementMixin(HTMLElement) {
  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({mode: 'open'});

      shadowRoot.innerHTML = /*html*/`
        <style>
          input {
            padding: 0.5rem;
            font-size: 1rem;
            width: 90%;
            border: none;
            
            &:focus {
              outline: none;
            }
          }

          @media (prefers-color-scheme: dark) {
            input {
              background-color: #1e1e1e;
              color: #ffffff;
              border-color: #ffffff;
            }
          }
        </style>
        
        <input part="input">
      `;
    }
  }

  connectedCallback() {
    this.inputNode = this.shadowRoot.querySelector('input');

    this.inputNode.addEventListener('change', () => {
      setTimeout(() => {
        if(this.inputNode.matches(':autofill')) {
          this.dispatchEvent(new CustomEvent('autofill', {composed: true, bubbles: true}));
        }
      });
    });
  }
}

customElements.define('form-field', formField);
