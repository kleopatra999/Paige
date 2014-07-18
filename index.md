---
layout: default
title: Paige
---
# {{ page.title }}

Paige is a collection of Page Objects for testing. yup.

# Installation</h2>

Install `paige` just like any other node module.

> `$ npm install --save-dev be-paige`

Fun fact: `paige` was already taken, so we prefixed it with `be-` since that's what we do here :)

# Usage

Before any testing can take place, selenium's standalone server must be installed and running so that
paige can send remote control commands. On Mac, this is as easy as using [homebrew](http://brew.sh/)

```
$ brew install selenium-server-standalone
$ selenium-server
```

Refer [here](http://docs.seleniumhq.org/download/) to get Selenium Server setup on other platforms.


To run paige tests, run the `paige` executable. This __should not__ be globally installed, but instead
run from the `node_modules` directory.

```
$ ./node_modules/.bin/paige

or inside of package.json

"scripts": {
  "test": "paige"
}
```

`paige` is a light wrapper around [`mocha`](http://visionmedia.github.io/mocha/#usage) and should adhere to all the same options.
