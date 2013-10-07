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
  describe "#findAll", ->
    it "resolves with all elements matching a query", ->
      context.Page.build()
      .findAll("#footer a")
      .then((elements) ->
        expect(elements).to.have.length(5)
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
    it.only "verifies the integrity of the current page", ->
      page = Page.extend(
        pageRoot: "/"
      )

      context.Page.build()
      .switchTo(page)
      .onPage()

