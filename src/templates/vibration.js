import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-switch.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="vibration-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Vibration</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Vibration API enables web apps to make a mobile device vibrate.
    </p>
    
    <h3>Demo</h3>
    
    <p>
      Tap, hold and lift your finger on the surface below to create a vibration pattern. Use the Play button to play the 
      vibration pattern on your device.
    </p>
    
    <div id="buttons">
        <material-button id="record" label="Record" raised>
          <i class="material-icons" translate="no" slot="left-icon">fiber_manual_record</i>
        </material-button>
        
        <material-button id="play" label="Play" raised disabled>
          <i class="material-icons" translate="no" slot="left-icon">play_arrow</i>
        </material-button>
        
        <material-button id="stop" label="Stop" raised disabled>
          <i class="material-icons" translate="no" slot="left-icon">stop</i>
        </material-button>
        <br>
    </div>
    
    <div id="pattern-visualizer"></div>
    <div id="pattern-maker"></div>
    
    <div id="ripple"></div>
    
    <code-snippet lang="js">
const maker = document.querySelector('#pattern-maker');
const visualizer = document.querySelector('#pattern-visualizer');
const recordButton = document.querySelector('#record');
const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const ripple = document.querySelector('#ripple');

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
    ripple.style.top = \`$\{pageY\}px\`;
    ripple.style.left = \`$\{pageX\}px\`;
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
    ripple.style.top = \`$\{pageY\}px\`;
    ripple.style.left = \`$\{pageX\}px\`;
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
  visualizer.insertAdjacentHTML('beforeend', \`<div class="$\{className\}"></div>\`);

  const curDiv = visualizer.lastChild;

  const run = () => {

    currentTime = Date.now();

    const w = ((currentTime - patternTime) / patternLength) * visualizerWidth;

    curDiv.style.width = \`$\{w\}px\`;

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
      curDiv.style.width = \`$\{parseFloat(curDiv.style.width) + diff\}px\`;

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
    </code-snippet>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Vibration_API" target="_blank" rel="noopener">
        Vibration API on MDN
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=vibration" target="_blank" rel="noopener">
          Vibration API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
