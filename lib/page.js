var PageObject, webdriver = require('selenium-webdriver'),
    Class = require('nbd').Class;

PageObject = Class.extend({
  init: function (config) {
    this._prefix = config.test_address;
    this._rootPage = '';

    this._session = new webdriver.Builder()
      .usingServer(config.webdriver_address)
      .withCapabilities(config.webdriver_config)
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

  exists: function(target, strategy) {
    if (typeof target === 'array') {
      return this.exists.apply(this, target);
    }

    strategy = strategy || 'css';
    return this._session.isElementPresent(webdriver.By[strategy](target));
  },

  find: function(target, strategy) {
    if (typeof target === 'array') {
      return this.find.apply(this, target);
    }

    strategy = strategy || 'css';
    return this._session.findElement(webdriver.By[strategy](target));
  },

  whenDisplayed: function(element, timeout) {
    timeout = timeout || 5000;

    var deferred = webdriver.promise.defer();

    this._session
    .wait(function() {
      return this.exists(element);
    }.bind(this), timeout)
    .then(function() {
      return this._session.wait(function() {
        return this.find(element).isDisplayed();
      }.bind(this), timeout);
    }.bind(this))
    .then(deferred.fulfill);

    return deferred.promise;
  }
});

module.exports = PageObject;
