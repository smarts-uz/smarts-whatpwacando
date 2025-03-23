export const controller = () => {
  const supported = 'bluetooth' in navigator;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  const scan = document.querySelector('#scan');
  scan.disabled = !supported;

  if(supported) {
    const bgmSerialNumberInput = document.querySelector('#bgm-serial-number');

    scan.addEventListener('click', async () => {
      const bgmSerialNumber = bgmSerialNumberInput.value;
      const primaryServiceUUID = BluetoothUUID.canonicalUUID('0xfee0');
      const pclModeCharacteristicUUID = BluetoothUUID.canonicalUUID('0xfee1');
      const notifyCharacteristicUUID = BluetoothUUID.canonicalUUID('0xfee2');

      const connectToDevice = async () => {
        try {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{
              name: bgmSerialNumber
            }]
          });

          console.log('Connected device', device);

          const server = await device.gatt.connect();
          const service = await server.getPrimaryService(primaryServiceUUID);
          const notifyCharacteristic = await service.getCharacteristic(notifyCharacteristicUUID);
          const pclModeCharacteristic = await service.getCharacteristic(pclModeCharacteristicUUID);

          // open PCL mode
          await pclModeCharacteristic.writeValueWithoutResponse(Uint8Array.of(0));

          notifyCharacteristic.addEventListener('characteristicvaluechanged', e => {
            const value = e.target.value.getUint8(0);

            console.log(`Notify characteristic changed`, value);
          });

          await notifyCharacteristic.startNotifications();
          notifyCharacteristic.readValue();

          return notifyCharacteristic;
        }
        catch(err) {
          console.error(err);
        }
      };

      await connectToDevice();
    });
  }
}
