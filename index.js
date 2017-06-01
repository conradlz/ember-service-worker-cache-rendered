/* eslint-env node */
'use strict';

var Config = require('./lib/config');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-service-worker-cache-rendered',

  included(app) {
    this._super.included && this._super.included.apply(this, arguments);
    this.app = app;
    this.app.options = this.app.options || {};
    this.app.options['esw-cache-rendered'] = this.app.options['esw-cache-rendered'] || {};
  },

  treeForServiceWorker(swTree, appTree) {
    var options = this.app.options['esw-cache-rendered'];
    var configFile = new Config([appTree], options);

    return mergeTrees([swTree, configFile]);
  }
};