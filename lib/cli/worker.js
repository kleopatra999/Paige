var Mocha = require('mocha'),
    paige = require('../../index'),
    cs = require('coffee-script'),

    paigeOptions = JSON.parse(process.argv[2]),
    mochaOptions = JSON.parse(process.argv[3]),
    mocha = new Mocha(mochaOptions);

// Wait until receive a file to run
process.on('message', function(file) {
  paigeOptions.webdriver.config.name += ' ' + file;

  // Set paige configuration
  paige.config.set(paigeOptions);

  // Add file to mocha, run test
  mocha.addFile(file);
  mocha.run(function(err) {
    process.send(err);
  });
});
