{ describe, it } = require "selenium-webdriver/testing"
config = require "../config.json"
Paige = require "../../paige"

describe "Signup Errors", ->
  describe "flow", ->
    Page = new Paige.SignUp.Index(config)

    it "is successful when fully followed", ->
      Page.open()

          # nothing has been entered
          .submitForm()
          .emailErrorVisible( true )
          .passwordErrorVisible( true )

          # only email
          .enterForm("blahblah@devSomething.be.lan", "")
          .submitForm()
          .emailErrorVisible( false )
          .passwordErrorVisible( true )
          .clearForm()

          # only password
          .enterForm("", "password")
          .submitForm()
          .emailErrorVisible( true )
          .passwordErrorVisible( false )

         # no ID ...
         #.captchaErrorVisible( false )
          .done()

