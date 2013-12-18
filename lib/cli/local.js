var Mocha = require('mocha'),
		paige = require('../../index'),
		glob = require('glob'),
		fs = require('fs'),

		platforms = {
			win32: 'WINDOWS',
			darwin: 'MAC',
			linux: 'LINUX',
			freebsd: 'LINUX',
		};

module.exports = function(address, dir, options) {
	var files,

			// configure mocha options
			mochaOpts = {
				ui: options.parent.ui || 'bdd',
				reporter: options.parent.reporter || 'spec',
				timeout: options.parent.timeout || 2000,
				bail: !!options.parent.bail,
				slow: options.parent.slow || 74,
				grep: options.parent.grep || '',
				globals: options.parent.globals || ''
			},

			// configure paige options
			paigeOpts = {
				address: address,
				webdriver: {
					address: options.webdriverUrl || 'http://localhost:4444/wd/hub',
					config: {
						platform: options.webdriverPlatform || platforms[process.platform],
						browserName: options.webdriverBrowser || 'firefox',
						version: options.webdrvierVersion || ''
					}
				}
			},

			// create a new mocha instance with selected options
			mocha = new Mocha(mochaOpts);

	// If no directory provided, check for js files in a test or spec directory
	if (!dir) {
		if (fs.existsSync('./test')) {
			dir = 'test/**/*.js';
		}
		else if (fs.existsSync('./spec')) {
			dir = 'spec/**/*.js';
		}
		else {
			throw new Error('Please provide a test directory');
		}
	}

	// Find all test files in test directory
	console.log("Looking for test files in " + dir);
	files = glob.sync(dir);

	// Set paige configuration
	paige.config.set(paigeOpts);

	// Add test files to mocha
	files.forEach(function(file) {
		console.log(file);
		mocha.addFile(file);
	});

  mocha.run();
}
