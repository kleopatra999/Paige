Page = require "../lib/page"
bescribe = require "../bescribe"
{expect} = require "chai"

config =
  address: "http://www.google.com"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe "Base Page Object", config, (context, describe, it) ->
  describe "#find", ->
    it "correctly finds element given a selector string", ->
      context.Page.build()
      .find("[name=q]")
      .then((element) ->
        expect(element).to.not.equal(null)
      )

    it "correctly finds element given a selector tuple", ->
      context.Page.build()
      .find(["q", "name"])
      .then((element) ->
        expect(element).to.not.equal(null)
      )

  describe "#findAll", ->
    it "resolves with all elements matching a query", ->
      context.Page.build()
      .findAll("#footer a")
      .then((elements) ->
        expect(elements).to.have.length(10)
      )

  describe "#runOnPage", ->
    it "runs a function in the context of the session", ->
      context.Page.build()
      .runOnPage(-> 5)
      .then((returnVal) ->
        expect(returnVal).to.equal(5)
      )

  describe "#whenDisplayed", ->
    it "waits for an element to be displayed"
    it "gives a sane error message if the element never appears", ->
      context.Page.build()
      .whenDisplayed('#i-dont-exist')

  describe "#onPage", ->
    describe "for the simple case", ->
      page = Page.extend
        pageRoot: "/"

      it "verifies the integrity of the current page using the pathname", ->
        context.Page.build()
        .switchTo(page)
        .onPage()

    describe "for the complex case", ->
      page = Page.extend
        pageRoot: "/"
        onPage: ->
          @_super [
            {selector: "input[name=q]", isDisplayed: true}
          ]

      it "verifies the integrity of the current page using test defined rules", ->
        context.Page.build()
        .switchTo(page)
        .onPage()
        

