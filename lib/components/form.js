// Common component for filling in and submitting forms
//
// Currently is restricted to filling in simple inputs.
var Form = {
  /**
   * The `forms` map defines the selectors for the various forms on
   * a given page. The first level keys are the short names for the
   * forms (which can be passed to `enterInformation` and `submitForm`.
   * Each of these inner maps have two keys: context - the selector for
   * the form itself, and inputs - the selector map for the inputs in the
   * given form.
   *
   * Example
   * ==============================================================
   * forms: {
   *   signup: {
   *     context: "#gbqf",
   *     submit: "[name=btnG]",
   *     inputs: {
   *       search: "[name=q]"
   *     }
   *   }
   * }
   */
  forms: {},

  enterInformation: function(formKey, data) {
    if (!(this.forms && this.forms[formKey])) {
      throw new Error('The page does not have a form defined for "' + formKey +'"');
    }

    var form = this.forms[formKey],
        $form = this.find(form.context);

    Object.keys(form.inputs).forEach(function(input) {
      var selector = form.inputs[input];

      this.whenDisplayed(selector).then(function() {
        $form.find(selector).sendKeys('');
        $form.find(selector).sendKeys(data[input]);
      });
    }.bind(this));

    return this;
  },

  submitForm: function(formKey) {
    if (!this.forms[formKey]) {
      throw new Error('The does not have a form defined for "' + formKey +'"');
    }

    this.find(this.forms[formKey].submit).click();
    return this;
  }
};

module.exports = Form;
