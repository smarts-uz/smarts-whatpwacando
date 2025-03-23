import '_40dannymoerkerke/material-webcomponents/src/material-loader.js';

export class FileTree extends HTMLElement {

  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});

    shadowRoot.innerHTML = `
      <style>
        :host {
          --font-color: #000000;
          --hover-color: #efefef;
          --selected-color: #cccccc;
          --width: 300px;
          --font-size: .8em;
          display: flex;
          width: var(--width);
          max-width: var(--width);
          font-size: var(--font-size);
          overflow-y: scroll;
        }
        
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        
        #container {
          display: flex;
          flex-direction: column;
          width: 90%;
        }
        
        #file-container {
          margin-top: 10px;
          overflow: scroll;
        }
        
        material-loader {
          margin-top: 20px;
          display: none;
        }
        
        :host([loading]) material-loader {
          display: block;
        }
        
        #filelist {
          list-style-type: none;
          padding: 5px;
        }
  
        #filelist ul {
          display: none;
          list-style-type: none;
          padding: 5px 0 5px 15px;
        }
  
        #filelist li {
          cursor: pointer;
          display: flex;
          padding: 6px;
          color: var(--font-color);
        }
  
        #filelist li:hover {
          background-color: var(--hover-color);
        }
  
        #filelist li.selected {
          background-color: var(--selected-color);
        }
  
        #filelist li[data-dir] strong {
          display: block;
          padding: 6px;
          white-space: nowrap;
        }
        #filelist li[data-dir] .arrow {
          transform: rotate(0deg);
        }
        
        #filelist ul > li[data-file] {
          margin-left: 40px;
        }
        
        #filelist ul ~ li[data-file] {
          margin-left: 25px;
        }
        
        #filelist li.open + ul {
          display: block;
        }
  
        #filelist li[data-dir].open .arrow {
          transform: rotate(90deg);
          transform-origin: center center;
          transition: transform 0.3s ease-out;
        }
      </style>
      
      <div id="container">
        <slot name="browse"></slot>
        <div id="file-container">
          <material-loader size="32"></material-loader>
          <ul id="filelist"></ul>       
        </div>
      </div>
      
      <dialog id="create-directory-dialog">
        <h2>New directory</h2>
        
        <form method="dialog">
          <label>
            <input type="text" id="directory-name">
          </label>
          <button type="submit" value="cancel">Cancel</button>
          <button type="submit" value="create">Create</button>
        </form>
      </dialog>
      
      <dialog id="create-file-dialog">
        <h2>New file</h2>
        
        <form method="dialog">
          <label>
            <input type="text" id="file-name">
          </label>
          <button type="submit" value="cancel">Cancel</button>
          <button type="submit" value="create">Create</button>
        </form>
      </dialog>
    `;

    this.selectedFileElement = null;
  }

  connectedCallback() {
    let selectedFileElement;
    this.opfs = true;
    this.fileList = this.shadowRoot.querySelector('#filelist');

    const browseButton = this.shadowRoot.querySelector('slot[name="browse"]').assignedNodes()[0];

    this.fileList.addEventListener('click', async e => {
      const file = [...e.composedPath()].find(el => el.tagName && el.tagName.toLowerCase() === 'li' && el.dataset.file);
      const dir = [...e.composedPath()].find(el => el.tagName && el.tagName.toLowerCase() === 'li' && el.dataset.dir);

      if(file) {
        const filePath = file.dataset.file;
        const [fileObj] = this.findFile(filePath, this.currentDirectory);

        if(fileObj) {
          await this.openFile(fileObj);

          if(selectedFileElement) {
            selectedFileElement.classList.toggle('selected');
          }
          selectedFileElement = file;
          selectedFileElement.classList.toggle('selected');
        }
      }
      if(dir) {
        dir.classList.toggle('open');
        const dirPath = dir.dataset.dir;
        const [dirObj] = this.findFile(dirPath, this.currentDirectory);
        this.currentDirectoryHandle = dirObj.handle;
        const entriesList = dir.nextElementSibling;

        if(Object.entries(dirObj.entries).length === 0) {
          await this.iterateFiles(dirObj.handle, dirObj.entries);

          this.listFiles(dirObj.entries, entriesList);
        }

        if(!dir.classList.contains('open')) {
          entriesList.querySelectorAll('.dir').forEach(entry => entry.classList.remove('open'));
        }
      }
    });

    browseButton.addEventListener('click', () => this.browseDirectory());
  }

  async selectFile(file) {
    const filePath = file.dataset.file;
    const [fileObj] = this.findFile(filePath, this.currentDirectory);

    if(fileObj) {
      await this.openFile(fileObj);

      if(this.selectedFileElement) {
        this.selectedFileElement.classList.toggle('selected');
      }
      this.selectedFileElement = file;
      this.selectedFileElement.classList.toggle('selected');
    }
  }

  findFile(fileName, directory) {
    return [...Object.entries(directory)]
    .flatMap(([path, handle]) => fileName === path ? {path, ...handle} : this.findFile(fileName, handle));
  }

  async openFile({handle}) {
    const file = await this.getFileFromHandle(handle);
    this.currentFileHandle = handle;

    this.dispatchEvent(new CustomEvent('file-selected', {
      composed: true,
      bubbles: true,
      detail: {file}
    }));
  }

  async saveFile(contents, handle = this.currentFileHandle) {
    const writable = await handle.createWritable();

    await writable.write({type: 'write', data: contents});
    await writable.close();
  }

  async saveFileAs(contents) {
    const handle = await window.showSaveFilePicker();

    return this.saveFile(contents, handle);
  }

  async getFileFromHandle(handle) {
    const file = await handle.getFile();
    const name = file.name;
    const contents = await this.getFileContents(file);
    const {type} = file; //this.getFileType(file);

    return {name, contents, type};
  }

  async getFileContents(file) {
    switch(file.type) {
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/gif':
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.addEventListener('loadend', () => resolve(reader.result));
          reader.readAsDataURL(file);
        });

      default:
        return file.text();
    }
  }

  async createDirectory() {
    const dialog = this.shadowRoot.querySelector('#create-directory-dialog');
    dialog.showModal();

    dialog.addEventListener('close', async () => {
      if(dialog.returnValue === 'create') {
        const name = dialog.querySelector('#directory-name').value;
        await this.currentDirectoryHandle.getDirectoryHandle(name, {create: true});
      }
    });
  }

  async createFile() {
    const dialog = this.shadowRoot.querySelector('#create-file-dialog');
    dialog.showModal();

    dialog.addEventListener('close', async () => {
      if(dialog.returnValue === 'create') {
        const name = dialog.querySelector('#file-name').value;
        await this.currentDirectoryHandle.getFileHandle(name, {create: true});
      }
    });
  }

  async browseDirectory() {
    this.currentDirectoryHandle = await (this.opfs ? navigator.storage.getDirectory() : window.showDirectoryPicker());

    this.fileList.innerHTML = '';
    this.loading = true;
    this.currentDirectory = await this.iterateFiles(this.currentDirectoryHandle);

    this.loading = false;

    this.listFiles(this.currentDirectory, this.fileList);
  }

  async iterateFiles(directoryHandle, dir = {}) {
    for await (const [name, handle] of directoryHandle.entries()) {
      console.log(name, handle);
      const path = `${directoryHandle.name}/${name}`;

      if(handle.kind === 'file') {
        dir[path] = {handle};
      }
      else {
        dir[name] = {
          handle,
          entries: {}
        };
      }
    }

    return dir;
  }

  listFiles(directory, fileList) {
    Object.entries(directory)
    .sort()
    .sort(([_, a], [__, b]) => a.handle.kind === 'file' && b.handle.kind !== 'file' ? 1 : b.handle.kind === 'file' && a.handle.kind !== 'file' ? -1 : 0)
    .forEach(([path, entry]) => {
      if(entry.handle.kind === 'file') {
        const name = path.split('/').pop();
        fileList.insertAdjacentHTML('beforeend', `<li data-file="${path}">${name}</li>`);
      }
      else {
        fileList.insertAdjacentHTML('beforeend', `<li class="dir" data-dir="${path}">
          <i class="material-icons arrow">keyboard_arrow_right</i>
          <i class="material-icons">folder</i>
          <strong>${path}</strong>
        </li>`);

        const list = fileList.insertAdjacentElement('beforeend', document.createElement('ul'));
        this.listFiles(entry.entries, list);
      }
    });
  }

  set loading(isLoading) {
    isLoading ? this.setAttribute('loading', '') : this.removeAttribute('loading');
  }

  get loading() {
    return this.hasAttribute('loading');
  }
}

customElements.define('file-tree', FileTree);
