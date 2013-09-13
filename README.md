# Paige

Paige is a collection of Page Objects for testing. yup.

In `spec` you'll need a `config.json`. Something like:

````
{
  "test_address": "http://net.devXX.be.lan",

  "webdriver_address": "http://127.0.0.1:4444/wd/hub",
  "webdriver_config": {
    "platform": "MAC",
    "browserName": "firefox"
  },
  "facebook": {
    "ci_address": "http://net.cloudkins01.kinshance.com",
    "secret": "magic",
    "appId": "moar_magiks"
  }
}
````
