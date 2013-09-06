var Index,
    assert = require('assert'),
    Page = require('../page');

Index = Page.extend({
  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/profile';
  }
});

module.exports = Index;