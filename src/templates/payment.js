import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-loader.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="payment-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Payment</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Payment Request API provides a browser-based method to enable users to make payments on the web, using a credit 
      card, Apple Pay or Google Pay for example.
    </p>
    
    <p>Safari on iOS currently only supports Apple Pay.</p>
  
    <h3>
      Demo
    </h3>
    
    <div id="apple-pay-support">
      <p>
        Click the Apple Pay button below to make a payment<br>
        <em>(demo only, no actual payment is made).</em>
      </p>
      <p>
        <button id="apple-pay-button"></button>
      </p>
    </div>

    <div id="payment-support">
      <p>
        Click the Checkout button below to make a payment<br>
        <em>(demo only, no actual payment is made).</em>
      </p>
      <p>
        <material-button id="payment-button" label="Checkout" raised >
          <i class="material-icons" translate="no" slot="left-icon">credit_card</i>
        </material-button>
      </p>
    </div>
    
    <code-snippet lang="js">
const applePayButton = document.querySelector('#apple-pay-button');
const paymentButton = document.querySelector('#payment-button');

const applePayMethod = {
  supportedMethods: '../https@apple.com/apple-pay',
  data: {
    version: 3,
    merchantIdentifier: 'merchant.whatpwacando.today',
    merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit'],
    supportedNetworks: ['amex', 'discover', 'masterCard', 'visa', 'maestro'],
    countryCode: 'US',
  },
};

const cardMethod = {
  supportedMethods: 'basic-card',
  data: {
    supportedNetworks: [
      'visa', 'mastercard'
    ]
  }
};

const paymentDetails = {
  id: 'order-123',
  displayItems: [
    {
      label: 'PWA Demo Payment',
      amount: {currency: 'USD', value: '0.01'}
    }
  ],
  total: {
    label: 'Total',
    amount: {currency: 'USD', value: '0.01'}
  }
};

if(applePayButton) {
  applePayButton.addEventListener('click', async () => {
    const request = new PaymentRequest([applePayMethod], paymentDetails);
    const response = await request.show();

    console.log(response);
  });
}

if(paymentButton) {
  paymentButton.addEventListener('click', async () => {
    const request = new PaymentRequest([cardMethod], paymentDetails);
    const response = await request.show();

    console.log(response);
  });
}    
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Using_the_Payment_Request_API" target="_blank" rel="noopener">
        Payment Request API on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=payment-request" target="_blank" rel="noopener">
          Payment Request API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
