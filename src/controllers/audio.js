export const controller = () => {
  const supported = 'mediaSession' in navigator;
  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(supported) {
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
}
