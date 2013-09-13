var _ref = require("selenium-webdriver/testing"),
describe = _ref.describe,
it = _ref.it,
extend = require("nbd").util.extend,
config = extend( {}, require("../config.json") ),
Paige = require("../../paige"),
Page = {},
data = Paige.Helpers.data,
originalAddress = config.test_address,
ccnConfig = require("../../config/ccn.json");

beforeEach(function() {
  Page = new Paige.SignUp.Index(config);
});


afterEach(function(done) {
  Page.done(done);
});

function setCcn( key ) {
  config.test_address = originalAddress.replace( '//', '//' + key + '.' );
}

Object.keys( ccnConfig ).forEach( function( key ) {

  // if ( key != 'studentshow' ) {
    // return;
  // }

  describe( key + " Signup", function() {
    
    var username = data.username(),
        password = "password",
        ccnData = ( ccnConfig[ key ].signup && ccnConfig[ key ].signup.data )
                  ? ccnConfig[ key ].signup.data
                  : {};

    describe("basic", function() {
      it("is successful when not a behance member", function(done) {
      
        setCcn( key );

        Page.resizeWindowTo({
          width: 1280,
          height: 1024
        })
        .redirectTo( Paige.SignUp.Challenge )
        .selectNotMember()
        .switchTo( Paige.SignUp.Index )
        .enterForm(data.email(), password)
        .submitForm()
        .switchTo(Paige.SignUp.Info.with( require( "../../lib/ccn/signup/" + key ) ) )
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
        .submitForm()
        .enterCcnInfo( ccnData )
        .submitCcnForm()
        .switchTo(Paige.Profile.Info)
        .goToUsername( username )
        .verifyWarning();
      });
      
      it("is successful when a behance member", function(done) {
      
        setCcn( key );

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
        .verifyWarning();

      });

    });

  });
  
});

