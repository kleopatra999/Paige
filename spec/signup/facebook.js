var config = require("../config.json"),
    Paige = require("../../paige"),
    bescribe = Paige.Helpers.bescribe;

bescribe("Facebook Signup", config, function(context, describe, it) {
  describe("flow", function() {
    it("is successful when Facebook user signs in", function() {
      context.Page.build()
      .redirectTo(Paige.SignUp.Index)
      .clickSocialButton('facebookButton');
    });
  });
});
