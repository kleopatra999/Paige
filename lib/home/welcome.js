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
    this.exists(this.selectors.facebookSyncButton).then(function(button_exists) {
      expect(button_exists).to.be.true;

      this.exists(this.selectors.facebookSynced)
      .then(function(sync_exists) {
        expect(sync_exists).to.be.true;

        this.find(this.selectors.facebookSynced)
        .isDispalyed()
        .then(function(displayed) {
          expect(displayed).to.be.true;
        });
      }.bind(this));
    }.bind(this));

    return this;
  }
}).with(Warnings, Nav);

module.exports = Welcome;
