const workerBlob = new Blob([
  //language=JavaScript
  `
  self.addEventListener('message', async ({data}) => {
    const {path, contents} = data;
    const root = await navigator.storage.getDirectory();
    const fileName = path.pop();
    
    let nestedDir = root;
    
    for(const dirPath of path) {
      nestedDir = await nestedDir.getDirectoryHandle(dirPath);
    }
    
    const file = await nestedDir.getFileHandle(fileName);
    const accessHandle = await file.createSyncAccessHandle();
    const encoder = new TextEncoder();
    const writeBuffer = encoder.encode(contents);
    const writeSize = accessHandle.write(writeBuffer, { "at" : 0 });
    
    accessHandle.truncate(writeSize);
    // Persist changes to disk.
    accessHandle.flush();
    // Always close FileSystemSyncAccessHandle if done.
    accessHandle.close();
  
    postMessage({result: true, size: writeSize});
  });
  `
]);

export const worker = URL.createObjectURL(workerBlob);
