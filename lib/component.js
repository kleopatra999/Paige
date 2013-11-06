var compose = require('./utils/compose'),
    Class = require('nbd').Class,

Component = Class.extend({}, {
  'with': compose
});

module.exports = Component;
