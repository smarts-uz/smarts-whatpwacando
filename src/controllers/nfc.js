export const controller = () => {
  const supported = 'NDEFReader' in window;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  const scanButton = document.querySelector('#scan');
  const stopScanButton = document.querySelector('#stop-scan');
  const writeButton = document.querySelector('#write');
  const name = document.querySelector('#name');
  const age = document.querySelector('#age');
  const city = document.querySelector('#city');

  scanButton.disabled = !supported;
  stopScanButton.disabled = !supported;
  writeButton.disabled = !supported;

  const nfcDialog = document.querySelector('#nfc-dialog');
  const closeButton = document.querySelector('#close-dialog');

  let scanning = false;

  closeButton.addEventListener('click', () => {
    nfcDialog.close();
  });

  stopScanButton.disabled = true;

  const capitalize = string => `${string.substr(0, 1).toUpperCase()}${string.substr(1)}`;

  const showTagData = data => {
    nfcDialog.body = [...Object.entries(data)].reduce((html, [key, value]) => `${html}<p>${capitalize(key)}: ${value}</p>`, ``);

    nfcDialog.open();
  };

  const readTag = ({message}) => {
    const {records} = message;

    return records.map(record => {
      const {id, recordType, mediaType, encoding, data} = record;

      const decoder = encoding ? new TextDecoder(encoding) : new TextDecoder();

      switch(recordType) {
        case 'url':
        case 'text':
          console.log('data', decoder.decode(data));
          break;

        case 'mime':
          showTagData(JSON.parse(decoder.decode(data)));

          break;
      }

      return ['url', 'text'].includes(recordType) ? decoder.decode(data) : JSON.parse(decoder.decode(data));
    });
  };

  let abortController;

  const scanTag = () => {
    scanButton.disabled = true;
    stopScanButton.disabled = false;

    return new Promise((resolve, reject) => {
      try {
        const reader = new NDEFReader();
        abortController = new AbortController();

        reader.scan({signal: abortController.signal});
        scanning = true;

        reader.addEventListener('reading', e => resolve(readTag(e)));

        reader.addEventListener('readingerror', e => {
          console.log('error reading tag', e);
          reject(e);
        });
      }
      catch(e) {
        console.log('error scanning tag:', e);

        scanButton.disabled = false;
        stopScanButton.disabled = true;
        scanning = false;

        reject(e);
      }
    });
  };

  const stopScan = () => {
    abortController.abort();

    scanButton.disabled = false;
    stopScanButton.disabled = true;
    scanning = false;
  };

  const writeTag = async () => {
    writeButton.disabled = true;

    if(scanning) {
      stopScan();
    }
    const encoder = new TextEncoder();

    const data = {
      name: name.value,
      age: age.value,
      city: city.value
    };

    const records = [];

    records.push({
      recordType: 'mime',
      mediaType: 'application/json',
      data: encoder.encode(JSON.stringify(data))
    });

    const reader = new NDEFReader();
    abortController = new AbortController();

    reader.scan({signal: abortController.signal});

    try {
      await reader.write({records}, {
        overwrite: true
      });

      setTimeout(() => abortController.abort(), 3000);
    }
    catch(e) {
      console.log('error writing tag', e);
    }
    finally {
      writeButton.disabled = false;
    }
  };

  scanButton.addEventListener('click', scanTag);
  stopScanButton.addEventListener('click', stopScan);
  writeButton.addEventListener('click', writeTag);
}
