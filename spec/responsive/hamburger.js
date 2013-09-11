var Page,
    Paige,
    config,
    describe,
    it,
    _ref;

_ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it;
config = require("../config.json");
Paige = require("../../paige");
Page = {};

beforeEach(function() {
  return Page = new Paige.Home.Welcome(config);
});

afterEach(function(done) {
  return Page.done(done);
});

describe("Responsive Nav", function() {
  return describe("ZE BURGER", function() {
    return it("is successful when burger is visible @ 1025px, invisible @ 1024px", function(done) {
      return Page.open().eatZeBurger().summonZeBurger();
    });
  });
});
