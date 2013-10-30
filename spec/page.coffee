Page = if process.env.LCOV then require "../lib-cov/page" else require "../lib/page"
bescribe = require "../bescribe"
{expect} = require "chai"

config =
  address: "http://www.example.com"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe "Base Page Object", config, (context, describe, it) ->
  describe "Key", ->
    it "returns escape sequence for key", ->
      page = context.Page.build()

      expect(page.Key.ENTER).to.equal "\uE007"

  describe "#exists", ->
    it "returns true if the element is on the page", ->
      context.Page.build()
      .exists("h1")
      .then((present) ->
        expect(present).to.be.true
      )

    it "returns false if the element is not on the page", ->
      context.Page.build()
      .exists("#i-dont-exist")
      .then((present) ->
        expect(present).to.be.false
      )

  describe "#find", ->
    it "correctly finds an element given a selector string", ->
      context.Page.build()
      .find("h1")
      .then((element) ->
        expect(element).to.not.equal(null)
      )

    it "correctly finds an element given a selector tuple", ->
      context.Page.build()
      .find(["More information...", "link text"])
      .then((element) ->
        expect(element).to.not.equal(null)
      )

    it "returns a selector that can be chained", ->
      context.Page.build()
      .find('p:last-child')
      .find('a')

  describe "#findAll", ->
    it "resolves with all elements matching a query", ->
      context.Page.build()
      .findAll("p")
      .then((elements) ->
        expect(elements).to.have.length(2)
      )

  describe "#findInList", ->
    describe "given a list of WebElements", ->
      describe "and a sync filter", ->
        it "returns an element that fulfills a content criteria", ->
          elementsSeen = 0
          threshold = 1
          page = context.Page.build()

          page
          .findAll("p")
          .then((list) ->
            page.findInList(list, (element, cb) ->
              if elementsSeen is threshold
                cb element
                return

              elementsSeen++
              cb()
            )
            .then((element) ->
              element.getText().then((text) ->
                expect(text).to.match(/More info/)
              )
            )
          )

      describe "and an async filter", ->
        it "returns an element that fulfills a content criteria", ->
          page = context.Page.build()

          page
          .findAll("p")
          .then((list) ->
            page.findInList(list, (element, cb) ->
              element.getText().then((innerText) ->
                if !innerText.indexOf "This domain is"
                  cb element
                  return

                cb()
              )
            )
            .then((element) ->
              element.getText().then((text) ->
                expect(text).to.match(/This domain is/)
              )
            )
          )

        it "returns an element that fulfills a structure criteria", ->
          page = context.Page.build()

          page
          .findAll("p")
          .then((list) ->
            page.findInList(list, (element, cb) ->
              element.exists('a').then((present) ->
                elem = if present then element else null
                cb elem
              )
            )
            .then((element) ->
              element.find('a')
            )
          )

  describe "#verifyContent", ->
    it "tests the content of a given element against a given string", ->
      context.Page.build()
      .verifyContent('h1', 'Example Domain')

  describe "#runOnPage", ->
    it "runs a function in the context of the session", ->
      context.Page.build()
      .runOnPage(-> 5)
      .then((returnVal) ->
        expect(returnVal).to.equal(5)
      )

  describe "#whenDisplayed", ->
    it "waits for an element to be displayed", ->
      context.Page.build()
      .whenDisplayed('h1')

  describe "#whenNotDisplayed", ->
    page = Page.extend
      pageRoot: "/"
      enterSearch: ->
        @find('a').click()
        @

    it "waits for an element to not be displayed", ->
      context.Page.build()
      .switchTo(page)
      .enterSearch()
      .whenNotDisplayed('[href="http://www.iana.org/domains/example"]')

  describe "#onPage", ->
    describe "for the simple case", ->
      page = Page.extend
        pageRoot: "/"

      it "verifies using the pathname", ->
        context.Page.build()
        .switchTo(page)
        .onPage()

    describe "for the complex case", ->
      page = Page.extend
        pageRoot: "/"
        onPage: ->
          @_super [
            "h1"
            {selector: "p a", isDisplayed: true, getText: 'More information...'},
          ]
          @

      it "verifies using test defined rules", ->
        context.Page.build()
        .switchTo(page)
        .onPage()

  describe "#hover", ->
    it "function executes without error when a css selector is provided", ->
      context.Page.build()
      .hover('a')

  describe "#clickable", ->
    it "returns true when element is clickable", ->
      context.Page.build()
      .find("a").clickable()
      .then((clickable) ->
        expect(clickable).to.be.true
      )

    it "returns false when element is not clickable", ->
      page = context.Page.build()

      page.runOnPage("document.querySelector('a').setAttribute('disabled', 'disabled')")
      .then(->
        page.find("a").clickable()
        .then((clickable) ->
          expect(clickable).to.be.false
        )
      )
