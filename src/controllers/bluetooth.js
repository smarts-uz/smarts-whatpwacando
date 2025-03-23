export const controller = () => {
  const supported = 'bluetooth' in navigator;

  if(!supported) {
    (document.querySelector(`.no-support`) ||
      document.querySelector(`[data-view="${location.pathname}"] .no-support`)).style.display = 'block';
  }
  const scan = document.querySelector('#scan');
  scan.disabled = !supported;

  if(supported) {
    const batteryIndicator = document.querySelector('#battery-indicator');

    scan.addEventListener('click', async () => {

      const connectToDevice = async ({bleService, bleCharacteristic}) => {
        try {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{
              services: [ bleService]
            }]
          });

          device.addEventListener('gattserverdisconnected', () => {
            batteryIndicator.value = 0;
          });

          const server = await device.gatt.connect();
          const service = await server.getPrimaryService(bleService);
          const characteristic = await service.getCharacteristic(bleCharacteristic);
          await characteristic.startNotifications();

          characteristic.addEventListener('characteristicvaluechanged', e => {
            const value = e.target.value.getUint8(0);

            console.log(`${bleCharacteristic} changed`, value);

            batteryIndicator.value = value;
          });

          characteristic.readValue();

          return characteristic;
        }
        catch(err) {
          console.error(err);
        }
      };

      await connectToDevice({bleService: 'battery_service', bleCharacteristic: 'battery_level'});
    });
  }
}
