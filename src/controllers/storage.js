import {formatBytes} from 'lib/utils.js';

export const controller = async () => {
  const supported = 'storage' in navigator;
  const persistentStorageSupported = navigator.storage && navigator.storage.persist;
  const hasPersistentStorage = persistentStorageSupported && await navigator.storage.persisted();
  const storageStats = supported ? await navigator.storage.estimate() : null;
  const statsTable = document.querySelector('#storage-stats');
  const hasPersistentStorageDiv = document.querySelector('#has-persistent-storage');
  const noPersistentStorageDiv = document.querySelector('#no-persistent-storage');
  const requestPersistentStorageButton = document.querySelector('#request-persistent-storage-button');
  const quotaTD = document.querySelector('#quota');
  const usageTD = document.querySelector('#usage');

  if(!hasPersistentStorage) {
    hasPersistentStorageDiv.setAttribute('hidden', '');
  }

  if(hasPersistentStorage) {
    requestPersistentStorageButton.setAttribute('hidden', '');
  }


  if(!storageStats) {
    statsTable.style.display = 'none';
  }

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }

  const {quota, usage, usageDetails = []} = storageStats;
  quotaTD.textContent = formatBytes(quota);
  usageTD.textContent = formatBytes(usage);

  if(usageDetails.length) {
    const detailsHTML = Object.entries(usageDetails)
    .map(([key, value]) => `
            <tr>
              <td>${key}</td><td>${formatBytes(value)}</td>
            </tr>`
    ).join('');

    statsTable.querySelector('tbody').insertAdjacentHTML('beforeend', detailsHTML);
  }


  requestPersistentStorageButton.addEventListener('click', async () => {
    const persist = await navigator.storage.persist();

    console.log(persist);
    requestPersistentStorageButton.hidden = persist;
    hasPersistentStorageDiv.hidden = !persist;
    noPersistentStorageDiv.hidden = persist;
  });
}
