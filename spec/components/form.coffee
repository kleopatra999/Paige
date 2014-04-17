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
      .find "#select [value='2']"
      .isSelected()
      .then (selected) ->
        expect(selected).to.be.true

  describe "#fillInRadio", ->
    it "clicks the radio with the specified value", ->
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

  describe "#fillInCheckbox", ->
    it "clicks the checkbox with the specified value", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          checkboxForm:
            context: "#checkbox-form"
            submit: ".submit"
            inputs:
              checkbox3:
                selector: "#checkbox-3"
                type: 'checkbox'
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "checkboxForm",
        checkbox3: 3
      .runOnPage ->
        document.querySelector("#checkbox-3").checked
      .then (checked) ->
        expect(checked).to.be.true

  describe "#submitForm", ->
    it "submits the form using the registerd submit button", ->
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
      .submitForm("textForm")
      .whenDisplayed ".success"
