var expect = require('chai').expect,
    Page = require('../page'),

Index = Page.extend({
  pageRoot: '/account/login',

  selectors: {
    username: '#login_username',
    password: '#login_password',
    login: '#auth-login-submit'
  },

  enterInformation: function(userInfo) {
    this.enterUsername(userInfo.username);
    this.enterPassword(userInfo.password);

    return this;
  },

  submitForm: function() {
    this.find(this.selectors.login).click();
    return this;
  },

  enterUsername: function(username) {
    this.whenDisplayed(this.selectors.username).then(function() {
      this.find(this.selectors.username).sendKeys('');
      this.find(this.selectors.username).sendKeys(username);
    }.bind(this));
  },

  enterPassword: function(password) {
    this.whenDisplayed(this.selectors.password).then(function() {
      this.find(this.selectors.password).sendKeys('');
      this.find(this.selectors.password).sendKeys(password);
    }.bind(this));
  }

});

module.exports = Index;
