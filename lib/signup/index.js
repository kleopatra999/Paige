var Index,
    assert = require('assert'),
    Page = require('../page'),
    Social = require('../components/social.js');

Index = Page.extend({
  selectors: {
    email: '#signup_email',
    password: '#signup_password',
    recaptcha: '#recaptcha_response_field',
    submit: '#submit-button',
    passwordError: '#signup_password-container .form-item-error',
    emailError: '#signup_email-container .form-item-error',
    emailError: '#signup_email-container .form-item-error'
  },

  init: function(config, session) {
    this._super(config, session);
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
  },

  passwordErrorVisible: function( visible ) {
    var fx = (visible) ? 'whenDisplayed' : 'whenNotDisplayed'
    this[fx](this.selectors.passwordError).then(function() {
      return this;
    }.bind(this));

    return this;
  },

  emailErrorVisible: function( visible ) {
    var fx = (visible) ? 'whenDisplayed' : 'whenNotDisplayed'
    this[fx](this.selectors.emailError).then(function() {
      return this;
    }.bind(this));

    return this;
  },

  captchaErrorVisible: function( visible ) {
    var fx = (visible) ? 'whenDisplayed' : 'whenNotDisplayed'
    this[fx](this.selectors.emailError).then(function() {
      return this;
    }.bind(this));

    return this;
  },

  clearForm: function() {
    this.whenDisplayed(this.selectors.email).then(function() {
      this.find(this.selectors.email).clear();
    }.bind(this));
    this.whenDisplayed(this.selectors.password).then(function() {
      this.find(this.selectors.password).clear();
    }.bind(this));

    return this;
  }

}).with(Social);

module.exports = Index;
