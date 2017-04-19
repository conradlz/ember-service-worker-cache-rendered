import Ember from 'ember';
import config from '../../config/environment';

const { merge, set } = Ember;

export function initialize( appInstance ) {
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.active.postMessage({ "renderedHTML": document.documentElement.outerHTML });
  });
}

export default {
  name: 'config',
  initialize
};