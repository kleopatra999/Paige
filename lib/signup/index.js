var Page = require('../page'),
    Social = require('../components/social.js'),
    Errors = require('../components/errors.js'),
    expect = require('chai').expect,

Index = Page.extend({
  pageRoot: '/signup',

  selectors: {
    email: '#signup_email',
    password: '#signup_password',
    recaptcha: '#recaptcha_response_field',
    submit: '#submit-button',
    passwordError: '#signup_password-container .form-error',
    emailError: '#signup_email-container .form-error',
    captchaError: '#recaptcha_response_field-container .form-error'
  },

  focusExpedited: function() {
    this.switchToFrame( 'expedited-signup' );
    return this;
  },

  enterForm: function(email, password, emailRequired) {
    password = password || '';
    emailRequired = emailRequired || true;

    // Make sure the captcha is hidden
    this.find(this.selectors.recaptcha).isDisplayed().then(function(displayed) {
      expect(displayed).to.be.false;
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
    this.whenDisplayed(this.selectors.recaptcha).then(function() {
      this.find(this.selectors.recaptcha).sendKeys(captcha);
    }.bind(this));

    return this;
  },

  submitForm: function() {
    this.whenDisplayed(this.selectors.submit).then(function() {
      this.find(this.selectors.submit).click();
    }.bind(this));

    return this;
  }

}).with(Errors,Social);

module.exports = Index;
