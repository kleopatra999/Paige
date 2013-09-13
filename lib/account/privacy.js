var Privacy,
    Page = require('../page.js');

Privacy = Page.extend({
  pageRoot: '/account/privacy',

  selectors: {
    deleteCheckboxLabel: '#delete_account-container label',
    deleteButton: '#delete-my-account',
    passwordConfirm: '#password_confirm',
    popupSubmit: '#popup-confirm'
  },

  deleteAccount: function(password) {
    password = password || '';

    this.whenDisplayed(this.selectors.deleteCheckbox).then(function() {
      this.find(this.selectors.deleteCheckbox).click();
      this.find(this.selectors.deleteButton).click();
    }.bind(this));

    this.whenDisplayed(this.selectors.passwordConfirm).then(function() {
      this.find(this.selectors.passwordConfirm).sendKeys(password);
      this.find(this.selectors.popupSubmit).click();
      this.whenNotDisplayed(this.selectors.popupSubmit);
    }.bind(this));

    return this;
  }
});

module.exports = Privacy;
