import {
  getPlatform,
  getBrowser
} from 'lib/utils.js';

const templates = {
  'ios-safari': `
    <div class="body">
      <p>
        To install the app from Safari on iOS:
      </p>
      <ul>
        <li>
          <img src="src/img/install/ios-share.svg">
          1. Tap Share
        </li>
        <li>
          <img src="src/img/install/add-to-home-screen.svg">
          2. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
  'ios-chrome': `
    <div class="body">
      <p>
        To install the app from Chrome on iOS:
      </p>
      <ul>
        <li>
          <img src="src/img/install/ios-share.svg">
          1. Tap Share in the address bar
        </li>
        <li>
          <img src="src/img/install/add-to-home-screen.svg">
          2. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
  'ios-edge': `
    <div class="body">
      <p>
        To install the app from Edge on iOS:
      </p>
      <ul>
        <li>
          <img src="src/img/install/menu.svg">
          1. Tap menu in the bottom-right corner
        </li>
        <li>
          <img src="src/img/install/ios-share.svg">
          2. Swipe up and tap Share
        </li>
        <li>
          <img src="src/img/install/add-to-home-screen.svg">
          3. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
  'ios-firefox': `
    <div class="body">
      <p>
        To install the app from Firefox on iOS:
      </p>
      <ul>
        <li>
          <img src="src/img/install/menu.svg">
          1. Tap menu in the bottom-right corner
        </li>
        <li>
          <img src="src/img/install/ios-share.svg">
          2. Swipe up and tap Share
        </li>
        <li>
          <img src="src/img/install/add-to-home-screen.svg">
          3. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
  'android-edge': `
    <div class="body">
      <p>
        To install the app from Edge on Android:
      </p>
      <ul>
        <li>
          <img src="src/img/install/menu.svg">
          1. Tap menu in the bottom-right corner
        </li>
        <li>
          <img src="src/img/install/add-to-phone.svg">
          2. Swipe left and tap Add to Phone
        </li>
      </ul>
    </div>
  `,
  'android-firefox': `
    <div class="body">
      <p>
        To install the app from Firefox on Android:
      </p>
      <ul>
        <li>
          <img src="src/img/install/menu-vert.svg">
          1. Tap menu in the top-right corner
        </li>
        <li>
          <img src="src/img/install/install-phone.svg">
          2. Swipe up and tap Install
        </li>
      </ul>
    </div>
  `,
  'macos-safari': `
    <div class="body">
      <p>
        To install the app from Safari on MacOS:
      </p>
      <ul>
        <li>
          <img src="src/img/install/ios-share.svg">
          1. Click Share
        </li>
        <li>
          <img src="src/img/install/add-to-dock.svg">
          2. Click Add to Dock
        </li>
      </ul>
    </div>
  `,
  'macos-firefox': `
    <div class="body">
      <p>
        Currently, PWAs cannot be installed in Firefox. Please choose another browser like Safari, Chrome or Edge.
      </p>
    </div>
  `,
  'windows-firefox': `
    <div class="body">
      <p>
        Currently, PWAs cannot be installed in Firefox. Please choose another browser like Chrome or Edge.
      </p>
    </div>
  `,
  'linux-firefox': `
    <div class="body">
      <p>
        Currently, PWAs cannot be installed in Firefox. Please choose another browser like Chrome or Edge.
      </p>
    </div>
  `
};

export const getSheetTemplate = () => {
  const key = `${getPlatform()}-${getBrowser()}`;

  return templates[key];
}
