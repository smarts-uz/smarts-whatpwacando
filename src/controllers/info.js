export const controller = async () => {
  await Promise.all([
    customElements.whenDefined('material-textfield'),
    customElements.whenDefined('material-button')
  ]);

  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');
  const challenge = document.querySelector('#challenge');
  const sendButton = document.querySelector('#send-button');
  const result = document.querySelector('#result');
  const contactApi = '../https@g9lcsu3pq0.execute-api.us-east-1.amazonaws.com/contact'

  const handleButton = () => sendButton.disabled = !(name.isValid() && email.isValid() && challenge.value === '7'
    && message.validity.valid);

  name.addEventListener('change', handleButton);
  email.addEventListener('change', handleButton);
  message.addEventListener('keyup', handleButton);
  challenge.addEventListener('keyup', handleButton);

  sendButton.addEventListener('click', async () => {
    sendButton.disabled = true;

    const body = {
      name: name.value,
      email: email.value,
      message: message.value,
      challenge: challenge.value
    };

    fetch(contactApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      name.value = '';
      email.value = '';
      message.value = '';
      challenge.value = '';

      result.textContent = 'Message sent!';
    })
    .catch(err => {
      console.log('error', err);

      result.classList.add('error');
      result.textContent = 'Something went wrong, please try again';
    })
    .finally(() => {
      setTimeout(() => {
        result.textContent = '';
        result.classList.remove('error');
      }, 5000);
    });
  });

  handleButton();
}
