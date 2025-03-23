export const controller = () => {
  const userMediaSupported = ('mediaDevices' in navigator) && ('getUserMedia' in navigator.mediaDevices);
  const mediaRecorderSupported = 'MediaRecorder' in window;

  if(!mediaRecorderSupported) {
    document.querySelector('#mediarecorder-support').style.display = 'block';
  }
  if(!userMediaSupported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  const recorder = document.querySelector('audio-recorder');
  const micPermissionDialog = document.querySelector('#mic-permission-dialog');
  const closeButton = document.querySelector('#dialog-close');

  recorder.addEventListener('notallowed', () => micPermissionDialog.open());
  closeButton.addEventListener('click', () => micPermissionDialog.close());
}
