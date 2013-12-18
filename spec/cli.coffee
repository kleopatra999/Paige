{ Page } = require "../index"
bescribe = require "../bescribe"
expect = require('chai').expect

bescribe "CLI tests", (context, describe, it) ->
  describe "using given cli options", ->
    it "it can open google.com", ->
      context.Page.build()
      .open('www.google.com')
      .exists('#lga').then((exists) ->
        expect(exists).to.be.true;
      );
