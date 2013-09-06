var PageObject, webdriver = require('selenium-webdriver'),
    extend = require('nbd').util.extend,
    Class = require('nbd').Class;


PageObject = Class.extend({
  init: function (config, session) {
    this._config = config;
    this._prefix = config.test_address;
    this._rootPage = '';

    this._session = session || new webdriver.Builder()
      .usingServer(config.webdriver_address)
      .withCapabilities(config.webdriver_config)
      .build();
  },

  switchTo: function(Page) {
    return new Page(this._config, this._session);
  },

  redirectTo: function(Page) {
    return this.switchTo(Page).open();
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

  whenDisplayed: function(element, timeout, present) {
    timeout = timeout || 5000;
    present = present || true;

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
  },

  // This does not work correctly for certain instances. It is currently here for parity with the PHP
  // suite, but consider it deprecated and look for other ways to wait for conditions, not against.
  whenNotDisplayed: function(element, timeout) {
    timeout = timeout || 5000;

    var deferred = webdriver.promise.defer();

    this._session
    .wait(function() {
      return !this.exists(element) || (this.exists(element) && this.find(element).isDisplayed());
    }.bind(this), timeout)
    .then(deferred.fulfill, deferred.fulfill);

    return deferred.promise;
  }
}, {
  'with': function() {
    var selectors = {},
        mixins = arguments;

    [].push.call(mixins, this.prototype);

    [].forEach.call(mixins, function(klass) {
      selectors = extend(selectors, klass.selectors);
    });

    [].push.call(mixins, { selectors: selectors });

    return [].reduce.call(mixins, function(prev, curr) {
      return prev.mixin(curr);
    }, this);
  }
});

module.exports = PageObject;
