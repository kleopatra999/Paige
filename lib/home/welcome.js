var Warnings = require('../components/warnings'),
    Nav = require('../components/nav'),
    Page = require('../page.js'),
    expect = require('chai').expect,

Welcome = Page.extend({
  selectors: {
    facebookSyncButton: '.signup-button-facebook',
    facebookSynced: '.signup-button-facebook.signup-button-synced'
  },

  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/welcome/home';
  },

  verifyFacebookSynced: function() {
    this.whenDisplayed(this.selectors.facebookSynced).then(function() {
      this.find(this.selectors.facebookSynced)
      .isDisplayed()
      .then(function(displayed) {
        expect(displayed).to.be.true;
      });
    }.bind(this));

    return this;
  }
}).with(Warnings, Nav);

module.exports = Welcome;
