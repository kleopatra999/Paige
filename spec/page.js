var paige = require("../index"),
    Page = paige.Page,
    createImage = paige.createImage,
    bescribe = require("../bescribe"),
    fs = require("fs"),
    request = require("request"),
    bufferEqual = require('buffer-equal'),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    expect = chai.expect,
    config;

chai.use(chaiAsPromised);

config = {
  address: "http://localhost:8282",
  webdriver: {
    address: "http://localhost:4444/wd/hub",
    config: {
      platform: "MAC",
      browserName: "firefox"
    }
  }
};

bescribe("Base Page Object", config, function(context, describe, it) {
  describe("inheritence", function() {
    describe("through extension", function() {
      it("maintains parent's selectors", function() {
        var PageA = Page.extend({
              selectors: {
                a: 'foo',
                b: 'bar'
              }
            }),
            PageB = PageA.extend({
              selectors: {
                c: 'baz'
              }
            }),
            page = new PageB();

        expect(page.selectors.a).to.equal("foo");
        expect(page.selectors.b).to.equal("bar");
        expect(page.selectors.c).to.equal("baz");
      });
    });

    describe("through composition", function() {
      it("merges selectors of one component", function() {
        var compA = {
          selectors: {
            a: 'foo',
            b: 'bar'
          }
        };
        var CompPage = Page.extend().with(compA);
        var page = new CompPage();

        expect(page.selectors.a).to.equal("foo");
        expect(page.selectors.b).to.equal("bar");
      });

      it("merges selectors of n components", function() {
        var compA = {
              selectors: {
                a: 'foo1',
                b: 'bar1'
              }
            },
            compB = {
              selectors: {
                c: 'baz1'
              }
            },
            CompPage = Page.extend().with(compA, compB),
            page = new CompPage();

        expect(page.selectors.a).to.equal("foo1");
        expect(page.selectors.b).to.equal("bar1");
        expect(page.selectors.c).to.equal("baz1");
      });
    });
    return describe("through extension and composition", function() {
      it("merges selectors of one component", function() {
        var PageA = Page.extend({
              selectors: {
                a: 'foo',
                b: 'bar'
              }
            }),
            PageB = PageA.extend({
              selectors: {
                b: 'bar1'
              }
            }),
            compA = {
              selectors: {
                c: 'baz2'
              }
            },
            CompPage = PageB.with(compA),
            page = new CompPage();

        expect(page.selectors.a).to.equal("foo");
        expect(page.selectors.b).to.equal("bar1");
        expect(page.selectors.c).to.equal("baz2");
      });

      it("merges selectors of n components", function() {
        var PageA = Page.extend({
              selectors: {
                a: 'foo',
                b: 'bar'
              }
            }),
            PageB = PageA.extend({
              selectors: {
                c: 'baz1'
              }
            }),
            compA = {
              selectors: {
                c: 'baz2'
              }
            },
            compB = {
              selectors: {
                a: 'foo3',
                d: 'fuu3'
              }
            },
            CompPage = PageB.with(compA, compB),
            page = new CompPage();

        expect(page.selectors.a).to.equal("foo3");
        expect(page.selectors.b).to.equal("bar");
        expect(page.selectors.c).to.equal("baz1");
        expect(page.selectors.d).to.equal("fuu3");
      });
    });
  });

  describe("Key", function() {
    it("returns escape sequence for key", function() {
      var page = context.Page.build();
      expect(page.Key.ENTER).to.equal("\uE007");
    });
  });

  describe("#uploadFile", function() {
    it("transfers a local file to the grid server", function() {
      var kittenPath = '/var/tmp/kitten.jpg',
          page = context.Page.build();

      request.get('http://placekitten.com/200/300', function(err, response, body) {
        var bodyBuf = new Buffer(body);

        fs.writeFileSync(kittenPath, body);

        page.uploadFile(kittenPath).then(function(fileLocation) {
          var contents = fs.readFileSync(fileLocation);

          fs.stat(fileLocation, function(err, stat) {
            expect(err).to.equal(null);
            expect(stat.isFile()).to.be.true;
            expect(bufferEqual(bodyBuf, contents)).to.be.true;
          });

          fs.unlinkSync(kittenPath);
        });
      });
    });

    it("transfers a buffer to the grid server", function() {
      var page = context.Page.build();

      createImage({}).then(function(buffer) {
        page.uploadFile(buffer).then(function(fileLocation) {
          var contents = fs.readFileSync(fileLocation);

          fs.stat(fileLocation, function(err, stat) {
            expect(err).to.equal(null);
            expect(stat.isFile()).to.be.true;
            expect(bufferEqual(contents, buffer)).to.be.true;
          });
        });
      });
    });
  });
  describe("#exists", function() {
    it("throws an error if given undefined", function() {
      expect(function() {
        context.Page.build()
        .exists(undefined)
        .then(function(present) {
          expect(present).to.be.true;
        });
      }).to.throw(Error);
    });

    it("returns true if the element is on the page", function() {
      context.Page.build()
      .exists("h1")
      .then(function(present) {
        expect(present).to.be.true;
      });
    });

    it("returns false if the element is not on the page", function() {
      context.Page.build()
      .exists("#i-dont-exist")
      .then(function(present) {
        expect(present).to.be.false;
      });
    });
  });

  describe("#find", function() {
    it("throws an error if given undefined", function() {
      expect(function() {
        context.Page.build()
        .find(undefined)
        .then(function(present) {
          expect(present).to.be.true;
        });
      }).to.throw(Error);
    });

    it("correctly finds an element given a selector string", function() {
      context.Page.build()
      .find("h1")
      .then(function(element) {
        expect(element).to.not.equal(null);
      });
    });

    it("correctly finds an element given a selector tuple", function() {
      context.Page.build()
      .find(["More information...", "link text"])
      .then(function(element) {
        expect(element).to.not.equal(null);
      });
    });

    it("returns a selector that can be chained", function() {
      context.Page.build()
      .find('#main-element')
      .find('p');
    });
  });

  describe("#findAll", function() {
    it("throws an error if given undefined", function() {
      expect(function() {
        context.Page.build()
        .findAll(undefined)
        .then(function(present) {
          expect(present).to.be["true"];
        });
      }).to.throw(Error);
    });

    it("resolves with all elements matching a query", function() {
      context.Page.build()
      .findAll("p")
      .then(function(elements) {
        expect(elements).to.have.length(2);
      });
    });
  });

  describe("#findInList", function() {
    describe("given a list of WebElements", function() {
      describe("and a sync filter", function() {
        it("returns an element that fulfills a content criteria", function() {
          var elementsSeen = 0,
              threshold = 1,
              page = context.Page.build();

          page.findAll("p").then(function(list) {
            page.findInList(list, function(element, cb) {
              if (elementsSeen === threshold) {
                cb(element);
                return;
              }

              elementsSeen++;
              cb();
            }).then(function(element) {
              element.getText().then(function(text) {
                expect(text).to.match(/More info/);
              });
            });
          });
        });
      });

      describe("and an async filter", function() {
        it("returns an element that fulfills a content criteria", function() {
          var page = context.Page.build();

          page.findAll("p").then(function(list) {
            page.findInList(list, function(element, cb) {
              element.getText().then(function(innerText) {
                if (!innerText.indexOf("This domain is")) {
                  cb(element);
                  return;
                }

                cb();
              });
            }).then(function(element) {
              element.getText().then(function(text) {
                expect(text).to.match(/This domain is/);
              });
            });
          });
        });

        it("returns an element that fulfills a structure criteria", function() {
          var page = context.Page.build();

          page.findAll("p").then(function(list) {
            page.findInList(list, function(element, cb) {
              element.exists('a').then(function(present) {
                var elem = present ? element : null;
                cb(elem);
              });
            })
            .then(function(element) {
              element.find('a');
            });
          });
        });
      });
    });
  });

  describe("#verifyContent", function() {
    describe("given a selector string", function() {
      it("tests if the content matches the given string", function() {
        context.Page.build()
        .verifyContent('h1', 'EXAMPLE DOMAIN');
      });
    });

    describe("given a webElement", function() {
      it("tests if the content matches the given string", function() {
        var page = context.Page.build();

        page.verifyContent(page.find('h1'), 'Example Domain');
      });
    });
  });

  describe("#runOnPage", function() {
    it("runs a function in the context of the session", function() {
      context.Page.build()
      .runOnPage(function() {
        return 5;
      }).then(function(returnVal) {
        expect(returnVal).to.equal(5);
      });
    });
  });

  describe("#whenDisplayed", function() {
    it("waits for an element to be displayed", function() {
      context.Page.build()
      .whenDisplayed('h1');
    });
  });

  describe("#whenNotDisplayed", function() {
    var page = Page.extend({
      pageRoot: "/",

      enterSearch: function() {
        this.find('a').click();
        return this;
      }
    });

    it("waits for an element to not be displayed", function() {
      context.Page.build()
      .switchTo(page)
      .enterSearch()
      .whenNotDisplayed('[href="http://www.iana.org/domains/example"]');
    });
  });

  describe("#onPage", function() {
    describe("for the simple case", function() {
      var page = Page.extend({
        pageRoot: "/"
      });

      it("verifies using the pathname", function() {
        context.Page.build()
        .switchTo(page)
        .onPage();
      });
    });

    describe("for the complex case", function() {
      var page = Page.extend({
        pageRoot: "/",

        onPage: function() {
          this._super([
            "h1",
            ["main-header", "id"],
            {
              selector: "p a",
              isDisplayed: true,
              getText: 'More information...'
            }
          ]);
          return this;
        }
      });

      it("verifies using test defined rules", function() {
        context.Page.build()
        .switchTo(page)
        .onPage();
      });
    });
  });

  describe("#awaits", function() {
    var page = Page.extend({
      passed: false,
      pageRoot: "/",

      waitForAsyncThing: function() {
        var self = this;

        this.awaits(function(promise) {
          setTimeout(function() {
            self.passed = true;
            promise.fulfill();
          }, 1000);
        })
        .then(function() {
          expect(self.passed).to.be.true;
        });
      }
    });

    it("waits for a promise to be resolved", function() {
      context.Page.build()
      .switchTo(page)
      .waitForAsyncThing();
    });
  });

  describe('#wait', function() {
    var page = Page.extend({
      passed: false,
      pageRoot: "/",
      waitForAsyncThing: function(promise) {
        this.wait(function() {
          return this.find("#hidden-element")
          .isDisplayed()
          .then(function(visible) {
            return !visible;
          });
        });

        return this.wait(function() {
          promise.fulfill();
          return true;
        });
      },

      waitForFailingThing: function() {
        return this.wait(function() {
          return this.find("#hidden-element")
          .isDisplayed()
          .then(function(visible) {
            return visible;
          });
        }, 500);
      }
    });

    it("waits until a given function returns/resolves to true", function() {
      var p = context.Page.build().switchTo(page);

      p.awaits(function(promise) {
        return p.waitForAsyncThing(promise);
      });
    });
    return it("throws when the timer is reached and the function hasn't resolved to true", function() {
      var p = context.Page.build().switchTo(page);

      expect(p.waitForFailingThing()).to.be.rejectedWith(Error);
    });
  });

  describe("#uploadImage", function() {
    it("creates an image and uploads", function() {
      context.Page.build()
      .uploadImage('')
      .then(function(filePath) {
        fs.stat(filePath, function(err, stat) {
          expect(err).to.equal(null);
          expect(stat.isFile()).to.be["true"];
        });
      });
    });
  });

  describe("#getTextAreaInput", function() {
    it("gets the text input", function() {
      var testString = 'hello world!',
          page = context.Page.build();

      page.find("#textarea")
      .sendKeys(testString);

      page.find("#textarea")
      .getTextAreaInput()
      .then(function(input) {
        expect(input).to.equal(testString);
      });
    });
  });

  describe.skip("debugger", function() {
    it("is so boss", function() {
      context.Page.build().debugger();
    });
  });
});
