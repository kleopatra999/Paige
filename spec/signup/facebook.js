var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
config = require("../config.json"),
Paige = require("../../paige"),
facebook = Paige.Helpers.facebook,
data = Paige.Helpers.data,
facebookUser,
Page;

beforeEach(function(done) {
  // must redirect to a specific CI app server
  // as secret & app_id for facebook API is stupid
  config.test_address = config.facebook.ci_address;
  Page = new Paige.SignUp.Index(config);

  // wait for test user to be created
  facebook.createUser(config.facebook.appId, config.facebook.secret, function(user){
    facebookUser = user;
    done();
  });
});

afterEach(function(done) {
  Page.done(done);
  // wait for user to get deleted
  facebook.deleteUser(facebookUser, function(response) {
    done();
  });
});

describe("Facebook Signup", function() {
  describe("flow", function() {
    it("is successful when Facebook user signs in", function() {
      Page.resizeWindowTo({
            width: 1280,
            height: 1024
          })
          .open(facebookUser.login_url)
          .facebookSignin(facebookUser.email, facebookUser.password)
          .open()
          .clickSocialButton("facebookButton")
          .switchTo(Paige.SignUp.Info)
          .enterPassword("password")
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
          .verifyFacebookSynced()
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
