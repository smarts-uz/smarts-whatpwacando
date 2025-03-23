import {getSheetTemplate as getGeolocationSheetTemplate} from 'templates/geolocationsheet.js';

export const controller = () => {
  const supported = 'geolocation' in navigator;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  customElements.whenDefined('google-map')
  .then(async () => {
    const map = document.querySelector('google-map');
    const geolocationDialog = document.querySelector('#geolocation-dialog');
    const closeButton = document.querySelector('#close-geolocation-dialog');

    let geolocationError = false;

    try {
      const {latitude, longitude, error} = await map.getCurrentPosition();
      if(error) {
        // timeout error
        geolocationError = true;
      }
      else {
        map.addMarker(latitude, longitude);
      }
    }
    catch(err) {
      if(err.PERMISSION_DENIED === 1) {
        geolocationError = true;
      }
    }
    finally {
      if(geolocationError) {
        const template = getGeolocationSheetTemplate();

        if(!geolocationDialog.querySelector('.body')) {
          geolocationDialog.querySelector('section').insertAdjacentHTML('afterbegin', template);
        }

        closeButton.addEventListener('click', e => {
          geolocationDialog.close();

          // fix for < iOS 17.2, when the install dialog is shown and closed the user can no longer scroll the page
          // by removing overflow:hidden from the main content and reapplying it with a short delay this is fixed
          const mainContent = document.querySelector('#main-content');
          mainContent.style.overflow = 'auto';
          setTimeout(() => {
            mainContent.style.overflow = 'hidden';
          }, 100);
        });

        // timeout for error dialog since otherwise it shows too quickly
        setTimeout(() => {
          if(template) {
            geolocationDialog.showModal();
          }
        }, 500);
      }
    }
  });
}
