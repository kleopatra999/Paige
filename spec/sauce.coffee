webdriver = require "selenium-webdriver"
fs = require "fs"
sauce = JSON.parse(fs.readFileSync("./sauce-config.json"))
{describe, it} = require "selenium-webdriver/testing"

config =
  address: "http://localhost:8282"
  webdriver:
    address: "http://ondemand.saucelabs.com/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"
      javascriptEnabled: true
      username: sauce.username
      accessKey: sauce.accessKey

describe.only "Sauce Labs", ->
  it "can connect", ->
    session = new webdriver.Builder()
      .usingServer(config.webdriver.address)
      .withCapabilities(config.webdriver.config)
      .build()

    session.get("http://www.google.com").then(()->
      session.quit()
    )
