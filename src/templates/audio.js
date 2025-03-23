import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import 'src/elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="audio-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Audio</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Media Session API allows an app to display controls for media playback on a device's lock screen.
    </p>
    
    <p>
      On a supporting device, play the audio below and then lock the device to see the controls appear on the lock screen.
    </p>
  
    <audio controls src="src/thievery-corporation.mp3"></audio>
    
    <code-snippet lang="js">
if('mediaSession' in navigator) {
  const player = document.querySelector('audio');

  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Shadows of Ourselves',
    artist: 'Thievery Corporation',
    album: 'The Mirror Conspiracy',
    artwork: [
      {
        src: 'src/img/media/mirror-conspiracy256x256.jpeg',
        sizes: '256x256',
        type: 'image/jpeg'
      },
      {
        src: 'src/img/media/mirror-conspiracy512x512.jpeg',
        sizes: '512x512',
        type: 'image/jpeg'
      }
    ]
  });

  navigator.mediaSession.setActionHandler('play', () => player.play());
  navigator.mediaSession.setActionHandler('pause', () => player.pause());
  navigator.mediaSession.setActionHandler('seekbackward', (details) => {
    const skipTime = details.seekOffset || 1;
    player.currentTime = Math.max(player.currentTime - skipTime, 0);
  });

  navigator.mediaSession.setActionHandler('seekforward', (details) => {
    const skipTime = details.seekOffset || 1;
    player.currentTime = Math.min(player.currentTime + skipTime, player.duration);
  });

  navigator.mediaSession.setActionHandler('seekto', (details) => {
    if (details.fastSeek && 'fastSeek' in player) {
      player.fastSeek(details.seekTime);
      return;
    }
    player.currentTime = details.seekTime;
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    player.currentTime = 0;
  });
}    
    </code-snippet>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="../https@developer.mozilla.org/en-US/docs/Web/API/Media_Session_API" target="_blank" rel="noopener">
          Media Session API on MDN
        </a>
      </p>
      
      <h3>Browser support</h3>
      <a href="../https@caniuse.com/#search=mediasession" target="_blank" rel="noopener">
        MediaSession API on caniuse.com
      </a>
    </section>
  </div>
</div>
`;
