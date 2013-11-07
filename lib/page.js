var fs = require('fs'),
    request = require('request'),
    AdmZip = require('adm-zip'),
    webdriver = require('selenium-webdriver'),
    // Monkey-patched WebElement
    WebElement = require('./element'),
    expect = require('chai').expect,
    extend = require('nbd').util.extend,
    Class = require('nbd').Class,
    Config = require('./config'),
    PageObject;

// Default timeout, in milliseconds, for wait-esc commands
var DEFAULT_TIMEOUT = 15000;

function asyncForEach(list, cb) {
  var deferred = webdriver.promise.defer(),
      counter = 0;

  list.forEach(function(element) {
    cb(element, function() {
      if (++counter >= list.length) {
        deferred.fulfill();
      }
    });
  });

  return deferred;
}

// The Base Page Object. All other pages **must** extend off of this one.
PageObject = Class.extend({
  // The url root for the given page being modeled.
  pageRoot: '/',

  Key: webdriver.Key,

  /**
   * @param config Map of environment config values to config properties. Should be the users config.json
   */
  init: function(config, session) {
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

  open: function(url) {
    this._session.get(url || this._config.address + this.pageRoot);

    return this;
  },

  openFromRoot: function(slug) {
    this._session.get(this._config.address + slug);

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

  done: function(fn) {
    // If the underlying session promise is not pending,
    // it means that the session isn't currently waiting
    // on anything and we can safely quit it without
    // staling forever.
    if (!this._session.session_.isPending()) {
      this._session.quit();
    }
  },

  resizeWindowTo: function(dimensions) {
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
        var selector;

        if (typeof field === 'string') {
          this.find(field).isDisplayed().then(function(displayed) {
            expect(displayed).to.be.true;
          });
        }
        else {
          selector = field.selector;
          delete field.selector;

          Object.keys(field).forEach(function(check) {
            this.find(selector)[check]().then(function(retVal) {
              expect(field[check]).to.equal(retVal);
            });
          }.bind(this));
        }
      }.bind(this));
    }

    return this;
  },

  exists: function(target, strategy) {
    if (typeof target !== 'string') {
      return this.exists.apply(this, target);
    }

    strategy = strategy || 'css';
    return this._session.isElementPresent(webdriver.By[strategy](target));
  },

  find: function(target, strategy) {
    if (typeof target !== 'string') {
      return this.find.apply(this, target);
    }

    strategy = strategy || 'css';
    return this._session.findElement(webdriver.By[strategy](target));
  },

  findAll: function(target, strategy) {
    if (typeof target !== 'string') {
      return this.findAll.apply(this, target);
    }

    strategy = strategy || 'css';
    return this._session.findElements(webdriver.By[strategy](target));
  },

  findInList: function(list, matcher) {
    list = list || [];

    var deferred = webdriver.promise.defer();

    asyncForEach(list, function(element, cb) {
      // Do a check
      matcher(element, function(resolution) {
        if (resolution && deferred.isPending()) {
          deferred.fulfill(resolution);
        }

        cb();
      });
    })
    .then(function() {
      if (deferred.isPending()) {
        deferred.reject('Nothing matched in list');
      }
    });

    return deferred;
  },

  /**
   * Verifies text content of an element against a given string
   *
   * @param element {Selector|WebElement} - The element to check.
   * @param content {String} - Content to match against.
   */
  verifyContent: function(element, content) {
    // Check if simple selector, or selector tuple
    if (typeof element === 'string' || typeof element[0] === 'string') {
      this.whenDisplayed(element).then(function() {
        this.find(element).getText().then(function(innerText) {
          expect(innerText).to.equal(content);
        });
      }.bind(this));
    }
    else {
      element.getText().then(function(innerText) {
        expect(innerText).to.equal(content);
      });
    }

    return this;
  },

  whenDisplayed: function(element, timeout) {
    timeout = timeout || DEFAULT_TIMEOUT;

    var deferred = webdriver.promise.defer();

    this._session
    .wait(function() {
      return this.exists(element);
    }.bind(this), timeout, "Waited for '"+ element +"' to be displayed")
    .then(function() {
      return this._session.wait(function() {
        return this.find(element).isDisplayed();
      }.bind(this), timeout, "Waited for '"+ element +"' to be displayed.");
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
    }.bind(this), timeout, "Waited for '"+ element +"' to not be displayed.")
    .then(deferred.fulfill);

    return deferred.promise;
  },

  runOnPage: function(fn) {
    return this._session.executeScript(typeof fn === 'function' ?
                                       'return (' + fn.toString() + ').call(null, arguments)' :
                                       fn.toString());
  },

  /**
   * Performs a mousever event on the provided element.
   * Currently only works with css selectors
   *
   * @param selector {string} - css selector for the element to mouseover
   */
  hover: function(selector) {
    if (typeof selector !== 'string') {
      throw new TypeError('Expected selector to be a string');
    }

    var js = "event = document.createEvent('MouseEvents');" +
             "event.initEvent('mouseover', true, false);" +
             "document.querySelector('" + selector + "').dispatchEvent(event)";

    return this.runOnPage(js);
  },

  uploadFile: function(localFilePath) {
    var deferred = webdriver.promise.defer(),
        zip = new AdmZip();

    zip.addLocalFile(localFilePath);

    this._session.getSession().then(function(session) {
      request({
        url: this._config.webdriver.address + '/session/' + session.id + '/file',
        method: 'POST',
        body: JSON.stringify({
          file: zip.toBuffer().toString('base64')
        })
      }, function(err, response, body) {
        var parsedBody = JSON.parse(body);

        if (parsedBody && parsedBody.value) {
          deferred.resolve(parsedBody.value);
        }
        else {
          throw new Error('Unable to upload file to grid server.');
        }
      });
    }.bind(this));

    return deferred;
  }
}, {
  'with': function() {
    var selectors = {},
        mixins = [].slice.call(arguments);

    mixins.push(this.prototype);

    mixins.forEach(function(klass) {
      selectors = extend(selectors, klass.selectors);
    });

    mixins.push({ selectors: selectors });

    return mixins.reduce(function(prev, curr) {
      return prev.mixin(curr);
    }, this);
  }
});

module.exports = PageObject;
