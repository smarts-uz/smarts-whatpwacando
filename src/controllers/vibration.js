import {isAndroidFirefox, isTouchScreen} from 'lib/utils.js';

export const controller = () => {
  const supported = 'vibrate' in navigator && isTouchScreen() && !isAndroidFirefox();

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  const maker = document.querySelector('#pattern-maker');
  const visualizer = document.querySelector('#pattern-visualizer');
  const recordButton = document.querySelector('#record');
  const playButton = document.querySelector('#play');
  const stopButton = document.querySelector('#stop');
  const ripple = document.querySelector('#ripple');

  recordButton.disabled = !supported;
  visualizer.innerHTML = '';

  let pattern = [];

  const patternLength = 3000;
  let startTime = 0;
  let currentTime = 0;
  let patternTime = 0;
  const frames = [];

  const visualizerWidth = visualizer.offsetWidth;

  const moveRipple = (e) => {
    const touches = [...e.changedTouches];

    if(touches.length) {
      const {pageX, pageY} = touches[0];
      ripple.style.top = `${pageY}px`;
      ripple.style.left = `${pageX}px`;
    }
  };

  const addPatternEntry = (e) => {
    e.preventDefault();

    const {type} = e;
    const touches = [...e.changedTouches];

    frames.map(cancelAnimationFrame);

    type === 'touchstart' ? maker.addEventListener('touchmove', moveRipple) : maker.removeEventListener('touchmove', moveRipple);
    ripple.style.display = type === 'touchstart' ? 'block' : 'none';

    if(touches.length) {
      const {pageX, pageY} = touches[0];
      ripple.style.top = `${pageY}px`;
      ripple.style.left = `${pageX}px`;
    }

    if(startTime !== 0 && Date.now() - startTime >= patternLength) {
      return false;
    }

    if(startTime === 0) {
      startTime = Date.now();
      visualizer.innerHTML = '';
      pattern = [];
    }

    if(patternTime !== 0) {
      pattern.push(currentTime - patternTime);
    }

    patternTime = Date.now();

    const className = type === 'touchstart' ? 'on' : 'off';
    visualizer.insertAdjacentHTML('beforeend', `<div class="${className}"></div>`);

    const curDiv = visualizer.lastChild;

    const run = () => {

      currentTime = Date.now();

      const w = ((currentTime - patternTime) / patternLength) * visualizerWidth;

      curDiv.style.width = `${w}px`;

      if(currentTime - startTime < patternLength) {
        frames.push(requestAnimationFrame(run));
      }
      else {
        pattern.push(currentTime - patternTime);

        startTime = 0;
        currentTime = 0;
        patternTime = 0;

        recordButton.disabled = false;
        playButton.disabled = false;
        ripple.style.display = 'none';

        const totalWidth = [...visualizer.querySelectorAll('div')]
        .reduce((sum, div) => sum + parseFloat(div.style.width), 0);

        const diff = visualizerWidth - totalWidth;
        curDiv.style.width = `${parseFloat(curDiv.style.width) + diff}px`;

        maker.removeEventListener('touchstart', addPatternEntry);
        maker.removeEventListener('touchend', addPatternEntry);
      }
    };

    requestAnimationFrame(run);
  };

  let playId;

  const playVibration = () => {
    playButton.disabled = true;
    stopButton.disabled = false;

    navigator.vibrate(pattern);

    playId = setTimeout(() => {
      playButton.disabled = false;
      stopButton.disabled = true;
    }, patternLength);
  };

  const stopVibration = () => {
    navigator.vibrate(0);

    clearTimeout(playId);

    playButton.disabled = false;
    stopButton.disabled = true;
  };

  playButton.addEventListener('click', playVibration);
  stopButton.addEventListener('click', stopVibration);

  recordButton.addEventListener('click', () => {
    visualizer.innerHTML = '';
    recordButton.disabled = true;
    playButton.disabled = true;

    maker.addEventListener('touchstart', addPatternEntry);
    maker.addEventListener('touchend', addPatternEntry);
  });
}
