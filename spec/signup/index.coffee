{ describe, it } = require "selenium-webdriver/testing"
config = require "../config.json"
Paige = require "../../paige"

describe "Signup", ->
  describe "flow", ->
    Page = new Paige.SignUp.Index(config)

    it "is successful when fully followed", ->
      Page.open()
          .enterForm("test@example.com", "password")
          .submitForm()
          .switchTo(Paige.SignUp.Info)
          .enterInformation(
            firstName: "Test",
            lastName: "McTester",
            username: "testmctester",
            location:
              country: "United States",
              state: "New York",
              city: "New York"
            dob:
              month: "October",
              day: "21",
              year: "1989"
          )
          .switchTo(Paige.SignUp.Find)
          .followFirstCreative()
          .finishFollowing()
          .switchTo(Paige.Home.Welcome)
          .verifyWarning()
          .redirectTo(Paige.Profile.Info)
#//          .visit( 'SePageNetworkProfileIndex' )
#//          .verifyProfileInfo()
#//          .verifyCreative(data.email)
#//          .deleteAccount()
          .done()
#  ._session.sleep(5000)
#Page.done();
#});
#});
#});
#
#/**
#public function signupCreative() {
#list( $email, $username, $userid ) = $this->_mockUserData();
#
#self::$_page->open( 'SePageNetworkSignupIndex' )
#->enterForm( $email )
#->submitForm()
#->enterInformation( $username )
#->followFirstCreative()
#->finishFollowing()
#->verifyWarning()
#->visit( 'SePageNetworkProfileIndex' )
#->verifyProfileInfo()
#->verifyCreative( $email )
#->deleteAccount();
#
#return $email;
#} // signupCreative
#*/
