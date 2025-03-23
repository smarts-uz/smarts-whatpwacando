import '_40dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '_40dannymoerkerke/material-webcomponents/src/material-button.js';
import '_40dannymoerkerke/material-webcomponents/src/material-progress.js';
import 'elements/code-snippet.js';

export const template = `
<div class="view next-screen" id="bluetooth-demo">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons" translate="no">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons" translate="no">wifi_off</i>
    </a>
  </material-app-bar>
  
  <div class="content">
    <h2>Web Bluetooth API</h2>
    
    <p class="no-support">This feature is not (yet) supported on your device</p>
    
    <p>
      The Web Bluetooth API enables apps to connect to Bluetooth Low Energy (BLE) devices and read values from or write 
      values to it.
    </p>
    
    <p>
      To test, connect to a BLE device that advertises the "battery_service" service.
    </p>
       
    <p>The easiest way is to download the 
      <a href="../https@play.google.com/store/apps/details@id=io.github.webbluetoothcg.bletestperipheral" target="_blank"
      rel="noopener">BLE Peripheral Simulator</a> app on another Android device and start the Battery service. Then change 
      the battery level and tap the "Notify" button. This app will then show the current battery level of the BLE device.
    </p>
    
    <p>
      Tap "Scan" below to start scanning for BLE devices.
    </p>
  
    <material-button id="scan" label="Scan" raised></material-button>
    
    <h4>Battery level:</span></h4>
    <p>
        <material-progress value="0" max="100" id="battery-indicator"></material-progress>
    </p>
    
    <code-snippet lang="js">
if('bluetooth' in navigator) {
  const scan = document.querySelector('#scan');
  const batteryIndicator = document.querySelector('#battery-indicator');

  scan.addEventListener('click', async () => {

    const connectToDevice = async ({bleService, bleCharacteristic}) => {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{
            services: [bleService]
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

          console.log(\`$\{bleCharacteristic\} changed\`, value);

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
    </code-snippet>

    <section class="documentation">
      <h3>Documentation</h3>
      <a href="../https@developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web" target="_blank" rel="noopener">
        Interact with Bluetooth devices on the Web on developers.google.com
      </a>
      
      <h3>Browser support</h3>
      <p>
        <a href="../https@caniuse.com/#feat=web-bluetooth" target="_blank" rel="noopener">
            Web Bluetooth API on caniuse.com
        </a>
      </p>
    </section>
  </div>
</div>
`;
