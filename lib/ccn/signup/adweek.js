var extend = require('nbd').util.extend,
    CcnSignup = require('../signup' ),

Adweek = extend({}, CcnSignup, {
  submitCcnForm : function() { return this; }
});

module.exports = Adweek;
