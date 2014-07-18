---
layout: guide
title: About | Paige
header: About
---
Paige is a javascript library for creating automated end-to-end tests. It makes use of Selenium and the `selenium-webdriver` module to accomplish this goal.

## Why

Paige exists for one reason: To let front-end developers - who are familiar with javascript - write automated tests against their features __during development__. We accomplish this by:

- Using `selenium-webdriver` to give a node-like API.
- Building a base page object that gives a set of jquery-like functions.
- Writing out specs in a fluent interface that is human-readable.

## Requirements

###Selenium
- Download the Selenium Server from [here](http://docs.seleniumhq.org/download/).
- Or install via homebrew: `brew install selenium-server-standalone`.
- To start the selenium server run `selenium-server` from the command line.

###PhantomJS
PhantomJS is used by the createImage util to generate test images. 
- To install on macs using homebrew: `brew install phantomjs`
- For other platforms download from the [PhantomJS website](http://phantomjs.org/)

## Table of Contents

- Page Model
  - [[Base Page Object]]
  - [[WebElements]]
  - [[Custom Page Objects|Page Objects]]
  - [[Selectors]]
  - [[Components]]
  - [[Forms]]
- [[Utilities]]
- [[Tests]]
- [[Debugger]]
- [[Best Practices]]
- [[CLI]]

## References

- `selenium-webdriver` (and in turn, Paige) makes heavy use of Promises for program flow. The best documentation for understanding how they work is the [WebDriverJs Docs](https://code.google.com/p/selenium/wiki/WebDriverJs#Promises)
- [Selenium documentation](http://docs.seleniumhq.org/docs/)

