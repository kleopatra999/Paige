var Errors,
    webdriver = require('selenium-webdriver'),
    expect = require('chai').expect;

Errors = {

  // when the conditionalSelector appears, do the check on all
  // other selectors in visibilityHash = { selector: bool, ...}
  // bool => indicates whether the selector is visible or not
  errorsVisible: function(visibilityHash) {

    var keys = Object.keys( visibilityHash );
    var visibilityChain = webdriver.promise.defer();

    console.log( "\n" );
    for( var index in keys ) {
      var selector = keys[index];
      var cb = ( visibilityHash[selector] ) ? 'whenDisplayed' : 'whenDisplayed';//'whenNotDisplayed';
      console.log( cb + '(' + selector + ')' );
      visibilityChain = visibilityChain.then(function(resolve) {
        return this[cb](this.selectors[selector]);
      }.bind(this));
    }

    return visibilityChain.promise;
  }

};

module.exports = Errors;
