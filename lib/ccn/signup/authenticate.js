var Page = require('../../page'),

Authenticate = Page.extend({
  pageRoot: '/signup/authenticate',

  selectors : {
    continue: '#submit-button'
  },

  // These functions are almost always not needed
  submitAuthentication: function() { return this; },
  submitFormCheck: function() { return this; },

  submitForm: function() {
    this.find(this.selectors.continue).click();
    return this;
  }

});

module.exports = Authenticate;
