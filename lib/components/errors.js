var Errors,
    webdriver = require('selenium-webdriver'),
    expect = require('chai').expect;

Errors = {

  // when the conditionalSelector appears, do the check on all
  // other selectors in visibilityHash = { selector: bool, ...}
  // bool => indicates whether the selector is visible or not
  errorsVisible: function(visibilityHash) {

    Object.keys( visibilityHash ).forEach(function(selector) {

      this.exists(this.selectors[selector]).then(function(visible) {
        //console.log( "\n" + selector + ': ' + visible +' vs ' + visibilityHash[selector]);
        expect(visible).to.equal(visibilityHash[selector]);
      });

    }.bind(this));

    return this;
  }

};

module.exports = Errors;
