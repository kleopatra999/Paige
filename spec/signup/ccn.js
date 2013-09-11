var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
extend = require("nbd").util.extend,
config = extend( {}, require("../config.json") ),
Paige = require("../../paige"),
Page = {},
data = Paige.Helpers.data,
original_address = config.test_address;

beforeEach(function() {
  Page = new Paige.SignUp.Index(config);
});


afterEach(function(done) {
  Page.done(done);
});

describe("Adweek Signup", function() {

  config.test_address = original_address.replace( '//', '//adweek.' );

  var username = data.username(),
      password = "password";

  describe("basic", function() {
    it("is successful when not a behance member", function(done) {

      Page.resizeWindowTo({
        width: 1280,
        height: 1024
      })
      .redirectTo( Paige.SignUp.Challenge )
      .selectNotMember()
      .switchTo( Paige.SignUp.Index )
      .enterForm(data.email(), password)
      .submitForm()
      .switchTo(Paige.SignUp.Info)
      .enterInformation({
        firstName: data.firstName(),
        lastName: data.lastName(),
        username: username,
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
      .switchTo(Paige.Profile.Info)
      .goToUsername( username )
      .verifyWarning();
    });

    it("is successful when a behance member", function(done) {

      Page.resizeWindowTo({
        width: 1280,
        height: 1024
      })
      .redirectTo( Paige.SignUp.Challenge )
      .selectMember()
      .switchTo( Paige.Login.Index )
      .enterInformation({
        password: password,
        username: username
      })
      .submitForm()
      .switchTo( Paige.Dashboard.Index )
      .isSelectedInNav();

    });

  });


});
