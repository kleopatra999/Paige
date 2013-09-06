var Find,
    assert = require('assert'),
    Page = require('../page');

Find = Page.extend({
  selectors: {
    firstCreative: '#users-content li:first-child .form-button-follow',
    continue: '#submit-button.form-button-light-and-blue'
  },

  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/signup/find';
  },

  followFirstCreative: function() {
    this.whenDisplayed(this.selectors.firstCreative).then(function() {
      this.find(this.selectors.firstCreative).click();
    }.bind(this));

    return this;
  },

  finishFollowing: function() {
    this.whenDisplayed(this.selectors.continue).then(function() {
      this.find(this.selectors.continue).click();
    }.bind(this));

    return this;
  }
});

module.exports = Find;