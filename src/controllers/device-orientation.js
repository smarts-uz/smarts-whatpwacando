export const controller = () => {
  const supported = 'DeviceOrientationEvent' in window && isTouchScreen();
  const noSensorPermission = supported && !('requestPermission' in DeviceOrientationEvent);

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(noSensorPermission && (isAndroidEdge() || isAndroidChrome())) {
    document.querySelector('#enable-sensors').style.display = 'block';
  }

  const sensorButton = document.querySelector('#sensor-button1');
  const sensorDialog = document.querySelector('#sensor-dialog');
  const closeButton = document.querySelector('#close-sensor-dialog');

  if(noSensorPermission) {
    const template = getSensorSheetTemplate();

    if(!sensorDialog.querySelector('.body')) {
      sensorDialog.querySelector('section').insertAdjacentHTML('afterbegin', template);
    }

    sensorButton && sensorButton.addEventListener('click', () => {
      sensorDialog.showModal();
    });

    closeButton.addEventListener('click', e => {
      sensorDialog.close();

      // fix for < iOS 17.2, when the install dialog is shown and closed the user can no longer scroll the page
      // by removing overflow:hidden from the main content and reapplying it with a short delay this is fixed
      const mainContent = document.querySelector('#main-content');
      mainContent.style.overflow = 'auto';
      setTimeout(() => {
        mainContent.style.overflow = 'hidden';
      }, 100);
    });
  }
}
