import {
  getPlatform,
  getBrowser
} from '../lib/utils.js';

const templates = {
  'android-chrome': `
    <header><h2 slot="header">Chrome on Android</h2></header>
    <div class="body">
      <p>
        Open Chrome on Android and open the main menu by tapping the icon in the top-right
        corner:
      </p>

      <p class="img">
        <img src="../src/img/sensors/sensors-chrome-step1.webp">
      </p>

      <p>
        In the menu that opens, tap Settings:
      </p>

      <p class="img">
        <img src="../src/img/sensors/sensors-chrome-step2.webp">
      </p>

      <p>
        In the Settings, tap Site settings:
      </p>

      <p class="img">
        <img src="../src/img/sensors/sensors-chrome-step3.webp">
      </p>

      <p>
        In the Site settings menu, tap Motion sensors:
      </p>

      <p class="img">
        <img src="../src/img/sensors/sensors-chrome-step4.webp">
      </p>

      <p>
        You can now enable Motion sensors:
      </p>

      <p class="img">
        <img src="../src/img/sensors/sensors-chrome-step5.webp">
      </p>
    </div>
  `,
  'android-edge': `
    <header><h2 slot="header">Edge on Android</h2></header>
    <div class="body">
      <p>
        Open Edge on Android and open the main menu by tapping the icon in the bottom-right
        corner:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-1.webp">
      </p>

      <p>
        Tap Settings in the top-right corner:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-2.webp">
      </p>

      <p>
        In the Settings, tap Privacy & Security:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-3.webp">
      </p>

      <p>
        In the Privacy & Security menu, tap Site settings:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-4.webp">
      </p>
      
      <p>
        In the Site settings menu, tap Motion sensors:
      </p>

      <p class="img">
        <img src="../src/img/sensors/edge-settings-motion-sensor-1.webp">
      </p>

      <p>
        You can now enable Motion sensors:
      </p>

      <p class="img">
        <img src="../src/img/sensors/edge-settings-motion-sensor-2.webp">
      </p>
    </div>
  `
};

export const getSheetTemplate = () => {
  const key = `${getPlatform()}-${getBrowser()}`;

  return templates[key];
}
