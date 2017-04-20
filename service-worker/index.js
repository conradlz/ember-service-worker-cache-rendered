import {
  VERSION
} from 'ember-service-worker-cache-rendered/service-worker/config';
import cleanupCaches from 'ember-service-worker/service-worker/cleanup-caches';

const CACHE_KEY_PREFIX = 'esw-cache-rendered';
const CACHE_NAME = `${CACHE_KEY_PREFIX}-${VERSION}`;

self.addEventListener('message', (event) => {
  if (event && event.data) {
    event.waitUntil(caches.match(event.data, { cacheName: CACHE_NAME }).then((result) => {
      if (typeof result === 'undefined') {
        return fetch(event.data, { credentials: 'include', headers: { Accept: 'text/html'} } ).then((response) => {
            return caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.data, response));
        });
      }
    }));
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(cleanupCaches(CACHE_KEY_PREFIX, CACHE_NAME));
});

self.addEventListener('fetch', (event) => {
  let request = event.request;
  let isGETRequest = request.method === 'GET';
  let isHTMLRequest = request.headers.get('accept').indexOf('text/html') !== -1;
  let isLocal = new URL(request.url).origin === location.origin

  if (isGETRequest && isHTMLRequest && isLocal) {
    event.respondWith(
      caches.match(request.url, { cacheName: CACHE_NAME })
    );
  }
});