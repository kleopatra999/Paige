var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,

config = require("../config.json"),
Paige = require("../../paige"),
Page;

beforeEach(function() {
  Page = new Paige.Home.Welcome(config);
});

afterEach(function(done) {
  Page.done(done);
});

describe("Responsive Nav", function() {
  describe("ZE BURGER", function() {
    it("is successful when burger is visible @ 1025px, invisible @ 1024px", function(done) {
      Page.open()
          .eatZeBurger()
          .summonZeBurger();
    });
  });
});
