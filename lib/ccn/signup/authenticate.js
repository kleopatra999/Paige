var Page = require('../../page'),

Authenticate = Page.extend({
  pageRoot: '/signup/authenticate',

  selectors : {
    continue: '#submit-button',
    statusButton: '#status-button',
    statusMenu: '#status-menu'
  },

  // These functions are almost always not needed
  submitAuthentication: function() { return this; },
  submitFormCheck: function() { return this; },

  submitForm: function() {
    this.find(this.selectors.continue).click();
    return this;
  },
  
  enterEmail : function(email) {
    var selector = '#' + this.key + '_email';

    this.whenDisplayed(selector).then(function() {
      this.find(selector).sendKeys('');
      this.find(selector).sendKeys(email);
    }.bind(this));

    return this;
  },
  
  enterStatus : function(status) {
    this.whenDisplayed(this.selectors.statusButton).then(function() {
      this.find(this.selectors.statusButton).click();

      this.whenDisplayed(this.selectors.statusMenu).then(function() {
        this.find("//*[@id='"+this.selectors.statusMenu.slice(1)+"']//a[contains(text(),'"+status+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  }
});

module.exports = Authenticate;
