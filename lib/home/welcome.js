var Welcome,
    assert = require('assert'),
    Warnings = require('../components/warnings'),
    Page = require('../page.js');

Welcome = Page.extend({
  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/welcome/home';
  }
}).with(Warnings);

module.exports = Welcome;