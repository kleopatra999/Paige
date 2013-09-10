{ describe, it } = require "selenium-webdriver/testing"
config = require "../config.json"
Paige  = require "../../paige"
Page   = {}

beforeEach ->
  Page = new Paige.Home.Welcome config

afterEach (done) ->
  Page.done done

describe "Responsive Nav", ->
  describe "ZE BURGER", ->
    it "is successful when burger is visible @ 1025px, invisible @ 1024px", (done) ->
      Page.open()
          .eatZeBurger()
          .summonZeBurger()
