export const controller = async () => {
  const config = {
    handle: crypto.randomUUID(),
    exposeOrigin: true,
    permittedOrigins: ['*'],
  };
  navigator.mediaDevices.setCaptureHandleConfig(config);

  const gallery = document.querySelector('image-gallery');
  const broadcastChannel = new BroadcastChannel("capture-handle");

  broadcastChannel.addEventListener('message', ({data}) => {
    const {handle, command} = data;

    if(handle === config.handle) {
      switch(command) {
        case 'previous':
          gallery.previous();
          break;
        case 'next':
          gallery.next();
          break;
      }
    }
  });
}
