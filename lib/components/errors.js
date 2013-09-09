var Errors,
    expect = require('chai').expect;

Errors = {

  // when the conditionalSelector appears, do the check on all
  // other selectors in visibilityHash = { selector: bool, ...}
  // bool => indicates whether the selector is visible or not
  errorsVisible: function(visibilityHash, conditionalSelector) {

    this.whenDisplayed(this.selectors[conditionalSelector]).then(function() {
      Object.keys(visibilityHash).forEach(function(element) {
        this.find(this.selectors[element]).isDisplayed(function(visible) {
          expect(visible).to.equal(visibilityHash[element]);
        }.bind(this));
      }.bind(this));
    }.bind(this));

    return this;
  }

};

module.exports = Errors;
