var run = require('./run'),
    fs = require('fs'),

    platforms = {
      win32: 'WINDOWS',
      darwin: 'MAC',
      linux: 'LINUX',
      freebsd: 'LINUX',
    };

module.exports = function(hostAddress, sauceConfig, dir, options) {
  var paigeOpts = {
        address: hostAddress,
        webdriver: {
          address: options.webdriverAddress || 'http://ondemand.saucelabs.com/wd/hub',
          config: {
            os: options.os || platforms[process.platform],
            browserName: options.browser || 'firefox',
            'browser-version': options.browserVersion || '',
            'screen-resolution': options.screenResolution || '1024x768',
            name: options.name || '',
            tags: options.tags || [''],
            build: options.build || '',
            'record-video': !options.disableRecordVideo,
            'record-screenshots': !options.disableRecordScreenshots,
            'webdriver.remote.quietExceptions': !options.disableQuietExceptions,
            'sauce-advisor': !options.disableSauceAdvisor
          }
        }
      },

      sauceConfigObj = JSON.parse(fs.readFileSync(sauceConfig));

      paigeOpts.webdriver.config.username = sauceConfigObj.username;
      paigeOpts.webdriver.config.accessKey = sauceConfigObj.accessKey;

  run(paigeOpts, dir, options);
}
