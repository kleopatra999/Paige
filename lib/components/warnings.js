var Warnings,
    assert = require('assert');

Warnings = {
  selectors: {
    warningMessage: '.verify-warning'
  },

  verifyWarning: function(message) {
    this.whenDisplayed(this.selectors.warningMessage).then(function() {
      if (message) {
        this.find(this.selectors.warningMessage).getText().then(function(innerText) {
          assert.equal(innerText, message);
        });
      }
    }.bind(this));

    return this;
  }
};

module.exports = Warnings;