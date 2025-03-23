export const controller = async () => {
  const supported = 'launchQueue' in window && 'files' in LaunchParams.prototype;
  const selectedImages = document.querySelector('#selected-images');

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  else {
    launchQueue.setConsumer(async (launchParams) => {
      console.log('files', launchParams.files);
      if(launchParams.files.length) {
        const fragment = document.createDocumentFragment();
        for(const fileHandle of launchParams.files) {
          const file = await fileHandle.getFile();
          const url = URL.createObjectURL(file);
          const div = document.createElement('div');
          const img = document.createElement('img');
          img.src = url;

          div.appendChild(img);
          fragment.appendChild(div);
        }

        selectedImages.appendChild(fragment);
      }
    });
  }
}


