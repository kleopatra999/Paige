var Mocha = require('mocha'),
		paige = require('../../index'),
		glob = require('glob'),

		platforms = {
			win32: 'WINDOWS',
			darwin: 'MAC',
			linux: 'LINUX',
			freebsd: 'LINUX',
		};

module.exports = function(address, dir, options) {
	var mochaOpts = {
				ui: options.parent.ui || 'bdd',
				reporter: options.parent.reporter || 'spec',
				timeout: options.parent.timeout || 2000,
				bail: !!options.parent.bail,
				slow: options.parent.slow || 74,
				grep: options.parent.grep || '',
				globals: options.parent.globals || ''
			},

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

			mocha = new Mocha(mochaOpts),
			dir = dir || './**/*.coffee'
		  files = glob.sync(dir);

	if (options.parent.facebook) {
		paigeOpts.facebook = JSON.parse(fs.readFileSync(options.parent.facebook)).facebook;
	}

	paige.config.set(paigeOpts);

	files.forEach(function(file) {
		mocha.addFile(file);
	});

  mocha.run();
}
