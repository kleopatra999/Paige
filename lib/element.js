var webdriver = require('selenium-webdriver'),
    WebElement = webdriver.WebElement;

WebElement.prototype.find = function(target, strategy) {
  if (typeof target !== 'string') {
    return this.find.apply(this, target);
  }

  strategy = strategy || 'css';
  return this.findElement(webdriver.By[strategy](target));
};
