var Index,
    assert = require('assert'),
    Page = require('../page');

Index = Page.extend({
  selectors: {
    email: '#signup_email',
    password: '#signup_password',
    recaptcha: '#recaptcha_response_field',
    submit: '#submit-button'
  },

  init: function(config) {
    this._super(config);
    this._rootPage = '/signup';
  },

  enterForm: function(email, password, emailRequired) {
    password = password || '';
    emailRequired = emailRequired || true;

    // Make sure the captcha is hidden
    this.find(this.selectors.recaptcha).isDisplayed().then(function(displayed) {
      assert.equal(displayed, false);
    });

    if (emailRequired) {
      this.enterEmail(email);
    }

    this.enterPassword(password);
    this.enterCaptcha('phony recaptcha');

    return this;
  },

  enterEmail: function(email) {
    // Wait until the element is actually displayed
    this.whenDisplayed(this.selectors.email).then(function () {
      // Focus on the element first, then send the actual content
      this.find(this.selectors.email).sendKeys('');
      this.find(this.selectors.email).sendKeys(email);
    }.bind(this));

    return this;
  },

  enterPassword: function(password) {
    // Wait until the element is actually displayed
    this.whenDisplayed(this.selectors.password).then(function () {
      // Focus on the element first, then send the actual content
      this.find(this.selectors.password).sendKeys('');
      this.find(this.selectors.password).sendKeys(password);
    }.bind(this));

    return this;
  },

  enterCaptcha: function(captcha) {
    this.find(this.selectors.recaptcha).sendKeys(captcha);

    return this;
  },

  submitForm: function() {
    this.whenDisplayed(this.selectors.submit).then(function() {
      this.find(this.selectors.submit).click();
    }.bind(this));

    return this;
  }
});

module.exports = Index;
