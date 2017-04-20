# Ember Service Worker Cache Rendered
_An Ember Service Worker plugin that caches rendered html from an ember app's server, probably fastboot._

This plugin works by performing a fetch for the current request to the ember server and caches the response, if it wasn't already cached. It should work for any path, which is nice if you want to cache server rendered contents with the service worker.

## F#$& my assets aren't updating in development mode

Turn on the "Update on reload" setting in the `Application > Service Workers`
menu in the Chrome devtools.

## Installation

```
ember install ember-service-worker-cache-rendered
```

## Configuration

The configuration is done in the `ember-cli-build.js` file:

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'esw-cache-rendered': {
      // changing this version number will bust the cache
      version: '1'
    }
  });

  return app.toTree();
};
```


## Legal

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)