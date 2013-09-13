var Page = require('../../page'),

Authenticate = Page.extend({
  selectors : {
    continue: '#submit-button'
  },

  pageRoot: '/signup/authenticate',

  // These functions are almost always not needed
  submitAuthentication: function() { return this; },
  submitFormCheck: function() { return this; },

  submitForm: function() {
    this.find(this.selectors.continue).click();
    return this;
  }

});

module.exports = Authenticate;
