---
layout: api
title: API | Paige
header: API
---
The Base Page Object is the core wrapper around `selenium-webdriver` that exposes the API used in the [[Page Objects]].

## Core Functionality Added

_Note_: all methods described here return `this` (ie: the Page from which it was called) unless otherwise noted.

**build()**:
Builds a new webdriver instance.

**open(url)**:
Open a given web page in the browser. If no `url` is provided, the default address of the page you are calling from will be used.

**openFromRoot(slug)**:
Append `slug` to the default root address, and open in a browser.

**switchTo(Page)**:
Builds a new `Page` object, and returns it.

**redirectTo(Page)**:
Build a new `Page` object and calls `open()` on it. Returns the newly created `Page`.

**runOnPage(fn)**:
Execute a javascript function in the web page. `fn` can either be a function or a string. Note that if `fn` is a function, it will be converted into a string, and run as-is in a browser. Any unbound variables will not be resolved. Returns a promise that resolves with the return value of `fn`.

**switchToFrame(nameOrId) / switchOffFrame()**:
Switch selenium context to a `frame` or `iframe` by calling `switchToFrame()`. `nameOrId` must be the `name` or `id` of the frame element. The frame index will also be accepted. Once you are done with the frame, you must call `switchOffFrame()` to switch the context back to the main web document.

**resizeWindowTo(dimensions)**:
Resize the browser window to the given dimensions, where `dimensions` has the form:
```JavaScript
dimensions = {
  width: 1024,
  height: 768
}
```

**onPage(integrityFields)**:
Verify the session is on the correct page, by checking whether the elements passed to `integrityFields` are present and displayed. If no argument is provided, `onPage()` will verify the session url is correct based in the Page's `pageRoot`. `integrityFields` can be a [selector](https://github.com/behance/Paige/wiki/Base-page-object#target-locator-strategies), or an array of selectors. The intention is for this method to be overridden in a `Page`, and call through `_super()`.

**exists(target, strategy)**:
Tests if a webElement is present on the page. `target` is the selector for the webElement. `strategy` (optional) is the method by which the webElement will be located. By default, the strategy is 'css'. See [Target Locater Strategies](https://github.com/behance/Paige/wiki/Base-page-object#target-locator-strategies) below for strategy options.
The function returns a promise that resolves with a boolean.

Example:
```JavaScript
    this.exists('cssSelector').then(function(elementExists) {
        if (elementExists == true) { 
            //element exists on page
        } else { 
           //element doesn't exist on page
        }
    }); 
```

**find(target, strategy)**:
Find a webElement on the page. `target` is the selector for the webElement. `strategy` (optional) is the method by which the webElement will be located. By default, the strategy is 'css'. See [Target Locater Strategies](https://github.com/behance/Paige/wiki/Base-page-object#target-locator-strategies) below for strategy options. Returns a `webElement`.

**findAll(target, strategy)**:
Similar to `find()` except that it returns all `webElements` found by the selector. Returns a `promise` that resolves with an array `webElements`.

Example:
```JavaScript
   this.findAll('selector').then(function(elements) {
      //elements is an array of all webElements found on the page, using the given selector
   });
```

**findInList(list, matcher)**:

**verifyContent(selector, content)**:
Asserts that the textual content of the given selector matches `content`.

**whenDisplayed(webElement, timeout) / whenNotDisplayed(webElement, timeout)**:
Waits for `webElement` to (not) be displayed. `timeout` is the time (in milliseconds) before the method errors out. If no `timeout` is provided, the default timeout will be used. Returns a promise that resolves when element is (not) displayed.

_Note_: `whenNotDisplayed()` is currently not stable, and may throw a `StaleElementException` or `ElementNotFoundException` at times.

**awaits(fn)**:
Waits for the given function to resolve a promise before allowing the flow to continue. `fn` must be a function that takes a `promise` and resolves/rejects it when finished. Returns a promise that resolves when `fn` is resolved.

**wait(fn, timeout)**:
Wait until the given function returns/resolves true, or time runs out. `fn` should be a function that returns/resolves a boolean. `timeout` is the time (in milliseconds) before the method errors out. If no `timeout` is provided, the default timeout will be used. Returns a promise that will be resolved when the condition is met.

**scrollTo(element, context)**:
Forces the element to scroll into view. `element` can be a selector, or a `webElement`. Currently, `context` can only be set to `window`.

_Note_: By default, selenium will automatically scroll the element being interacted with into view. However, there are a few cases where Selenium can't quite figure things out. This is for those cases.

**upgradeToHTTPS() / downgradeToHTTP()**:
Set the default protocol used to `https` or `http`.

**uploadFile(contents, filename)**:
Uploads a file to the system being tested. `contents` can either be the path to the file (on the local system), or a Buffer containing the contents of the file. `filename` is where to save the file on the remote system. If no `filename` is provided, the file will be saved as `tmp`. Returns a promise that resolves with the path to the file on the remote system.

**uploadImage(attributes, filename)**:
Create a test image and upload to the system being tested. `attributes` is a set of attributes you want the image to have. `filename` is where to save the file on the remote system. By default, `filename` is set to `tmp.png`. 

## 'with' and Components

`with` is the primary weapon that arms Paige against what the Page Object pattern has been observed to become:  spaghetti coded, 1000+ line Page Objects. It's a slightly modified version of the trait/mixin pattern that is seen in various languages such as PHP, Scala, Ruby, etc. See [[Components]] for more details.

