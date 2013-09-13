var expect = require('chai').expect,
    Page = require('../page'),

Index = Page.extend({
  pageRoot: '/home/dashboard',

  selectors: {
    activeNav: '.nav-link-2.active[href="/home/dashboard"]',
  },

  isSelectedInNav: function(userInfo) {
    this.whenDisplayed(this.selectors.activeNav).then(function() {
      this.find(this.selectors.activeNav).sendKeys('');
    }.bind(this));
    return this;
  }

});

module.exports = Index;
