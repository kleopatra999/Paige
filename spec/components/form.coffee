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
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          textForm:
            context: "#text-form"
            submit: ".submit"
            inputs:
              term: "#term"
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "textForm",
        term: "Behance"
      .find "#term"
      .getAttribute "value"
      .then (value) ->
        expect(value).to.equal "Behance"

  describe "#fillInSelect", ->
    it "selects the option with the specified value", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          selectForm:
            context: "#select-form"
            submit: ".submit"
            inputs:
              select:
                selector: "#select"
                type: 'select'
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "selectForm",
        select: "2"
      .find "#select"
      .getAttribute "value"
      .then (value) ->
        expect(value).to.equal "2"

  describe "#fillInRadio", ->
    it "clicks with the specified value", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          radioForm:
            context: "#radio-form"
            submit: ".submit"
            inputs:
              rGroup:
                selector: "[name=r-group]"
                type: 'radio'
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "radioForm",
        rGroup: 2
      .runOnPage ->
        document.querySelector("#radio-2").checked
      .then (checked) ->
        expect(checked).to.be.true
