bescribe = require "../bescribe"
{expect} = require "chai"

config =
  address: "http://www.example.com"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe "WebElement", config, (context, describe, it) ->
  describe "#getXPath", ->
    it "resolves with the XPath for the given element", ->
      context.Page.build()
      .find('a')
      .getXPath()
      .then((xpath) ->
        expect(xpath).to.equal("/html/body/div/p[2]/a")
      )

  describe "#getCssProperties", ->
    it "resolves with the computed styles for the given element", ->
      context.Page.build()
      .find('a')
      .getCssProperties()
      .then((styles) ->
        expect(styles.width).to.equal("auto")
      )
