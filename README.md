# Ember Service Worker Cache Rendered
_An Ember Service Worker plugin that caches rendered html from an ember app's server, probably fastboot._

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