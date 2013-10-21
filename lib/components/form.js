// Common component for filling in and submitting forms
//
// Currently is restricted to filling in simple inputs.
var Form = {
  selectors: {
    inputs: {
      continue: '#continue'
    }
  },

  enterInformation: function(data) {
    // Using `self` to bind current caller instead of calling `bind`
    // as is the usual pattern due to the nested-ness of this function.
    var self = this;

    Object.keys(this.selectors.inputs).forEach(function(input) {
      if (input === 'continue') { return; }

      var selector = self.selectors.inputs[input];

      self.whenDisplayed(selector).then(function() {
        self.find(selector).sendKeys('');
        self.find(selector).sendKeys(data[input]);
      });
    });

    return this;
  },

  submitForm: function() {
    this.find(this.selectors.inputs.continue).click();
    return this;
  }
};

module.exports = Form;
