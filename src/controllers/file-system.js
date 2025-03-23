export const controller = () => {
  const fileSystemSupported = 'showDirectoryPicker' in window;
  const opfsSupported = 'getDirectory' in navigator.storage;
  const onlyOpfsSupported = opfsSupported && !fileSystemSupported;

  if(onlyOpfsSupported) {
    document.querySelector('.filesystem-switch').setAttribute('hidden', '');
  }

  if(!fileSystemSupported && !opfsSupported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  if(fileSystemSupported) {
    document.querySelector('#fs-support').style.display = 'block';
  }

  if(opfsSupported) {
    document.querySelector('#opfs-support').style.display = 'block';
  }


  const fileContent = document.querySelector('#file-content');
  const fileTree = document.querySelector('file-tree');
  const saveButton = document.querySelector('#save-button');
  const saveAsButton = document.querySelector('#save-as-button');
  const createFileButton = document.querySelector('#create-file-button');
  const createDirectoryButton = document.querySelector('#create-directory-button');
  const fileSystemSwitch = document.querySelector('[name="filesystem-switch"]');
  const browseButton = document.querySelector('#browse-button');

  browseButton.disabled = !fileSystemSupported && !opfsSupported;
  createFileButton.disabled = !onlyOpfsSupported;
  createDirectoryButton.disabled = !onlyOpfsSupported;


  fileTree.addEventListener('directory-opened', () => {
    createDirectoryButton.disabled = false;
    createFileButton.disabled = false;

    const textarea = fileContent.querySelector('textarea');
    if(textarea) {
      textarea.value = '';
    }
  });

  fileTree.addEventListener('directory-selected', () => {
    saveButton.disabled = true;
    saveAsButton.disabled = true;

    const textarea = fileContent.querySelector('textarea');
    if(textarea) {
      textarea.value = '';
    }
  });

  fileTree.addEventListener('file-unselected', () => {
    saveButton.disabled = true;
    saveAsButton.disabled = true;

    const textarea = fileContent.querySelector('textarea');
    if(textarea) {
      textarea.value = '';
    }
  });

  fileSystemSwitch.addEventListener('change', () => {
    const isOPFS = fileSystemSwitch.value === 'opfs';
    fileTree.opfs = isOPFS;

    createDirectoryButton.disabled = !isOPFS;
    createFileButton.disabled = !isOPFS;
  });

  saveButton.addEventListener('click', () => {
    fileTree.saveFile(fileContent.querySelector('textarea').value);
  });

  createFileButton.addEventListener('click', () => fileTree.showCreateFileDialog());
  createDirectoryButton.addEventListener('click', () => fileTree.showCreateDirectoryDialog());

  saveAsButton.addEventListener('click', () => fileTree.showSaveFileAsDialog(fileContent.querySelector('textarea').value));

  fileTree.addEventListener('file-selected', ({detail}) => {
    saveButton.disabled = true;
    saveAsButton.disabled = true;

    const {type, contents} = detail.file;
    switch(type) {
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/gif':
      case 'image/webp':
        fileContent.innerHTML = `<img src="${contents}">`;

        break;
      case 'image/svg+xml':
        fileContent.innerHTML = contents;

        break;

      default:
        fileContent.innerHTML = `<textarea>${contents}</textarea>`;
        saveButton.disabled = false;
        saveAsButton.disabled = false;
    }
  });
}
