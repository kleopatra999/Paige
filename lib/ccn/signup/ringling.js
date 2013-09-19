var Ringling = {
  key: 'ringling',

  enterCcnInfo: function( data ) {

    this.whenDisplayed( this.selectors.form ).then( function() {
      this.enterMajorSelect(data.major);
      this.enterGraduationYear(data.year);
      this.enterStatus(data.status);
    }.bind(this));

    return this;
  },
  
  // Email is disabled on this step
  enterEmail: function() { return this; },
  
  // Autodetects
  selectMember: function() { return this; }
};

module.exports = Ringling;
