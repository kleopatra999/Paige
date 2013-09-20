var Nda = {
  selectors: {
    code: '#nda_code'
  },

  // These functions are almost always not needed
  submitAuthentication: function( data ) {
    this.enterCode( data.code );
    return this;
  },

  enterCode: function( code ) {
    this.whenDisplayed(this.selectors.code).then(function() {
      this.find(this.selectors.code).sendKeys('');
      this.find(this.selectors.code).sendKeys(code);
    }.bind(this));

    return this;
  },

  submitFormCheck: function() { return this.submitForm(); }
};

module.exports = Nda;
