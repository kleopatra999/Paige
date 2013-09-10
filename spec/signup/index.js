var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
config = require("../config.json"),
Paige = require("../../paige"),
Page,
data = Paige.Helpers.data;

afterEach(function(done) {
  Page.done(done);
});

describe("Signup", function() {
  describe("flow", function() {
    Page = new Paige.SignUp.Index(config);
    it("is successful when fully followed", function(done) {
      Page.resizeWindowTo({
        width: 1280,
        height: 1024
      })
      .open()
      .enterForm(data.email(), "password")
      .submitForm()
      .switchTo(Paige.SignUp.Info)
      .enterInformation({
        firstName: data.firstName(),
        lastName: data.lastName(),
        username: data.username(),
        location: {
          country: "United States",
          state: "New York",
          city: "New York"
        },
        dob: {
          month: "October",
          day: "21",
          year: "1989"
        }
      })
      .switchTo(Paige.SignUp.Find)
      .followFirstCreative()
      .finishFollowing()
      .switchTo(Paige.Home.Welcome)
      .verifyWarning()
      .redirectTo(Paige.Profile.Info)
      .verifyProfileInfo({
        location: {
          country: "USA",
          state: "NY",
          city: "New York"
        }
      });
    });
  });
});
