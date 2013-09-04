var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    describe = test.describe,
    it = test.it,
    config = require('../config.json'),
    Paige = require('../../paige');

describe('Signup', function () {
  describe('flow', function() {
    var Page = new Paige.SignUp.Index(config);

    it('is successful when fully followed', function () {
      Page.open()
          .enterForm('test@example.com', 'password')
          .submitForm()
          .switchTo(Paige.SignUp.Info)
          .enterInformation({
            firstName: 'Test',
            lastName: 'McTester',
            username: 'testmctester',
            location: {
              country: 'United States',
              state: 'New York',
              city: 'New York'
            },
            dob: {
              month: 'October',
              day: '21',
              year: '1989'
            }
          })
//          .followFirstCreative()
//          .finishFollowing()
//          .verifyWarning()
//          .visit( 'SePageNetworkProfileIndex' )
//          .verifyProfileInfo()
//          .verifyCreative(data.email)
//          .deleteAccount()
          ._session.sleep(5000)
      Page.done();
    });
  });
});

/**
public function signupCreative() {
  list( $email, $username, $userid ) = $this->_mockUserData();

  self::$_page->open( 'SePageNetworkSignupIndex' )
              ->enterForm( $email )
              ->submitForm()
              ->enterInformation( $username )
              ->followFirstCreative()
              ->finishFollowing()
              ->verifyWarning()
              ->visit( 'SePageNetworkProfileIndex' )
              ->verifyProfileInfo()
              ->verifyCreative( $email )
              ->deleteAccount();

  return $email;
} // signupCreative
*/
