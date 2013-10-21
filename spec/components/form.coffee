Page = require "../../lib/page"
Form = require "../../lib/components/form"
bescribe = require "../../bescribe"
{expect} = require "chai"

config =
  address: "http://www.google.com"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe.only "Form Component", config, (context, describe, it) ->
  describe "given inputs and data", ->
    it "fills in a form", ->
      page = Page.extend(
        selectors:
          inputs:
            search: "[name=q]"
            continue: "[name=btnG]"
      ).with(Form)

      context.Page.build()
      .switchTo(page)
      .enterInformation(
        search: "Behance"
      )
      .submitForm()
