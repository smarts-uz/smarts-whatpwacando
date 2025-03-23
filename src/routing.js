import {router} from 'lib/router.js';
import {handleOffline, handleOnline} from 'app.js';
import '_40dannymoerkerke/material-webcomponents/src/material-dialog.js';
import {routes} from 'routes.js';
const sensorSheet = document.querySelector('#sensor-dialog');

document.querySelector('#close-sensor-dialog').addEventListener('click', () => {
  sensorSheet.close();
});

const outlet = document.querySelector('#main-content');
const nav = null;

const onAfterRender = () => {
  if('onLine' in navigator) {
    if(navigator.onLine) {
      handleOnline();
    }
    else {
      handleOffline();
    }
  }
};

router({outlet, nav, routes, onAfterRender});

