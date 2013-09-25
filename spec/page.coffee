Page = require "../lib/page"
config = require "./config.json"
bescribe = require "../bescribe"
{expect} = require "chai"

bescribe "Base Page Object", config, (context, describe, it) ->
  describe "#runOnPage", ->
    it "runs a function in the context of the session", ->
      context.Page.build()
      .runOnPage(-> 5)
      .then((returnVal) ->
        expect(returnVal).to.equal(5)
      )
