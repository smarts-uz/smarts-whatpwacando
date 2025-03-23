import {isSafari} from 'lib/utils.js';

export const controller = async () => {
  const supported = 'BackgroundFetchManager' in window;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(supported && isSafari()) {
    document.querySelector(`[data-view="${location.pathname}"] .no-support-ios`).style.display = 'block';
  }
  const downloadButtons = document.querySelectorAll('.tracklist material-button');
  const registration = await navigator.serviceWorker.ready;

  const ids = await registration.backgroundFetch.getIds();

  for(const id of ids) {
    const bgFetch = await registration.backgroundFetch.get(id);

    if(bgFetch) {
      const progressIndicator = document.querySelector(`#${id}`);
      const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
      progressIndicator.value = percent;

      progressIndicator.closest('li').classList.add('active');

      bgFetch.addEventListener('progress', () => {
        if (!bgFetch.downloadTotal) return;

        const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
        console.log('progress', percent, bgFetch);
        progressIndicator.value = percent;
      });
    }
  }

  const startBackgroundFetch = async (trackId) => {
    console.log('start fetch for track', trackId);

    const bgFetch = await registration.backgroundFetch.fetch(`track-${trackId}`,
      [
        `https://traffic.libsyn.com/secure/http203/HTT_P012_v3.mp3`,
        `https://traffic.libsyn.com/secure/http203/podcast-nov.mp3`,
        `https://traffic.libsyn.com/secure/http203/2021-aug-http-203-mixdown.m4a`,
        `https://traffic.libsyn.com/secure/http203/episode-20.mp3`,
        `https://traffic.libsyn.com/secure/http203/episode-29.m4a`,
        `https://traffic.libsyn.com/secure/http203/apps-sites-build-times.m4a`,
        `https://traffic.libsyn.com/secure/http203/http203-does-fish-and-scripts.m4a`
      ], {
        title: `Thievery Corporation - Track ${trackId}`,
        icons: [{
          sizes: '64x64',
          src: 'src/img/media/mirror-conspiracy64x64.jpeg',
          type: 'application/zip',
        }],
        downloadTotal: 300 * 1024 * 1024,
      });

    console.log('fetch', trackId, bgFetch);

    const progressIndicator = document.querySelector(`#track-${trackId}`);
    progressIndicator.closest('li').classList.add('active');

    bgFetch.addEventListener('progress', () => {
      if (!bgFetch.downloadTotal) return;

      const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
      console.log('progress', percent, bgFetch);
      progressIndicator.value = percent;
    });
  }

  downloadButtons.forEach(button => {
    button.addEventListener('click', async () => {
      console.log('click');
      const trackId = button.dataset.track;
      startBackgroundFetch(trackId);
    });
  });

  const clearButton = document.querySelector('#clear');

  clearButton.addEventListener('click', async () => {
    const ids = await registration.backgroundFetch.getIds();

    for(const id of ids) {
      const bgFetch = await registration.backgroundFetch.get(id);

      if(bgFetch) {
        bgFetch.abort();
      }

      const progressIndicator = document.querySelector(`#${id}`);
      progressIndicator.value = 0;
      progressIndicator.closest('li').classList.remove('active');
    }
  });
}
