export const controller = async () => {
  const supported = 'audioSession' in navigator;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  const audioSessionType = document.querySelector('[name="audiosession-type"]');

  audioSessionType.addEventListener('change', ({detail}) => {
    const {value} = detail;
    navigator.audioSession.type = value;
  });

  navigator.audioSession.addEventListener('statechange', (e) => {
    console.log(e, navigator.audioSession.state);
  });
}
