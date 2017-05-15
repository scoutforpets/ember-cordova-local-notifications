'use strict';

/* eslint-env node */
const ecInstaller = require('ember-cordova-installer');

module.exports = {
  description: 'Installs the cordova local notifications plugin',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return ecInstaller.install('https://github.com/Telerik-Verified-Plugins/LocalNotification', this);
  }
};