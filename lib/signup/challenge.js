var Challenge,
    expect = require('chai').expect,
    Page = require('../page');

Challenge = Page.extend({
  pageRoot: '/signup',

  selectors: {
    yes: '#button-yes',
    no: '#button-no'
  },

  selectMember: function() {
    this.whenDisplayed(this.selectors.yes).then(function() {
      this.find(this.selectors.yes).click();
    }.bind(this));

    return this;
  },

  selectNotMember: function() {
    this.whenDisplayed(this.selectors.no).then(function() {
      this.find(this.selectors.no).click();
    }.bind(this));

    return this;
  }

});

module.exports = Challenge;
