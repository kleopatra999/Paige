---
layout: guide
title: About | Paige
header: About
---
# Tests

Tests are the primary way Paige interactions happen.

## Directory Structure

The most common structure that we have found to be useful is to split specification test and page objects into two separate directories.

```
- app
- lib
- tests
  - feature
    - lib            <-- Page Objects Live here
      - signup
        - index.js
      - login
        - index.js
      - discovery
        - project.js
        - wip.js
        - user.js
      - ...etc
    - spec           <-- Specification Tests Live here
      - signup
        - happy_path.js
        - sad_path.js
      - login
        - success.js
        - client_errors.js
        - server_errors.js
      - ...etc
```

This structure allows us to keep our tests (which in most cases will span multiple page objects) completely isolated from our page objects. This makes things more modular and has lead to a much easier maintainability story.

## Test Structure

### `bescribe`/`describe`/`it`
Use these to divide tests into a hierarchy of logical chunks. An `it` is an individual test. Group `it`'s together into a logical group under a `describe`, which are further grouped under a `bescribe`. 

<strong>Example: </strong>
```
var bescribe = require('be-paige/bescribe');
var MyTestPage = require('../lib/my_test_page/index.js');
var config = {
  address: 'http://localhost:8282',
  webdriver: {
    address: 'http://localhost:4444/wd/hub',
    config: {
      platform: 'MAC',
      browserName: 'firefox'
    }
  }
};

bescribe("Some description", config, function(context, describe, it) {
  describe("My Test Page", function() {
    it("has elements on it's page", function() {
      context.Page.build()
      .redirectTo(MyTestPage)
      .clickOnUserButton()
      .checkThatProfileIsShown();
    });
   
    // More it() functions can go here
  });
  
  // More describe() functions can go here
});
```

## Running Paige Tests

Since Paige is just a library that leverages the power of mocha, Paige tests can be run [just like any other mocha tests](http://visionmedia.github.io/mocha/#usage).

#### Advanced Usage

In the event you want to leverage some of the more advanced features in Paige (for example, the ability to debug tests interactively) Paige contains a `paige` executable. When paige is installed, the binary is set up to exist in `./node_modules/.bin/paige`. The script is just thin wrapper around `mocha` itself and functions exactly the same as [mocha(1)](http://visionmedia.github.io/mocha/#usage)

#### A Note for running Paige's internal test suite.

`npm test` in Paige's root.

* You first need to copy `sauce-config-template.json` to `sauce-config.json` or you'll end up with a file not found error.
