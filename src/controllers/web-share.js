export const controller = () => {
  const files = [
    new File(['test'], 'test.txt', {
      type: 'text/plain'
    })
  ];
  const supported = 'share' in navigator;

  const canShareFiles = (navigator.canShare && navigator.canShare({files}));

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  if(canShareFiles) {
    document.querySelector('#can-share-files').style.display = 'block';
    document.querySelector('#file-section').style.display = 'flex';
  }
  const shareButton = document.querySelector('#share-button');
  shareButton.disabled = !supported;

  shareButton.addEventListener('click', async () => {
    const title = document.querySelector('#title').value;
    const text = document.querySelector('#text').value;
    const url = document.querySelector('#link').value;
    const fileField = document.querySelector('#file');
    const fileName = document.querySelector('#file-name');
    const files = fileField ? fileField.files : [];

    const data = {title, text, url};

    if(files.length) {
      data.files = files;
    }

    try {
      await navigator.share(data);
    }
    catch(e) {
      console.log('share error', e);
    }
  });

  if(fileField) {
    fileField.addEventListener('change', e => {
      const {files} = e.target;
      const {name} = files[0];

      if(name) {
        fileName.innerText = name;
      }
    });
  }
}
