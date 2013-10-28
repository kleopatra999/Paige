var webdriver = require('selenium-webdriver'),
    WebElement = webdriver.WebElement;

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
