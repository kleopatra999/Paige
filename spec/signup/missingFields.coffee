{ describe, it } = require "selenium-webdriver/testing"
config = require "../config.json"
Paige  = require "../../paige"
Page   = {}

beforeEach ->
  Page = new Paige.SignUp.Index config

afterEach (done) ->
  Page.done done

describe "Signup Errors", ->

  describe "No email nor password", ->
    it "is successful when email & password errors appear", (done) ->
      Page.open()
          .submitForm()
          .errorsVisible(
            emailError: true,
            passwordError: true,
            captchaError: false
          )


  describe "No password, email given", ->
    it "is successful when only the password error appears", (done) ->
      Page.open()
          .enterEmail("blahblah@devSomething.be.lan")
          .submitForm()
          .errorsVisible(
            emailError: false,
            passwordError: true,
            captchaError: false
          )

  describe "Only password given", ->
    it "is successful when email & captcha errors appear", (done) ->
      Page.open()
          .enterPassword("password")
          .submitForm()
          .errorsVisible(
            emailError: true,
            passwordError: false,
            captchaError: true
          )
