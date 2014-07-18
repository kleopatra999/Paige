---
layout: guide
title: About | Paige
header: About
---
Paige's main abstraction comes in the form of Page Objects. Each specific page is an _extension_ of the base page object. A minimum page object could look like:

```javascript
var Page = require('be-paige').Page,

Index = Page.extend({
  pageRoot: '/signup'
});

module.exports = Index;
```

However, more often than not, additional functionality will be added to a given page. A Page Object is primarily composed of a few pieces:

- The pageRoot
- A Map of selectors
- Forms
- Functions that operate over the Page
- Components

## pageRoot

This defines the pathname of the page being modeled. Used as the default when calling `open()` or `onPage()`.

## Selectors

The selectors map of a Page defines the elements present on the page. These can either be strings containing a css selector - `'.nav-bar li'` - or a tuple of selector and method - `['signup-username', 'id']`. See [[Selectors]] for more details.

## Forms

The forms map defines all the forms on the current page, to be used with the form components. See the [[Forms]] page for more details.

## Page Operations

The functions defined on a Page should be used not only for providing functionality, but for describing the actual operations being performed. Any function on the extended page should be either a piece of an operation or the entire, exposed operation for tests. Within the functions, `this` is the prototype of the extended Page Object.

**Note:** Please choose names carefully! Remember that the point of these is to make your tests more readable _AND_ convey the behavior of your Page Object.

### Example

```javascript
  selectors: {
    button: '#button',
    form: '#form',
    textbox: '#form .textbox'
  },

  clickButton: function() {
    // Wait until the button is displayed
    this.whenDisplayed(this.selectors.button).then(function() {
      // click on the button
      this.find(this.selectors.button).click();
    }.bind(this));

    return this;
  },

  enterText: function(text) {
    // Wait until the form is displayed
    this.whenDisplayed(this.selectors.form).then(function () {
      // Enter the text in the text box
      this.find(this.selectors.textbox).sendKeys(text);
      // Submit
      this.clickButton();
    }.bind(this));

    return this;
  }
```

## `with` and Components

The goal with Paige is to take the now well-defined practice of modeling pages-under-test as classes and add the benefits of the highly malleable inheritance model that we have in javascript. The primary way we do this is by extracting common functionality through [[Components]].

The way we get our components to build on top of our Page Objects is through the function `with`. `with` is a special case of the common trait/mixin pattern, with one exception: the `selectors` property of all mixed in objects get merged instead of overridden. This allows us to define generic selectors in our components and redefine them _only_ if needed in our Page Object. 

## Full Example Page Object

```javascript
// Import the base Page Object from Paige
var Page = require('paige').Page,

    // Import Componentry
    Navbar = require('../components/navbar'),
    Forms = require('paige').components.forms,
    
    // Import chai's expect BDD syntax. Chai is our assertion library of choice.
    expect = require('chai').expect,

// Extend our Page off of the base Page Object
Home = Page.extend({
  // Declare the root of the page's url
  pageRoot: '/home',

  // Define The selectors specific to this particular page
  selectors: {
    button: '#button',
    form: '#form',
    textbox: '#form .textbox'
  },

  // Define the forms on this page

  // Declare Page Operations that can be used in our test files
    clickButton: function() {
    // Wait until the button is displayed
    this.whenDisplayed(this.selectors.button).then(function() {
      // click on the button
      this.find(this.selectors.button).click();
    }.bind(this));

    return this;
  },

  // This can be accomplished using our Form component, but is included for illustration purposes.
  enterText: function(text) {
    // Wait until the form is displayed
    this.whenDisplayed(this.selectors.form).then(function () {
      // Enter the text in the text box
      this.find(this.selectors.textbox).sendKeys(text);
      // Submit
      this.clickButton();
    }.bind(this));

    return this;
  }

})
// "with" our two components:
//   - Errors for checking the presence of error on a form
//   - Forms for access to reusable form functionality
.with(Errors, Forms);

module.exports = Home;
```
