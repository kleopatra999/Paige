var Ringling = {
  key: 'ringling',

  // These functions are almost always not needed
  submitAuthentication: function( data ) {
    this.enterStatus( data.status );
    this.enterEmail( data.email );
    return this;
  },

  submitFormCheck: function() { return this.submitForm(); }
};

module.exports = Ringling;
