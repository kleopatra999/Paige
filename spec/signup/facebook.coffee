{ describe, it } = require "selenium-webdriver/testing"
config = require "../config.json"
Paige = require "../../paige"

describe "Facebook Signup", ->
  describe "flow", ->
    Page = new Paige.SignUp.Index( config )

    it "is successful when Facebook user signs in", ->
      Page.open()
          .clickSocialButton( 'facebookButton' )
          .done()
