var Welcome,
    assert = require('assert'),
    Warnings = require('../components/warnings'),
    Nav = require('../components/nav'),
    Page = require('../page.js');

Welcome = Page.extend({
  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/welcome/home';
  }
}).with(Warnings,Nav);

module.exports = Welcome;
