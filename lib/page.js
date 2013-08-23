var PageObject, webdriver = require('selenium-webdriver'),
    Class = require('nbd').Class;

PageObject = Class.extend({
  init: function (location, options) {
    this._prefix = 'http://net.dev17.be.lan';
    this._rootPage = '';

    this._locators = {};

    this._session = new webdriver.Builder()
      .usingServer(location)
      .withCapabilities(options)
      .build();
  },

  done: function () {
    this._session.quit();
  },

  resizeWindowTo: function (dimensions) {
    this._session.manage().window().setSize(dimensions.width, dimensions.height);

    return this;
  },

  open: function () {
    this._session.get(this._prefix + this._rootPage);

    return this;
  },

  click: function (strategy, target) {
    this._session.findElement(webdriver.By[strategy](target)).click();

    return this;
  }
});

module.exports = PageObject;
