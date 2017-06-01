import Ember from 'ember';
import config from '../../config/environment';

export function initialize( appInstance ) {
  if (typeof FastBoot === 'undefined' && navigator.serviceWorker && navigator.serviceWorker.ready) {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.active.postMessage([location.protocol, '//', location.host, location.pathname].join(''));
    });
  }
}

export default {
  name: 'cache-rendered',
  initialize
};