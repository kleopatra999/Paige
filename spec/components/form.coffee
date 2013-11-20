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

bescribe "Form Component", config, (context, describe, it) ->
  describe "given inputs and data", ->
    it "fills in a form", ->
      page = Page.extend(
        forms:
          search:
            context: "#gbqf"
            submit: "[name=btnG]"
            inputs:
              search: "[name=q]"
      ).with(Form)

      context.Page.build()
      .switchTo(page)
      .enterInformation("search",
        search: "Behance"
      )
      .submitForm("search")
