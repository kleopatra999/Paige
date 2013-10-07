var PageObject, webdriver = require('selenium-webdriver'),
    expect = require('chai').expect,
    extend = require('nbd').util.extend,
    Class = require('nbd').Class,
    Config = require('./config');

// Default timeout, in milliseconds, for wait-esc commands
var DEFAULT_TIMEOUT = 15000;

// The Base Page Object. All other pages **must** extend off of this one.
PageObject = Class.extend({
  // The url root for the given page being modeled.
  pageRoot: '/',

  /**
   * @param config Map of environment config values to config properties. Should be the users config.json
   */
  init: function (config, session) {
    this._config = Config.extend(config);

    if (session) { this._session = session; }
  },

  build: function() {
    this._session = new webdriver.Builder()
    .usingServer(this._config.webdriver.address)
    .withCapabilities(this._config.webdriver.config)
    .build();

    return this.open();
  },

  open: function (url) {
    this._session.get(url || this._config.address + this.pageRoot);

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
    // If the underlying session promise is not pending,
    // it means that the session isn't currently waiting
    // on anything and we can safely quit it without
    // staling forever.
    if (!this._session.session_.isPending()) {
      this._session.quit();
    }
  },

  resizeWindowTo: function (dimensions) {
    this._session.manage().window().setSize(dimensions.width, dimensions.height);

    return this;
  },

  /**
   * Verify that the current page the session is on is what the test
   * believes it to be by checking the page's integrity as defined
   * by the given page.
   *
   * Should be overriden in the Page and called through _super
   *
   * @param integrityFields
   */
  onPage: function(integrityFields) {
    // Default case, for when this isn't overridden by a descendent
    // Page Object. Checks that the pathname of the current page and
    // the page root are the same.
    if (!integrityFields) {
      this.runOnPage(function() {
        return window.location.pathname;
      }).then(function(pathname) {
        expect(pathname).to.equal(this.pageRoot);
      }.bind(this));
    }
    else {
      integrityFields.forEach(function(field) {
        var seletor;

        if (typeof field === 'string') {
          this.find(field).isDisplayed().then(function(displayed) {
            expect(displayed).to.be.true;
          });
        }
        else {
          // For not this is stubbed; but eventually, you should be able to
          // declare what the page considers to be an element's existence
          // delimiter for page integrity.
        }
      }.bind(this));
    }
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

  findAll: function(target, strategy) {
    if (typeof target === 'array') {
      return this.findAll.apply(this, target);
    }

    strategy = strategy || 'css';
    return this._session.findElements(webdriver.By[strategy](target));
  },

  verifyContent: function(selector, content) {
    this.whenDisplayed(selector).then(function() {
      this.find(selector).getText().then(function(innerText) {
        assert.strictEqual(innerText, content);
      });
    }.bind(this));

    return this;
  },

  whenDisplayed: function(element, timeout) {
    timeout = timeout || DEFAULT_TIMEOUT;

    var deferred = webdriver.promise.defer();

    this._session
    .wait(function() {
      return this.exists(element);
    }.bind(this), timeout, "Waited "+ timeout +"ms for '"+ element +"' to be displayed")
    .then(function() {
      return this._session.wait(function() {
        return this.find(element).isDisplayed();
      }.bind(this), timeout, "Waited "+ timeout +"ms for '"+ element +"' to be displayed");
    }.bind(this))
    .then(deferred.fulfill);

    return deferred.promise;
  },

  whenNotDisplayed: function(element, timeout) {
    timeout = timeout || DEFAULT_TIMEOUT;

    var deferred = webdriver.promise.defer();

    this._session
    .wait(function() {
        return this.exists(element).then(function(exists) {
          if (!exists) { return true; }

          this.find(element).isDisplayed().then(function (displayed) {
            return !!displayed;
          });
        }.bind(this));
    }.bind(this), timeout, "Waited "+ timeout +"ms for '"+ element +"' to be displayed")
    .then(deferred.fulfill);

    return deferred.promise;
  },

  runOnPage: function(fn) {
    return this._session.executeScript(typeof fn === 'function' ?
                                       'return (' + fn.toString() + ').call(null, arguments)' :
                                       fn.toString());
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
