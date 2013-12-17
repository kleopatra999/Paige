#!/usr/bin/env node

var program = require('commander'),
    local = require('./local');

program.version('0.3.0');

program.command('local <address> [dir]')
.description('Run against a local Selenium server')
.action(function(address, dir, options) {
  local(address, dir, options);
});

program.parse(process.argv);
