var Errors,
    webdriver = require('selenium-webdriver'),
    expect = require('chai').expect;

Errors = {

  // when the conditionalSelector appears, do the check on all
  // other selectors in visibilityHash = { selector: bool, ...}
  // bool => indicates whether the element is actually visible
  errorsVisible: function(visibilityHash) {
    Object.keys( visibilityHash ).forEach(function(selector) {
      this.exists(this.selectors[selector]).then(function(exists) {
        if ( !exists ) {
          expect( visibilityHash[selector] ).to.be.false;
          return;
        }
        this.find(this.selectors[selector]).isDisplayed().then(function(displayed) {
          expect( displayed ).to.equal( visibilityHash[selector] );
        }.bind(this));
      }.bind(this));
    }.bind(this));

    return this;
  }

};

module.exports = Errors;
