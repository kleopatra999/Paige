var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
config = require("../config.json"),
Paige = require("../../paige"),
Page = {};

beforeEach(function() {
  return Page = new Paige.SignUp.Index(config);
});

afterEach(function(done) {
  return Page.done(done);
});

describe("Signup Errors", function() {

  describe("No email nor password", function() {
    it("is successful when email & password errors appear", function(done) {
      Page.open()
          .submitForm()
          .errorsVisible({
             emailError: true,
             passwordError: true,
             captchaError: false
           });
    });
  });

  describe("No password, email given", function() {
    it("is successful when only the password error appears", function(done) {
      Page.open()
          .enterEmail("blahblah@devSomething.be.lan")
          .submitForm()
          .errorsVisible({
            emailError: false,
            passwordError: true,
            captchaError: false
          });
    });
  });

  describe("Only password given", function() {
    it("is successful when email & captcha errors appear", function(done) {
      Page.open()
          .enterPassword("password")
          .submitForm()
          .errorsVisible({
            emailError: true,
            passwordError: false,
            captchaError: true
          });
    });
  });

});
