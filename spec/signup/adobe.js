var config = require("../config.json"),
    Paige = require("../../paige"),
    bescribe = Paige.Helpers.bescribe;

bescribe("Adobe Signup", config, function(context, describe, it) {
  describe("flow", function() {
    it("is successful when Adobe CCM user signs in", function() {
      context.Page.build()
      .redirectTo(Paige.SignUp.Index)
      .clickSocialButton('adobeButton');
    });
  });
});
