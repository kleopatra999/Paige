
/**
 * Look up the fillIn function used to fill out an arbitrary input type.
 *
 * type 'field' will look for a fillIn named fillInField
 * type 'custom field' will look for fillInCustomField
 * type 'customField' will look for fillInCustomfield
 */
function lookupFillIn(obj, type) {
  var pascalCaseType = type.replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      }).replace(/\s+/g, ''),
      fillInFunc = obj['fillIn' + pascalCaseType];

  if (!fillInFunc) {
    throw new Error('There is no function "fillIn' + pascalCaseType + '" for type "' + type + '"');
  }

  return fillInFunc;
}

// Common component for filling in and submitting forms
var Form = {
  /**
   * The `forms` map defines the selectors for the various forms on
   * a given page. The first level keys are the short names for the
   * forms (which can be passed to `enterInformation` and `submitForm`.
   * Each of these inner maps have three keys:
   *   context - the selector for the form itself
   *   submit  - the selector for the submit button
   *   inputs  - the selector map for the inputs of the given form.
   *
   * The inputs map defines the selector and type for the form's inputs.
   * An input that maps to a string will be assumed to be of type 'text'
   * Other inputs should map to an object with two keys:
   *   selector - the selector for the field
   *   type     - the type of input this is
   *
   * Basic types include text, select, checkbox, and radio.
   * Custom fields can be used as well.
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

  /**
   * Fills out a form.
   *
   * @param formKey - the key corresponding to the form in the forms map
   * @param data - an object mapping input key to the data for that field.
   *     The type of data passed in per input will depend on the type of the input
   */
  enterInformation: function(formKey, data) {
    if (!(this.forms && this.forms[formKey])) {
      throw new Error('The page does not have a form defined for "' + formKey +'"');
    }

    var form = this.forms[formKey],
        $form = this.find(form.context);

    Object.keys(data).forEach(function(dataKey) {
      var input = form.inputs[dataKey];

      if (!input) {
        throw new Error('"' + form + '" has no key defined for "' + dataKey + '"');
      }

      if (typeof input === 'string') {
        input = { selector: input, type: 'text' };
      }

      lookupFillIn(this, input.type).call(this, $form, input.selector, data[dataKey]);
    }.bind(this));

    return this;
  },

  submitForm: function(formKey) {
    if (!(this.forms && this.forms[formKey])) {
      throw new Error('The page does not have a form defined for "' + formKey +'"');
    }

    var form = this.forms[formKey],
        $form = this.find(form.context);

    $form.find(this.forms[formKey].submit).click();
    return this;
  },

  // Default fill in functions for common input types

  /**
   * For basic text box inputs
   * <input type="text"></input>
   *
   * data should be a string of text
   */
  fillInText: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {
      $form.find(selector).clear();
      $form.find(selector).sendKeys('');
      $form.find(selector).sendKeys(data);
    });
  },

  /**
   * For basic select inputs
   * <input type="select">
   *   <options value="1">1</options>
   *   <options value="2">2</options>
   *   <options value="3">3</options>
   * </input>
   *
   * data should be the value of the option to select
   */
  fillInSelect: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {
      $form.find(selector + ' [value="' + data + '"]').click();
    });
  },

  /**
   * For basic checkbox fields
   * <input type="checkbox">
   *   <input type="checkbox" value="1"/>
   *   <input type="checkbox" value="2"/>
   * </input>
   *
   * data can be:
   *   - a value of the check box to toggle
   *   - a boolean defining if the box should be checked/unchecked
   */
  fillInCheckbox: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {

      if (typeof data === 'string') {
        $form.find(selector + '[value="' + data + '"]').click();
      }
      else if (typeof data === 'boolean') {
        $form.find(selector).isSelected().then(function (selected) {
          if (selected !== data) {
            $form.find(selector).click();
          }
        });
      }
    });
  },

  /**
   * For basic radio fields
   * <input type="radio">
   *  <input type="radio" value="1"/>
   *  <input type="radio" value="2"/>
   * </input>
   *
   * data should be the value of the radio to select
   */
  fillInRadio: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {
      $form.find(selector + '[value="' + data + '"]').click();
    });
  }
};

module.exports = Form;
