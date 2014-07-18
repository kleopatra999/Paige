---
layout: guide
title: About | Paige
header: About
---
## What is a Component

Components are reusable sections of a page, like a search bar or a form. The bulk of Paige is in the default componentry that it provides and the ability to wire up Pages with components.

## Defining Components

Components are defined as standard javascript objects. The one special part of a component is the `selectors` map. This map will get merged into the selectors map of any Page the component is included in. To combine multiple components into one, use the `compose()` method provided by Paige.

## Using Components

Attach a component to a Page using the `with`. This will merge the selectors map, as well as add all functionality of the component to the page (similar to a trait/mixin in other languages).

Example:

```javascript
home.js:
--------

var navbar = require('navbar'),

Home = require('be-paige').extend({
  selectors: {
    // selectors go here
  },

  // Additional page operations go here
  // clickLogo() and the selectors.logo are both available in this scope
}).with(navbar);



navbar.js:
----------

var Navbar = {
  selectors: {
    logo: '#logo',
    // more selectors go here
  },

  clickLogo: function() {
    // Logic to click the navbar logo goes here
  },

  // Additional operations provided by the navbar go here
};

module.exports = Navbar;
```
