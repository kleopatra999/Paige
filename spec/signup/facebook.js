var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
config = require("../config.json"),
Paige = require("../../paige"),
Page;

beforeEach(function() {
  Page = new Paige.SignUp.Index(config);
});

afterEach(function(done) {
  Page.done(done);
});

describe("Facebook Signup", function() {
  describe("flow", function() {
    it("is successful when Facebook user signs in", function() {
      Page.open()
          .clickSocialButton('facebookButton')
          .done();
    });
  });
});
