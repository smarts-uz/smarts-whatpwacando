export const controller = async () => {
  const screenCaptureSupported = 'getDisplayMedia' in navigator.mediaDevices;
  const capturedSurfaceControlSupported = 'CaptureController' in window;
  const supported = 'getCaptureHandle' in MediaStreamTrack.prototype && 'setCaptureHandleConfig' in navigator.mediaDevices;

  if(!screenCaptureSupported) {
    document.querySelector('.no-support-screencapture').style.display = 'block';
  }

  if(!capturedSurfaceControlSupported) {
    document.querySelector('.no-support-surface-control').style.display = 'block';
  }

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  const openPageButton = document.querySelector('#open-page-button');
  const shareScreenButton = document.querySelector('#share-screen-button');
  const stopShareScreenButton = document.querySelector('#stop-share-screen-button');
  const previousButton = document.querySelector('#previous-button');
  const enableScrollingButton = document.querySelector('#enable-scrolling-button');
  const zoomInButton = document.querySelector('#zoom-in-button');
  const zoomOutButton = document.querySelector('#zoom-out-button');
  const nextButton = document.querySelector('#next-button');
  const preview = document.querySelector('#preview');

  openPageButton.disabled = !supported;
  shareScreenButton.disabled = !screenCaptureSupported;

  let capturedPage;
  openPageButton.addEventListener('click', () => {
    capturedPage = window.open('image-gallery', '_blank');

    capturedPage.addEventListener('load', () => {
      shareScreenButton.disabled = false;
      openPageButton.disabled = true;
    });
  });

  let stream;
  let captureController;

  shareScreenButton.addEventListener('click', async () => {

    if ('CaptureController' in window && 'setFocusBehavior' in CaptureController.prototype) {
      captureController = new CaptureController();
      captureController.setFocusBehavior('no-focus-change');
    }

    stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'browser', // sharing entire screen is preselected
      },
      audio: true,
      surfaceSwitching: 'exclude', // option to switch tabs while sharing
      selfBrowserSurface: 'exclude', // exclude tab of screen recorder
      preferCurrentTab: false, // "true" will only offer the current tab for capturing
      systemAudio: 'include', // capture audio, default is 'include'
      monitorTypeSurfaces: "exclude", // offer option to share entire screen, default is 'include'
      ...(captureController && {controller: captureController})
    });

    preview.srcObject = stream;
    shareScreenButton.hidden = true;
    stopShareScreenButton.hidden = false;

    const [videoTrack] = stream.getVideoTracks();
    let captureHandle = 'getCaptureHandle' in videoTrack ? videoTrack.getCaptureHandle() : null ;
    if (captureHandle) {
      enableScrollingButton.disabled = false;
      previousButton.disabled = false;
      nextButton.disabled = false;
      zoomInButton.disabled = false;
      zoomOutButton.disabled = false;
    }

    function translateCoordinates(offsetX, offsetY) {
      const previewDimensions = preview.getBoundingClientRect();
      const trackSettings = preview.srcObject.getVideoTracks()[0].getSettings();
      const x = (trackSettings.width * offsetX) / previewDimensions.width;
      const y = (trackSettings.height * offsetY) / previewDimensions.height;

      return [Math.floor(x), Math.floor(y)];
    }

    enableScrollingButton.onclick = (e) => {
      captureController.sendWheel({});
    }

    const zoomLevels = capturedSurfaceControlSupported ? CaptureController.getSupportedZoomLevels() : [];

    zoomInButton.addEventListener('click', async () => {
      const index = zoomLevels.indexOf(captureController.getZoomLevel());
      const newZoomLevel = zoomLevels[Math.min(index + 1, zoomLevels.length - 1)];

      try {
        await captureController.setZoomLevel(newZoomLevel);
      }
      catch(err) {
        console.log('zoom in error', err);
      }
    });

    zoomOutButton.addEventListener('click', async () => {
      const index = zoomLevels.indexOf(captureController.getZoomLevel());
      const newZoomLevel = zoomLevels[Math.max(index - 1, 0)];

      try {
        await captureController.setZoomLevel(newZoomLevel);
      }
      catch(err) {
        console.log('zoom out error', err);
      }
    });

    preview.onmouseenter = () => document.body.style.overflow = 'hidden';
    preview.onmouseleave = () => document.body.style.overflow = '';

    preview.onwheel = async (e) => {
      const {offsetX, offsetY, deltaX, deltaY} = e;
      const [x, y] = translateCoordinates(offsetX, offsetY);
      const [wheelDeltaX, wheelDeltaY] = [-deltaX, -deltaY];

      try {
        await captureController.sendWheel({ x, y, wheelDeltaX, wheelDeltaY });
      }
      catch (error) {
        console.log(error);
      }
    };

    videoTrack.addEventListener('capturehandlechange', (e) => {
      console.log('capturehandlechange');
      captureHandle = e.target.getCaptureHandle();
    });

    videoTrack.addEventListener('ended', onScreenShareStop);

    const broadcastChannel = new BroadcastChannel("capture-handle");

    previousButton.addEventListener('click', () => {
      broadcastChannel.postMessage({
        handle: captureHandle.handle,
        command: 'previous',
      });
    });

    nextButton.addEventListener('click', () => {
      broadcastChannel.postMessage({
        handle: captureHandle.handle,
        command: 'next',
      });
    });
  });

  const onScreenShareStop = () => {
    preview.srcObject = null;
    preview.onwheel = null;

    if(capturedPage) {
      capturedPage.close();
    }

    openPageButton.disabled = false;
    shareScreenButton.disabled = true;
    shareScreenButton.hidden = false;
    stopShareScreenButton.hidden = true;
    previousButton.disabled = true;
    nextButton.disabled = true;
    enableScrollingButton.disabled = true;
    zoomInButton.disabled = true;
    zoomOutButton.disabled = true;
  };

  stopShareScreenButton.addEventListener('click', () => {
    stream.getTracks().forEach(track => track.stop());

    onScreenShareStop();
  });
}
