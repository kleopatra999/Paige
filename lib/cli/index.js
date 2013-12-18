#!/usr/bin/env node

var program = require('commander'),
    local = require('./local'),
    remote = require('./remote'),
    coffeeScript = require('coffee-script');

program.version('0.3.0')
	//include this one?
	.option('-u, --ui <name>', 'specify user-interface [bdd, tdd, exports]')
	.option('-r, --reporter <name>', 'specify the reporter to use')
	.option('-t, --timeout <ms>', 'set test-case timeout in milliseconds [2000]')
	.option('-b, --bail', 'bail after first test failure')
	.option('-s, --slow <ms>', '"slow" test threshold in milliseconds [75]')
	.option('-g, --grep <pattern>', 'only run tests matching <pattern>')
	.option('--globals <names>', 'allow the given comma-delimited global [names]')
	.option('--facebook <filepath>', 'facebook config file path');

program.command('local <host-address> [dir]')
	.description('Run against a local Selenium server')
 	.option('--webdriverBrowser <browser>', 'browser to run the tests in [firefox]')
	.action(function(hostAddress, dir, options) {
    local(hostAddress, dir, options);
	});

program.command('remote <host-address> <webdriver-address> [dir]')
  .description('Run against a remote Selenium server (or grid)')
  .option('--webdriverPlatform <platform>', 'operating system to use [WINDOWS, LINUX, MAC]')
  .option('--webdriverBrowser <browser>', 'browser to run the tests in [firefox]')
  .option('--webdriverVersion <version>', 'webdriver version to use [2.37]')
  .action(function(hostAddress, webdriverAddress, dir, options) {
    remote(hostAddress, webdriverAddress, dir, options);
  });

program.parse(process.argv);
