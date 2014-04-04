Page = require "../../lib/page"
Form = require "../../lib/components/form"
bescribe = require "../../bescribe"
{expect} = require "chai"

config =
  address: "http://localhost:8282"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe "Form Component", config, (context, describe, it) ->
  describe "#fillInText", ->
    it "enters data into the text field", ->
      page = Page.extend(
        pageRoot: '/form.html'
        forms:
          search:
            context: "#test-form"
            submit: ".submit"
            inputs:
              term: "#term"
      ).with(Form)

      context.Page.build()
      .redirectTo(page)
      .enterInformation("search",
        search: "Behance"
      )
      .submitForm("search")
      .whenDisplayed(".success")
