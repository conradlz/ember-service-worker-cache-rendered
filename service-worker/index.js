import {
  VERSION
} from 'ember-service-worker-cache-rendered/service-worker/config';
import cleanupCaches from 'ember-service-worker/service-worker/cleanup-caches';

const CACHE_KEY_PREFIX = 'esw-cache-rendered';
const CACHE_NAME = `${CACHE_KEY_PREFIX}-${VERSION}`;

const HTML_URL = new URL(self.location).toString();

self.addEventListener('message', (event) => {
  if (event && event.hasOwnProperty('data') && event.data.hasOwnProperty('renderedHTML'))
    return caches.open(CACHE_NAME).then((cache) => cache.put(HTML_URL, new Response( new Blob([event.data.renderedHTML], {type: "text/html"}), { "status" : 200 , "statusText" : "Rendered" } )));
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
      caches.match(HTML_URL, { cacheName: CACHE_NAME })
    );
  }
});