export const controller = () => {
  const supported = 'PaymentRequest' in window
  const applePaySupported = 'ApplePaySession' in window && ApplePaySession.canMakePayments();

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  if(applePaySupported) {
    document.querySelector('#apple-pay-support').style.display = 'block';
  }
  else {
    document.querySelector('#payment-support').style.display = 'block';
  }

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

  const googlePayMethod = {
    supportedMethods: '../https@google.com/pay',
    data: {
      environment: 'TEST',
      apiVersion: 2,
      apiVersionMinor: 0,
      merchantInfo: {
        // A merchant ID is available after approval by Google.
        // 'merchantId':'12345678901234567890',
        merchantName: 'What PWA Can Do Today'
      },
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // Check with your payment gateway on the parameters to pass.
          // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
          parameters: {
            'gateway': 'example',
            'gatewayMerchantId': 'exampleGatewayMerchantId'
          }
        }
      }]
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
    const options = {
      requestPayerEmail: true,
      requestPayerName: true
    };

    paymentButton.addEventListener('click', async () => {
      const request = new PaymentRequest([googlePayMethod], paymentDetails, options);
      const response = await request.show();

      console.log(response);
    });
  }
}
