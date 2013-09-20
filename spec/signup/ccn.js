var extend = require("nbd").util.extend,
    config = extend( {}, require("../config.json") ),
    Paige = require("../../paige"),
    bescribe = Paige.Helpers.bescribe,
    data = Paige.Helpers.data,
    originalAddress = config.test_address,
    ccnConfig = require("../../config/ccn.json");

function setCcn( key ) {
  config.test_address = originalAddress.replace( '//', '//' + key + '.' );
}

Object.keys( ccnConfig ).forEach( function( key ) {
  if ( key != 'nda' && key != 'wacom' ) {
    return;
  }

  bescribe( key + " CCN Signup", config, function(context, describe, it) {

    var authenticate, ccnsignup, integratedAuthenticate, integratedIndex, integratedInfo, integratedChallenge,
        username = data.username(),
        password = "password",
        email = data.email(),
        ccnData = ( ccnConfig[ key ].signup && ccnConfig[ key ].signup.data ) ?
                  ccnConfig[ key ].signup.data :
                  {};

    ccnData.email = email;
    ccnData.username = username;
    ccnData.password = password;

    try {
      require.resolve( "../../lib/ccn/signup/authenticate/" + key );
      authenticate = require( "../../lib/ccn/signup/authenticate/" + key );
    }
    catch(e) {
      authenticate = {};
    }

    try {
      require.resolve( "../../lib/ccn/signup/" + key );
      ccnsignup = require( "../../lib/ccn/signup/" + key );
    }
    catch(e) {
      ccnsignup = {};
    }
    
    integratedAuthenticate = Paige.Ccn.Authenticate.extend().with(authenticate),
    integratedIndex = Paige.SignUp.Index.extend().with(Paige.Ccn.SignUp, ccnsignup),
    integratedInfo = Paige.SignUp.Info.extend().with(Paige.Ccn.SignUp, ccnsignup),
    integratedChallenge = Paige.SignUp.Challenge.extend().with(Paige.Ccn.SignUp, ccnsignup);

    describe("basic", function() {
            
      it("is successful when not a behance member", function(done) {
        setCcn( key );

        context.Page.build()
        .resizeWindowTo({
          width: 1280,
          height: 1024
        })
        [ authenticate ? 'redirectTo' : 'switchTo' ](integratedAuthenticate)
        .submitAuthentication(ccnData)
        .submitFormCheck()
        [ authenticate ? 'switchTo' : 'redirectTo' ](integratedChallenge)
        .selectNotMember()
        .switchTo(integratedIndex)
        .enterForm(email, password)
        .submitForm()
        .switchTo(integratedInfo)
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
      
      // TODO: Fix
      return;
      
      it("is successful when part of CCN", function(done) {

        setCcn( key );

        context.Page.build()
        .resizeWindowTo({
          width: 1280,
          height: 1024
        })
        [ authenticate ? 'redirectTo' : 'switchTo' ](integratedAuthenticate)
        .submitAuthentication(ccnData)
        .submitFormCheck()
        [ authenticate ? 'switchTo' : 'redirectTo' ](integratedChallenge)
        .selectMember()
        .switchTo(integratedIndex)
        //TODO: Clean this up, should only take one argument
        .enterInformation({
          password: password,
          username: email,
          email: email
        })
        .submitForm()
        .verifyWarning();
      });

      // TODO: Leave CCN flow to actually test success when member, but not part of CCN

    });
  });

});

