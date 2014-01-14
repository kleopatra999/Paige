var Pool = require('be-spork').Pool,
    os = require('os'),
    fs = require('fs'),
    NUM_SPECS;

function setUpOutputForwarding(outputStream) {
  // verify output is valid filepath
  fs.openSync(output, 'w');

  outputStream = fs.createWriteStream(output);
  outputStream.setMaxListeners(maxWorkers + 1);
  closed = false;

  outputStream.write('<?xml version="1.0" encoding="UTF-8"?>\n<testsuites>\n');

  outputStream.on('error', function(err) {
    console.log("Error writing to file: " + err);
  });

  return outputStream;
}

function cleanup(output, closed, outStream, pool) {
  process.on('exit', function() {
    if (output && !closed) {
      outStream.end('</testsuites>');
    }

    pool.drain();
  });
}

function queueUpSpecs(pool, files) {
  // Queue up each file in the pool
  files.forEach(function(file) {
    console.log ('Queuing up test in pool: ' + file);
    pool.push(file, function() {
      check();
    });
  });
}

// Call this function at the completion of each thread
function check(output, close, outStream, pool) {
  console.log('A test completed, ' + (NUM_SPECS - 1) + ' test left');

  if (!--NUM_SPECS) {
    console.log('Ending Paige Tests...');

    //closed output file
    if (output && !closed) {
      outStream.end('</testsuites>');
      closed = true;
    }

    pool.drain();
  }
};

module.exports = function(paigeOptions, mochaOptions, files, output) {
  var NUM_SPECS = files.length,
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
        max: Math.min(maxWorkers, NUM_SPECS),
        min: Math.min(maxWorkers, 8)
      },

      pool, check,
      outStream, closed;

  if (output) {
    outStream = setUpOutputForwarding(outStream);
  }

  // Set up a thread pool
  pool = new Pool(script, args, settings, options, function(child) {
    if (output) {
      // redirect child stdout to output file
      child.stdout.pipe(outStream, {end: false});
    }
  });

  queueUpSpecs(pool, files);

  cleanup(output, closed, outStream, pool);
};
