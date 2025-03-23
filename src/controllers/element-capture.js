export const controller = async () => {
  const screenCaptureSupported = 'getDisplayMedia' in navigator.mediaDevices;
  const supported = 'RestrictionTarget' in self && 'fromElement' in RestrictionTarget;

  if(!screenCaptureSupported) {
    document.querySelector('.no-support-screencapture').style.display = 'block';
  }

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  const startCameraButton = document.querySelector('#start-camera-button');
  const stopCameraButton = document.querySelector('#stop-camera-button');
  const stopShareScreenButton = document.querySelector('#stop-share-screen-button');
  const cameraPreview = document.querySelector('#camera-preview');
  const capturePreview = document.querySelector('#capture-preview');
  const grayscaleCanvas = document.querySelector('#grayscale-canvas');
  const invertedCanvas = document.querySelector('#inverted-canvas');
  const sepiaCanvas = document.querySelector('#sepia-canvas');
  const screenshotCanvas = document.querySelector('#screenshot-canvas');
  const grayscaleCtx = grayscaleCanvas.getContext('2d');
  const invertedCtx = invertedCanvas.getContext('2d');
  const sepiaCtx = sepiaCanvas.getContext('2d');
  const screenshotCtx = screenshotCanvas.getContext('2d');

  startCameraButton.disabled = !supported;

  const invert = () => {
    invertedCtx.drawImage(cameraPreview, 0, 0);
    const imageData = invertedCtx.getImageData(0, 0, invertedCanvas.width, invertedCanvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    invertedCtx.putImageData(imageData, 0, 0);
  };

  const grayscale = () => {
    grayscaleCtx.drawImage(cameraPreview, 0, 0);
    const imageData = grayscaleCtx.getImageData(0, 0, grayscaleCanvas.width, grayscaleCanvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    grayscaleCtx.putImageData(imageData, 0, 0);
  };

  const sepia = () => {
    sepiaCtx.drawImage(cameraPreview, 0, 0);
    const imageData = sepiaCtx.getImageData(0, 0, sepiaCanvas.width, sepiaCanvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      let red = data[i], green = data[i + 1], blue = data[i + 2];

      data[i] = Math.min(Math.round(0.393 * red + 0.769 * green + 0.189 * blue), 255);
      data[i + 1] = Math.min(Math.round(0.349 * red + 0.686 * green + 0.168 * blue), 255);
      data[i + 2] = Math.min(Math.round(0.272 * red + 0.534 * green + 0.131 * blue), 255);
    }
    sepiaCtx.putImageData(imageData, 0, 0);
  }

  let cameraStream;
  let captureStream;
  let isDrawing = false;
  let animationRequest;

  const draw = () => {
    invert();
    grayscale();
    sepia();

    if(isDrawing) {
      animationRequest = requestAnimationFrame(draw);
    }
  }

  startCameraButton.addEventListener('click', async () => {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    cameraPreview.srcObject = cameraStream;

    startCameraButton.hidden = true;
    stopCameraButton.hidden = false;

    const [cameraVideoTrack] = cameraStream.getVideoTracks();
    const {width, height} = cameraVideoTrack.getSettings();

    grayscaleCanvas.width = width;
    grayscaleCanvas.height = height;
    invertedCanvas.width = width;
    invertedCanvas.height = height;
    sepiaCanvas.width = width;
    sepiaCanvas.height = height;

    isDrawing = true;
    draw();

    const restrictToTarget = async ({target}) => {
      let screenVideoTrack;

      if (capturePreview.srcObject && capturePreview.srcObject.getVideoTracks().length > 0 &&
        capturePreview.srcObject.getVideoTracks()[0].readyState === "live") {
        const restrictionTarget = await RestrictionTarget.fromElement(
          target
        );
        [screenVideoTrack] = capturePreview.srcObject.getVideoTracks();
        await screenVideoTrack.restrictTo(restrictionTarget);
      }
      else {
        captureStream = await navigator.mediaDevices.getDisplayMedia({
          preferCurrentTab: true,
        });
        [screenVideoTrack] = captureStream.getVideoTracks();
        const restrictionTarget = await RestrictionTarget.fromElement(
          target
        );

        await screenVideoTrack.restrictTo(restrictionTarget);
        capturePreview.srcObject = captureStream;
      }

      stopShareScreenButton.hidden = false;

      screenVideoTrack.addEventListener('ended', () => {
        if(cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          cameraStream = null;
        }
        captureStream = null;
        onScreenShareStop();
      })
    };

    cameraPreview.onclick = restrictToTarget;
    grayscaleCanvas.onclick = restrictToTarget;
    invertedCanvas.onclick = restrictToTarget;
    sepiaCanvas.onclick = restrictToTarget;
    capturePreview.onclick = () => {
      screenshotCanvas.width = capturePreview.offsetWidth;
      screenshotCanvas.height = capturePreview.offsetHeight;
      screenshotCtx.drawImage(capturePreview, 0, 0, capturePreview.offsetWidth, capturePreview.offsetHeight);
    };
  })

  const onScreenShareStop = () => {
    capturePreview.srcObject = null;
    cameraPreview.srcObject = null;
    stopShareScreenButton.hidden = true;
    stopCameraButton.hidden = true;
    startCameraButton.hidden = false;

    document.querySelectorAll('canvas')
    .forEach(canvas => canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height));

    if(animationRequest) {
      cancelAnimationFrame(animationRequest);
      animationRequest = null;
    }
  };

  stopShareScreenButton.addEventListener('click', () => {
    cameraStream.getTracks().forEach(track => track.stop());
    captureStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
    captureStream = null;

    onScreenShareStop();
  });

  stopCameraButton.addEventListener('click', () => {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;

    if(captureStream) {
      captureStream.getTracks().forEach(track => track.stop());
      captureStream = null;
    }

    onScreenShareStop();
  });
}
