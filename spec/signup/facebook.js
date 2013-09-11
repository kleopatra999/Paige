var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
config = require("../config.json"),
Paige = require("../../paige");

describe("Facebook Signup", function() {
  describe("flow", function() {
    var Page = new Paige.SignUp.Index(config);
    it("is successful when Facebook user signs in", function() {
      Page.open()
          .clickSocialButton('facebookButton')
          .done();
    });
  });
});
