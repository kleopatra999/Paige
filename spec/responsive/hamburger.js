var config = require("../config.json"),
    Paige = require("../../paige"),
    bescribe = Paige.Helpers.bescribe;

bescribe("Responsive Nav", config, function(context, describe, it) {
  describe("ZE BURGER", function() {
    it("is successful when burger is visible @ 1025px, invisible @ 1024px", function(done) {
      context.Page.build()
      .redirectTo(Paige.Home.Welcome)
      .eatZeBurger()
      .summonZeBurger();
    });
  });
});
