---
layout: api
title: API | Paige
header: API
---
# WebElements
A standard web pages is composed of various elements that user can interact with. The webElement object is selenium's representation of an element.

# Basic functionality
`selenium-webdriver` provides most of the basic functionality available for webElements. Some popular methods include:

**clear()**: clear a text box

**click()**: click on an element

**isDisplayed()**: check if an element is displayed or not. This returns a promise that resolves with a boolean indicating whether the element is displayed

**sendKeys(keysToSend)**: simulates typing into an element

# Additional functionality provided by Paige

**getXpath()**: get the xpath of the element. Returns a promise that resolves with the element's xpath.

**find(target, strategy)**: find an element within the context of the current element. Returns the webElement.

**exists(target, strategy)**: check if an element exists within the context of the current element. Returns a promise that resolves with a boolean indicating whether the element exists.

**clickable()**: check if an element is "clickable". Returns a promise that resolves with a boolean indicating whether the element is clickable.

**hasClass(className)**: check if an element has a given class. Returns a promise that resolves with a boolean indicating whether the element has the given class.

**getCssProperties()**: get a map containing all css properties for the element. Returns a promise that resolves with a map of the element's css properties to their values.

**makeVisible()**: change the css properties of an object to force it to be visible.

**hover()/unhover()**: perform a mouseover/mouseout event on the element.

**getTextAreaInput()**: get current input from a text area.

# References

Documentation for `selenium-webdriver` is a bit sparse, but the documentation for the java implementation can be found [here](http://selenium.googlecode.com/svn/trunk/docs/api/java/index.html?org/openqa/selenium/WebElement.html). `selenium-webdriver` implements most of these methods, but returns may be in the form of a promise.
