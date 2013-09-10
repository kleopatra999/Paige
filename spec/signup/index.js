var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
config = require("../config.json"),
Paige = require("../../paige"),
Page = {},
data = Paige.Helpers.data;

beforeEach(function() {
  Page = new Paige.SignUp.Index(config);
});


afterEach(function(done) {
  Page.done(done);
});

describe("Signup", function() {
  describe("basic", function() {
    it("is successful when using find dialog", function(done) {
      Page.resizeWindowTo({
        width: 1280,
        height: 1024
      })
      .redirectTo( Paige.SignUp.Index )
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
  
  describe("expedited", function() {
    it("is successful when following from project", function(done) {
    
      Page.resizeWindowTo({
        width: 1280,
        height: 1024
      })
      .redirectTo( Paige.Project.Index )
      .openFirstProject()
      .follow()
      .switchTo( Paige.SignUp.Index )
      .focusExpedited()
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
        .switchOffFrame()
      .switchTo( Paige.Project.Index )
      .followed();
        
      
    });
  });
});
