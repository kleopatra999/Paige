Component = if process.env.LCOV then require "../lib-cov/component" else require "../lib/component"
bescribe = require "../bescribe"
{expect} = require "chai"

config =
  address: "http://www.example.com"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

describe.only "Base Component", ->
  it 'is extensible', ->
    Sub = Component.extend()

    expect(new Sub()).to.be.instanceof(Sub)
    expect(new Sub()).to.be.instanceof(Component)

  describe "#with", ->
    it "is a static function", ->
      expect(Component).itself.to.respondTo('with')

    it "merges for simple components", ->
      Form = Component.extend
        selectors:
          textInput: '#some-text-input'
          button: '#some-button'
        enterInformation: ->
        submitForm: ->
      FormPage = Component.with Form
      formPageInst = new FormPage()

      expect(formPageInst).to.respondTo('enterInformation')
      expect(formPageInst.selectors).to.have.keys(['textInput', 'button'])
