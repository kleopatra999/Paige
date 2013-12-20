var Mocha = require('mocha'),
    paige = require('../../index'),
    cs = require('coffee-script'),

    paigeOptions = JSON.parse(process.argv[2]),
    mochaOptions = JSON.parse(process.argv[3]),
    mocha = new Mocha(mochaOptions);

// Set paige configuration
paige.config.set(paigeOptions);

// Wait until receive a file to run
process.on('message', function(file) {
  // Add file to mocha, run test
  mocha.addFile(file);
  mocha.run(function(err) {
    process.send(err);
  });
});
