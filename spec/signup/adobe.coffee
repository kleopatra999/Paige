{ describe, it } = require "selenium-webdriver/testing"
config = require "../config.json"
Paige = require "../../paige"

describe "Adobe Signup", ->
  describe "flow", ->
    Page = new Paige.SignUp.Index( config )

    it "is successful when Adobe CCM user signs in", ->
      Page.open()
          .clickSocialButton( 'adobeButton' )
          .done()
