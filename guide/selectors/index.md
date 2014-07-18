---
layout: guide
title: About | Paige
header: About
---
## Selectors
Paige allows for pages and components to have a special object called `selectors`. These selectors define a map of all elements on the page/component you wish to access. Any selectors defined in a component are merged into the selectors object of page, and are available for use.

Selenium uses the `webElement` object to represent elements on a page. The base page exposes a `find()` method which allows you to find an element on the page, and returns the corresponding `webElement`. By default, Paige assumes css selectors are used. Other strategies, such as xpath selectors, are also available. To use a strategy other than css, define the selector as a tuple `[selector, strategy]`.

**Example**:
```JavaScript
{
  homeButton: '#home-button',                   // css selector for the home button
  loginButton: ['//div[@id="login"]', 'xpath']  // xpath selector for the login button
}
```

## Target Locator Strategies

Selenium strategies to find a webElement (note that selenium refers to these as `By`'s):
* className/class name
* css
* id
* js
* linkText/link Text
* name
* partialLinkText/partial link text
* tagName/tag name
* xpath

## References
- CSS selector reference: http://www.w3schools.com/cssref/css_selectors.asp
- XPath syntax reference: http://www.w3schools.com/xpath/xpath_syntax.asp
