var extend = require('nbd').util.extend,
    CcnSignup = require('../signup' ),

Studentshow = extend( {}, CcnSignup, {

  key: 'studentshow',

  selectors: {
    school: '#studentshow_school_field',
    firstSchool: '#studentshow_school_options li:first-child .listselector-option-display',
    form: '#ccn-container'
  },

  enterCcnInfo: function( data ) {
  
    this.whenDisplayed( this.selectors.form ).then( function() {
      this.enterSchool(data.school);
      this.enterMajor(this.key, data.major);
      this.enterGraduationYear(this.key, data.year);
      this.enterStatus(this.key, data.status);
    }.bind(this));

    return this;
  },

  enterSchool: function( school ) {
    this.whenDisplayed(this.selectors.school).then(function() {
      this.find(this.selectors.school).sendKeys('');
      this.find(this.selectors.school).sendKeys(school);
    }.bind(this));

    this.whenDisplayed(this.selectors.firstSchool).then(function() {
      this.find(this.selectors.firstSchool).click();
    }.bind(this));
    return this;
  }

});

module.exports = Studentshow;
