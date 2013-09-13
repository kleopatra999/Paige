var config = require("../config.json"),
    Paige = require("../../paige"),
    bescribe = Paige.Helpers.bescribe;

bescribe.only("Signup Errors", config, function(context, describe, it) {
  describe("No email nor password", function() {
    it("is successful when email & password errors appear", function() {
      context.Page.build()
      .redirectTo(Paige.SignUp.Index)
      .submitForm()
      .errorsVisible({
         emailError: true,
         passwordError: true,
         captchaError: false
       });
    });
  });

  describe("No password, email given", function() {
    it("is successful when only the password error appears", function() {
      context.Page.build()
      .redirectTo(Paige.SignUp.Index)
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
    it("is successful when email & captcha errors appear", function() {
      context.Page.build()
      .redirectTo(Paige.SignUp.Index)
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
