#!/usr/bin/env node

var program = require('commander'),
    local = require('./local');

function list(val) {
  return val.split(',');
}

program.version('0.3.0')
	//include this one?
	.option('-u, --ui <name>', 'specify user-interface (bdd|tdd|exports)')
	.option('-r, --reporter <name>', 'specify the reporter to use')
	.option('-t, --timeout <ms>', 'set test-case timeout in milliseconds [2000]')
	.option('-b, --bail', 'bail after first test failure')
	.option('-s, --slow <ms>', '"slow" test threshold in milliseconds [75]')
	.option('-g, --grep <pattern>', 'only run tests matching <pattern>')
	.option('--globals <names>', 'allow the given comma-delimited global [names]')
	.option('--facebook <filepath>', 'facebook config file path');

program.command('local <host-address> [dir]')
	.description('Run against a local Selenium server')
 	.option('--webdriverUrl <url>', 'url for the webdriver server')
 	.option('--webdriverPlatform <platform>', 'os')
 	.option('--webdriverBrowser <browser>', 'browser')
 	.option('--webdriverVersion <version>', 'version')
	.action(function(address, dir, options) {
  	local(address, dir, options);
	});

program.parse(process.argv);
