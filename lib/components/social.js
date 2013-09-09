var Social,
    assert = require('assert');

Social = {
  selectors: {
    googleButton: '.signup-button-google',
    facebookButton: '.signup-button-facebook',
    adobeButton: '.signup-button-adobe',
    linkedInButton: '.signup-button-linkedin'
  },

  clickSocialButton: function( selector_key ) {
    this.whenDisplayed(this.selectors[selector_key]).then(function() {
      this.find(this.selectors[selector_key]).click();
    }.bind(this));

    return this;
  }

};

module.exports = Social;
