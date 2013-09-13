var Social = {
  selectors: {
    googleButton: '.signup-button-google',
    adobeButton: '.signup-button-adobe',
    linkedInButton: '.signup-button-linkedin',

    facebookButton: '.signup-button-facebook',
    facebookEmail: '#email',
    facebookPassword: '#pass',
    facebookLoginButton: '#loginbutton',
    facebookDontSaveBrowser: '#u_0_1',
    facebookPermissionOkay: '#checkpointSubmitButton',
    facebookPermissionConfirm: '.layerConfirm'
  },

  clickSocialButton: function(selector_key) {
    this.whenDisplayed(this.selectors[selector_key]).then(function() {
      this.find(this.selectors[selector_key]).click();
    }.bind(this));

    return this;
  },

  facebookSignin: function(email, password) {
    this.find(this.selectors.facebookEmail).sendKeys(email);
    this.find(this.selectors.facebookPassword).sendKeys(password);
    this.find(this.selectors.facebookLoginButton).click();

    return this;
  }
};

module.exports = Social;
