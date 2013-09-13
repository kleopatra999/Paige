var PageObject, webdriver = require('selenium-webdriver'),
    extend = require('nbd').util.extend,
    Class = require('nbd').Class;


// The Base Page Object. All other pages **must** extend off of this one.
PageObject = Class.extend({
  // The url root for the given page being modeled.
  pageRoot: '/',

  /**
   * @param config Map of environment config values to config properties. Should be the users config.json
   */
  init: function (config, session) {
    this._config = config;
    this._prefix = config.test_address;

    if (session) { this._session = session; }
  },

  build: function() {
    this._session = new webdriver.Builder()
    .usingServer(this._config.webdriver_address)
    .withCapabilities(this._config.webdriver_config)
    .build();

    return this.open();
  },

  open: function (url) {
    this._session.get(url || this._prefix + this.pageRoot);

    return this;
  },

  switchTo: function(Page) {
    return new Page(this._config, this._session);
  },

  switchToFrame: function( frameId ) {
    this._session.switchTo().frame( frameId );
    return this;
  },

  switchOffFrame: function() {
    this._session.switchTo().defaultContent();
    return this;
  },

  redirectTo: function(Page) {
    return this.switchTo(Page).open();
  },

  done: function (fn) {
    this._session.quit().then(fn, fn);
  },

  resizeWindowTo: function (dimensions) {
    this._session.manage().window().setSize(dimensions.width, dimensions.height);

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
  },

  whenNotDisplayed: function(element, timeout) {
    timeout = timeout || 5000;

    var deferred = webdriver.promise.defer();

    this._session
    .wait(function() {
        return this.exists(element).then(function(exists) {
          if (!exists) { return true; }

          this.find(element).isDisplayed().then(function (displayed) {
            return !!displayed;
          });
        }.bind(this));
    }.bind(this), timeout)
    .then(deferred.fulfill);

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
