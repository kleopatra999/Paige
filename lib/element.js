var webdriver = require('selenium-webdriver'),
    WebElement = webdriver.WebElement,
    client = require('./client');

/**
 * Get the xPath of the element
 *
 * @return {Promise} promise that resolves with the xpath
 */
WebElement.prototype.getXPath = function() {
  return this.driver_.executeScript(client.getXPath, this);
};

/**
 * Find an element in the context of the current element.
 *
 * @param target
 * @param strategy
 *
 * @return WebElement corresponding to the found element
 */
WebElement.prototype.find = function(target, strategy) {
  if (typeof target !== 'string') {
    return this.find.apply(this, target);
  }

  strategy = strategy || 'css';
  return this.findElement(webdriver.By[strategy](target));
};

/**
 * Check if an element exists in the context of the current element
 *
 * @param target
 * @param strategy
 *
 * @return {Promise} promise that resolves with a boolean representing
 *                   whether the element exists or not.
 */
WebElement.prototype.exists = function(target, strategy) {
  if (typeof target !== 'string') {
    return this.exists.apply(this, target);
  }

  strategy = strategy || 'css';
  return this.isElementPresent(webdriver.By[strategy](target));
};

/**
 * Check if the element is "clickable"
 *
 * @return {Promise} promise that resolves with a boolean representing
 *                   whether the element is clickable or not.
 */
WebElement.prototype.clickable = function() {
  return this.getAttribute('disabled').then(function(retVal) {
    return !retVal;
  });
};

/**
 * Whether or not the element has a given class
 *
 * @return {Promise} promise that resolves with a boolean representing whether or not
 *                   the element has the given class.
 */
WebElement.prototype.hasClass = function (className) {
  return this.getAttribute('class').then(function(classList) {
    return classList.split(' ').indexOf(className) !== -1;
  });
};

/**
 * Get the computed css properties from the element
 *
 * @return {Promise} promise that resolves with a map of the element's css properties
 *                   to their values.
 */
WebElement.prototype.getCssProperties = function() {
  /* jshint camelcase: false */
  return this.driver_.executeScript(client.getCssProperties, this);
};

/**
 * Change the style of an element to make Selenium think it's visible
 */
WebElement.prototype.makeVisible = function() {
  return this.driver_.executeScript(client.makeElementVisible, this).then(function() {
    return this; // the WebElement
  }.bind(this));
};

/**
 * Performs a mouseover event on the element
 */
WebElement.prototype.hover = function() {
  return this.driver_.executeScript(client.hover, this).then(function() {
    return this; // the WebElement
  }.bind(this));
};

/**
 * Performs a mouseout event on the element
 */
WebElement.prototype.unhover = function() {
  return this.driver_.executeScript(client.unhover, this).then(function() {
    return this; // the WebElement
  }.bind(this));
};

/**
 * Get text area input
 *
 * @return {Promise} promise that resolves with the text input.
 */
WebElement.prototype.getTextAreaInput = function() {
  return this.driver_.executeScript(client.getTextAreaInput, this);
};
