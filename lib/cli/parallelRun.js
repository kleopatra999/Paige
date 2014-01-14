var Pool = require('be-spork').Pool,
    os = require('os'),
    fs = require('fs'),
    NUM_SPECS;

function setUpOutputForwarding(output, outputStream, listeners) {
  if (output) {
    // verify output is valid filepath
    fs.openSync(output, 'w');

    outputStream = fs.createWriteStream(output);
    outputStream.setMaxListeners(listeners + 1);
    closed = false;

    outputStream.write('<?xml version="1.0" encoding="UTF-8"?>\n<testsuites>\n');

    outputStream.on('error', function(err) {
      console.log("Error writing to file: " + err);
  });
  }

  return outputStream;
}

function cleanup(output, closed, outStream, pool) {
  if (output && !closed) {
    outStream.end('</testsuites>');
    closed = true;
  }

  pool.drain();
}

function queueUpSpecs(pool, files, output, closed, outStream) {
  // Queue up each file in the pool
  files.forEach(function(file) {
    console.log ('Queuing up test in pool: ' + file);
    pool.push(file, function() {
      check(output, closed, outStream, pool);
    });
  });
}

// Call this function at the completion of each thread
function check(output, closed, outStream, pool) {
  console.log('A test completed, ' + (NUM_SPECS - 1) + ' test left');

  if (!--NUM_SPECS) {
    console.log('Ending Paige Tests...');

    cleanup(output, closed, outStream, pool);
  }
};

module.exports = function(paigeOptions, mochaOptions, files, output) {
  var script = __dirname + '/worker.js',
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

  NUM_SPECS = files.length;
  outStream = setUpOutputForwarding(output, outStream, maxWorkers);

  // Set up a thread pool
  pool = new Pool(script, args, settings, options, function(child) {
    if (output) {
      // redirect child stdout to output file
      child.stdout.pipe(outStream, {end: false});
    }
  });

  queueUpSpecs(pool, files);

  process.on('exit', function() {
    cleanup(output, closed, outStream, pool);
  });
};
