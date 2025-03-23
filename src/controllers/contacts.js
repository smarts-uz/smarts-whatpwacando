import {isIOSSafari} from 'lib/utils.js';

export const controller = async () => {
  const supported = 'contacts' in navigator && 'ContactsManager' in window;

  if(!supported && !isIOSSafari()) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(!supported && isIOSSafari()) {
    document.querySelector(`[data-view="${location.pathname}"] .no-support-ios`).style.display = 'block';
  }
  const selectContactsButton = document.querySelector('#select-contacts');
  selectContactsButton.disabled = !supported;

  if(supported) {
    const props = await navigator.contacts.getProperties();
    const list = document.querySelector('#contacts');

    list.innerHTML = '';

    const showContacts = contacts => {
      const html = contacts.reduce((html, contact) => {
        const names = contact.name.join(', ');
        const emails = contact.email.join(', ');
        const telephone = contact.tel.join(', ');

        return `${html}
            <p>
              <span>
                <i class="material-icons">person</i>
                <strong>${names}</strong><br>
              </span>
              <span>
                <i class="material-icons">mail_outline</i>
                ${emails}<br>
              </span>
              <span>
                <i class="material-icons">phone</i>
                ${telephone}</p>
              </span>
            `;
      }, ``);

      list.innerHTML = html;
    };

    selectContactsButton.addEventListener('click', async e => {
      const contacts = await navigator.contacts.select(props, {multiple: true});

      showContacts(contacts);
    });
  }
}
