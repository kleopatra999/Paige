var Social,
    assert = require('assert');

Social = {
  selectors: {
    googleButton: '.signup-button-google',
    facebookButton: '.signup-button-facebook',
    adobeButton: '.signup-button-adobe',
    linkedInButton: '.signup-button-linkedin'
  },

  clickGoogleButton: function() {
    this.whenDisplayed(this.selectors.googleButton).then(function() {
      this.find(this.selectors.googleButton).click();
    }.bind(this));

    return this;
  },

  clickFacebookButton: function() {
    this.whenDisplayed(this.selectors.facebookButton).then(function() {
      this.find(this.selectors.facebookButton).click();
    }.bind(this));

    return this;
  },

  clickAdobeButton: function() {
    this.whenDisplayed(this.selectors.adobeButton).then(function() {
      this.find(this.selectors.adobeButton).click();
    }.bind(this));

    return this;
  },

  clickLinkedInButton: function() {
    this.whenDisplayed(this.selectors.linkedInButton).then(function() {
      this.find(this.selectors.linkedInButton).click();
    }.bind(this));

    return this;
  }

};

module.exports = Social;
