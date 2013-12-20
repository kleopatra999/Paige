var Pool = require('be-spork').Pool,
    os = require('os'),
    fs = require('fs');

module.exports = function(paigeOptions, mochaOptions, files, output) {
  var specs = files.length,
      script = __dirname + '/worker.js',
      args = [
        JSON.stringify(paigeOptions),
        JSON.stringify(mochaOptions)
      ],
      settings = {
        cwd: process.cwd(),
        silent: !!output
      },
      maxWorkers = os.cpus().length - 1,
      options = {
        max: Math.min(maxWorkers, specs),
        min: Math.min(maxWorkers, 8)
      },

      pool, check,
      outStream, closed;

  // If output is to be redirected, set up the stream
  if (output) {
    // verify output is valid filepath
    fs.openSync(output, 'w');

    outStream = fs.createWriteStream(output);
    outStream.setMaxListeners(maxWorkers + 1);
    closed = false;

    outStream.write('<?xml version="1.0" encoding="UTF-8"?>\n<testsuites>\n');

    outStream.on('error', function(err) {
      console.log("Error writing to file: " + err);
    });
  }

  // Set up a thread pool
  pool = new Pool(script, args, settings, options, function(child) {
    if (output) {
      // redirect child stdout to output file
      child.stdout.pipe(outStream, {end: false});
    }
  });

  // Call this function at the completion of each thread
  check = function() {
    console.log('A test completed, ' + (specs - 1) + ' test left');

    if (!--specs) {
      console.log('Ending Paige Tests...');
      
      //closed output file
      if (output && !closed) {
        outStream.end('</testsuites>');
        closed = true;
      }

      pool.drain();
    }
  };

  // Queue up each file in the pool
  files.forEach(function(file) {
    console.log ('Queuing up test in pool: ' + file);
    pool.push(file, function() {
      check();
    });
  });

  process.on('exit', function() {
    if (output && !closed) {
      outStream.end('</testsuites>');
    }

    pool.drain();
  });
};
