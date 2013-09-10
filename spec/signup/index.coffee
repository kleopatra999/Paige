{ describe, it } = require "selenium-webdriver/testing"
config = require "../config.json"
Paige = require "../../paige"
Page   = {}
data = Paige.Helpers.data

beforeEach ->
  Page = new Paige.SignUp.Index config

afterEach (done) ->
  Page.done done

describe "Signup", ->
  describe "flow", ->

    it "is successful when fully followed", (done) ->
      Page.resizeWindowTo(
            width: 1280
            height: 1024
          )
          .open()
          .enterForm( data.email(), "password")
          .submitForm()
          .switchTo(Paige.SignUp.Info)
          .enterInformation(
            firstName: data.firstName(),
            lastName: data.lastName(),
            username: data.username(),
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
          .verifyProfileInfo(
            location:
              country: "USA",
              state: "NY",
              city: "New York"
          )
