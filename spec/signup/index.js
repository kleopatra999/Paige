var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    describe = test.describe,
    it = test.it,
    config = require('../config.json'),
    Paige = require('../../paige');

describe('Signup', function () {
  describe('#index', function() {
    var Page = new Paige.SignUp.Index(config);

    it('works for a user', function () {
      Page.open();
      Page.enterForm('test@example.com', 'password');
      Page.submitForm()
      //Page.enterInformation(data.username)
      //Page.followFirstCreative()
      //Page.finishFollowing()
      //Page.verifyWarning()
      //Page.visit( 'SePageNetworkProfileIndex' )
      //Page.verifyProfileInfo()
      //Page.verifyCreative(data.email)
      //Page.deleteAccount()
      Page._session.sleep(4000);
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
