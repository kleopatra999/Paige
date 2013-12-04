var webdriver = require('selenium-webdriver'),
    WebElement = webdriver.WebElement;

function getSource(fn) {
  return (/function.*\(\) {\s*(.*)\s*}/).exec(fn.toString().replace(new RegExp('\n', 'g'), ''))[1];
}

WebElement.prototype.getXPath = function() {
  // FireBug's getXPath implementation
  var getXPath = function() {
    var paths = [], element = arguments[0];

    for (; element && element.nodeType === 1; element = element.parentNode) {
      var index = 0;

      for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
        if (sibling.nodeType === Node.DOCUMENT_TYPE_NODE) { continue; }
        if (sibling.nodeName === element.nodeName) { ++index; }
      }

      var tagName = element.nodeName.toLowerCase();
      var pathIndex = (index ? "[" + (index+1) + "]" : "");
      paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
  };

  /* jshint camelcase: false */
  return this.driver_.executeScript(getSource(getXPath), this).then(function(elementXPath) {
    return elementXPath;
  });
};

WebElement.prototype.find = function(target, strategy) {
  if (typeof target !== 'string') {
    return this.find.apply(this, target);
  }

  strategy = strategy || 'css';
  return this.findElement(webdriver.By[strategy](target));
};

WebElement.prototype.exists = function(target, strategy) {
  if (typeof target !== 'string') {
    return this.exists.apply(this, target);
  }

  strategy = strategy || 'css';
  return this.isElementPresent(webdriver.By[strategy](target));
};

WebElement.prototype.clickable = function() {
  return this.getAttribute('disabled').then(function(retVal) {
    return !retVal;
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
  return this.getXPath().then(function(elementXPath) {
    var fn = [
      'var styles = {};',
      'var computedStyles = window.getComputedStyle(document.evaluate("',
      elementXPath,
      '", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);',
      'Array.prototype.slice.call(computedStyles).forEach(function(style) {',
      'styles[style] = computedStyles.getPropertyValue(style);',
      '});',
      'return styles;'
    ];

    /* jshint camelcase: false */
    return this.driver_.executeScript(fn.join(''), this);
  }.bind(this));
};

/**
 * Change the style of an element to make Selenium think it's visible
 */
WebElement.prototype.makeVisible = function() {
  return this.getXPath().then(function(elementXpath) {
    var fn = [
      "var element = document.evaluate('",
      elementXpath,
      "', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;",
      "element.style.top = 0;",
      "element.style.left = 0;",
      "element.style.position = 'absolute';",
      "element.style.visibility = 'visible';",
      "element.style.display = 'block';",
      "element.style.height = '1px';",
      "element.style.width = '1px';"
    ];

    /* jshint camelcase: false */
    return this.driver_.executeScript(fn.join(''), this).then(function() {
      return this;
    }.bind(this));
  }.bind(this));
};

/**
 * Performs a mouseover event on the element
 */
WebElement.prototype.hover = function() {
  return this.getXPath().then(function(elementXpath) {
    var fn = [
      "var event = document.createEvent('MouseEvents');",
      "event.initEvent('mouseover', true, false);",
      "document.evaluate('",
      elementXpath,
      "', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue",
      ".dispatchEvent(event)"
    ];

    /* jshint camelcase: false */
    return this.driver_.executeScript(fn.join(''), this);
  }.bind(this));
};

/**
 * Performs a mouseout event on the element
 */
WebElement.prototype.unhover = function() {
  return this.getXPath().then(function(elementXpath) {
    var fn = [
      "var event = document.createEvent('MouseEvents');",
      "event.initEvent('mouseout', true, false);",
      "document.evaluate('",
      elementXpath,
      "', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue",
      ".dispatchEvent(event)"
    ];

    /* jshint camelcase: false */
    return this.driver_.executeScript(fn.join(''), this);
  }.bind(this));
};
