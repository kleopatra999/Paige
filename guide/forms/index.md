---
layout: guide
title: About | Paige
header: About
---
## Forms
Because forms are so common, we decided to create a special Form component. Forms can be added to a Page just like any other component.

## How to use the Form component
```javascript
Paige = require('be-paige'),

Home = Paige.extend({
  selectors: {
    // selectors go here
  },

  forms: {
    form1: {                         // Name the form something meaningful
      context: '#form',              // selector for the form, all form actions will happen in this context
      submit: '#submit-button',      // selector for the form's submit button
      inputs: {                      // Describe the form inputs in this block
        textField1: {                // Name the fields/inputs something meaningful
          selector: '#text-field-1', // selector for the input
          type: 'text'               // The type of input
        },
        textField2: '#text-field-2', // The default input type is a text box
        checkbox1: {
          selector: '#checkbox-1',
          type: 'checkbox'
        },
        customField1: {
          selector: '#custom-field',
          type: 'my custom input type'  // Custom input types can be defined as well
        }
      }
    }
  },

  // The form component looks for a function named 'fillIn + inputType' to fill out the field
  // Use this to define your own custom field types. 
  // Passed in to the function is the form context, the selector for the input, and the data
  fillInMyCustomInputType: function($form, selector, data) {
    // Logic to fill out custom field type goes here
  },

  completeForm1: function() {
    // enterInformation(formName, dataObject) can be used to fill out the form
    // formName is the name of the form as described in the forms map above
    // dataObject is an object mapping inputs to input data
    // enterInformation will fill out the form based on type of the input as described in the form map
    return this.enterInformation('form1', {
      textField1: 'text string 1',
      textField2: 'text string 2',
      checkbox1: true,
      customField: 'custom field data'
    });
  },

  submitForm1: function() {
    // submitForm(formName) is used to submit a form
    // formName is the name of form as described in the forms map above
    return this.submitForm('form1');
  },

  // Additional page operations go here

}).with(Paige.components.form);      // Add the form to the page

```

## Basic input types included

**text**:
Used to fill out basic text fields.
data: a string of text to be entered. 
_Note_: this input type will first clear any data already in the field.

**select**:
Used to choose from a basic select menu.
data: the `value` of the option you wish to select.

**checkbox**:
Used to fill out a checkbox field.
data: `true` to make sure the field is checked, `false` to make sure the field is unchecked. If a string is provided, the checkbox with the `value` of the string will be toggled.

**radio**:
Used to select a radio option
data: the `value` of the option you wish to select.
