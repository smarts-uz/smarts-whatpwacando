export const controller = () => {
  const mediaRecorderSupported = 'MediaRecorder' in window;
  const pipButton = document.querySelector('#pip-button');
  const webCam = document.querySelector('web-cam');
  pipButton.disabled = true;

  const supported = 'documentPictureInPicture' in window;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  else {
    webCam.addEventListener('capturing', () => {
      pipButton.disabled = false;
    });

    webCam.addEventListener('stopped', () => {
      pipButton.disabled = true;
    });
  }

  if(!mediaRecorderSupported) {
    document.querySelector('#mediarecorder-support').style.display = 'block';
  }

  const openPipWindow = async () => {
    const pipWindow = await documentPictureInPicture.requestWindow({
      width: 800,
      height: 600
    });
    const webCam = document.querySelector('web-cam');

    pipWindow.document.body.appendChild(webCam);
    pipWindow.document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="src/css/styles.css">`);

    pipWindow.addEventListener('unload', (e) => {
      const webCamContainer = document.querySelector('.web-cam-container');
      const webCam =  e.target.querySelector('web-cam');

      webCamContainer.appendChild(webCam);
    })
  };

  pipButton.addEventListener('click', openPipWindow);
}
