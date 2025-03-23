import {
  getPlatform,
  getBrowser
} from '../lib/utils.js';

const templates = {
  'ios-chrome': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        First, check if your device has location enabled by opening Settings, then tap Privacy & Security:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-1.webp">
      </p>

      <p>
        In the Privacy & Security menu, tap Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-2.webp">
      </p>

      <p>
        In the Location Services menu, enable Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-3.webp">
      </p>

      <p>
        Stay in the Location Services menu and tap Chrome:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-chrome-settings-1.webp">
      </p>

      <p>
        In the Chrome menu, choose While Using the App:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-chrome-settings-2.webp">
      </p>
    </div>
  `,
  'ios-edge': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        First, check if your device has location enabled by opening Settings, then tap Privacy & Security:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-1.webp">
      </p>

      <p>
        In the Privacy & Security menu, tap Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-2.webp">
      </p>

      <p>
        In the Location Services menu, enable Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-3.webp">
      </p>

      <p>
        Stay in the Location Services menu and tap Edge:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-edge-settings-1.webp">
      </p>

      <p>
        In the Edge menu, choose While Using the App:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-edge-settings-2.webp">
      </p>
    </div>
  `,
  'ios-safari': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        First, check if your device has location enabled by opening Settings, then tap Privacy & Security:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-1.webp">
      </p>

      <p>
        In the Privacy & Security menu, tap Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-2.webp">
      </p>

      <p>
        In the Location Services menu, enable Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-3.webp">
      </p>

      <p>
        Stay in the Location Services menu and tap Safari Websites:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-safari-settings-1.webp">
      </p>

      <p>
        In the Safari Websites menu, choose While Using the App:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-safari-settings-2.webp">
      </p>
    </div>
  `,
  'ios-firefox': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        Check if your device has location enabled by opening Settings, then tap Privacy & Security:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-1.webp">
      </p>

      <p>
        In the Privacy & Security menu, tap Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-2.webp">
      </p>

      <p>
        In the Location Services menu, enable Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/ios-settings-3.webp">
      </p>
    </div>
  `,
  'android-chrome': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        First, check if your device has location enabled by swiping down from the top of the screen and then tap the 
        Settings icon:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-1.webp">
      </p>

      <p>
        In the Settings menu, tap Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-2.webp">
      </p>

      <p>
        Enable Location and then tap App Permissions:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-3.webp">
      </p>

      <p>
        In the App Permissions menu, tap Chrome:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/app-permissions-chrome.webp">
      </p>

      <p>
        You can now enable Location permission for Chrome:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/location-permission-chrome.webp">
      </p>
      
      <p>
        Next, open Chrome on Android and tap the Settings icon in the top-right corner:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-chrome-settings-1.webp">
      </p>
      
      <p>
        In the menu, tap Settings:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-chrome-settings-2.webp">
      </p>
      
      <p>
        In the Settings menu, tap Site settings:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-chrome-settings-3.webp">
      </p>
      
      <p>
        In the Site settings menu, tap Location:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-chrome-settings-4.webp">
      </p>
      
      <p>
        You can now enable Location:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-chrome-settings-5.webp">
      </p>
    </div>
  `,
  'android-edge': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        First, check if your device has location enabled by swiping down from the top of the screen and then tap the 
        Settings icon:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-1.webp">
      </p>

      <p>
        In the Settings menu, tap Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-2.webp">
      </p>

      <p>
        Enable Location and then tap App Permissions:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-3.webp">
      </p>

      <p>
        In the App Permissions menu, tap Edge:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/app-permissions-edge.webp">
      </p>

      <p>
        You can now enable Location permission for Edge:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/location-permission-edge.webp">
      </p>
      
      <p>
        Next, open Edge on Android and tap the Settings icon in the bottom-right corner:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-1.webp">
      </p>
      
      <p>
        In the menu, tap Settings in the top-right corner:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-2.webp">
      </p>
      
      <p>
        In the Settings menu, tap Privacy and security:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-3.webp">
      </p>
      
      <p>
        In the Privacy and security menu, tap Site settings:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-4.webp">
      </p>
      
      <p>
        In the Site settings menu, tap Location:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-5.webp">
      </p>
      
      <p>
        You can now enable Location:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-edge-settings-6.webp">
      </p>
    </div>
  `,
  'android-firefox': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        First, check if your device has location enabled by swiping down from the top of the screen and then tap the 
        Settings icon:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-1.webp">
      </p>

      <p>
        In the Settings menu, tap Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-2.webp">
      </p>

      <p>
        Enable Location and then tap App Permissions:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/android-settings-3.webp">
      </p>

      <p>
        In the App Permissions menu, tap Firefox:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/app-permissions-firefox.webp">
      </p>

      <p>
        You can now enable Location permission for Firefox:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/location-permission-firefox.webp">
      </p>
      
      <p>
        Next, open Firefox on Android and tap the Settings icon in the top-right corner:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-firefox-settings-1.webp">
      </p>
      
      <p>
        In the menu, tap Settings:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-firefox-settings-2.webp">
      </p>
      
      <p>
        In the Settings menu, tap Site permissions:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-firefox-settings-3.webp">
      </p>
      
      <p>
        In the Site permissions menu, tap Location:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-firefox-settings-4.webp">
      </p>
      
      <p>
        You can now enable Location:
      </p>
      
      <p class="img">
        <img src="../src/img/geolocation/android-firefox-settings-5.webp">
      </p>
    </div>
  `,
  'desktop-safari': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        First, check if your device has location enabled by clicking the Apple logo and going to System Settings:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/macos-settings-1.webp">
      </p>

      <p>
        In the Settings menu, click Privacy & Security and then Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/macos-settings-2.webp">
      </p>

      <p>
        Enable Location Services:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/macos-settings-3.webp">
      </p>

      <p>
        Then open Safari on MacOS and open the Safari menu in the top-left corner and click Settings:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-safari-settings-1.webp">
      </p>

      <p>
        In the settings menu, click Websites, then Location on the left and then select "Ask" in the bottom-right corner:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-safari-settings-2.webp">
      </p>
    </div>
  `,
  'desktop-chrome': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        Open Chrome and click Settings in the top-right corner:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-chrome-settings-1.webp">
      </p>

      <p>
        In the Settings menu, click Settings:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-chrome-settings-2.webp">
      </p>

      <p>
        In the Settings menu, click Privacy and security:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-chrome-settings-3.webp">
      </p>

      <p>
        In the Privacy and security menu, click Site settings:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-chrome-settings-4.webp">
      </p>

      <p>
        In the Site settings menu, click Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-chrome-settings-5.webp">
      </p>
      
      <p>
        You can now enable Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-chrome-settings-6.webp">
      </p>
    </div>
  `,
  'desktop-edge': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        Open Edge and click Settings in the top-right corner:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-edge-settings-1.webp">
      </p>

      <p>
        In the Settings menu, click Settings:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-edge-settings-2.webp">
      </p>

      <p>
        In the Settings menu, click Cookies and Site Permissions:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-edge-settings-3.webp">
      </p>

      <p>
        In the Cookies and Site Permissions menu, click Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-edge-settings-4.webp">
      </p>

      <p>
        You can now enable Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-edge-settings-5.webp">
      </p>
    </div>
  `,
  'desktop-firefox': `
    <header><h2>Geolocation permission error</h2></header>
    <div class="body">
      <p>
        It seems your device does not have permission to access your location. To enable it, take the following steps:
      </p>
      
      <p>
        Open Firefox and click Settings in the top-right corner:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-firefox-settings-1.webp">
      </p>

      <p>
        In the Settings menu, click Settings:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-firefox-settings-2.webp">
      </p>

      <p>
        In the Settings menu, click Privacy & Security:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-firefox-settings-3.webp">
      </p>

      <p>
        In the Privacy & Security menu, click the Settings button for Location:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-firefox-settings-4.webp">
      </p>

      <p>
        If checked, uncheck the box labeled "Block new requests asking for your location" in the bottom-left corner:
      </p>

      <p class="img">
        <img src="../src/img/geolocation/desktop-firefox-settings-5.webp">
      </p>
    </div>
  `,
};

export const getSheetTemplate = () => {
  let platform = getPlatform();

  if(['macos', 'windows', 'chromeos'].includes(platform)) {
    platform = 'desktop'
  }

  const key = `${platform}-${getBrowser()}`;

  return templates[key];
}
