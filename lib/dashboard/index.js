var Index,
    expect = require('chai').expect,
    Page = require('../page');

Index = Page.extend({
  selectors: {
    activeNav: '.nav-link-2.active[href="/home/dashboard"]',
  },

  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/home/dashboard';
  },
  
  isSelectedInNav: function(userInfo) {
    this.whenDisplayed(this.selectors.activeNav).then(function() {
      this.find(this.selectors.activeNav).sendKeys('');
    }.bind(this));
    return this;
  }
  
});

module.exports = Index;
