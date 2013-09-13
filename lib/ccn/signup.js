var Signup = {
  selectors: {},

  enterCcnInfo : function() { return this; },
  
  // Pages that do not need to submit twice shuold overwrite to only return this
  submitCcnForm : function() { 
    this.submitForm();
    return this; 
  },

  enterMajor : function(key, major) {
    var selector = '#' + key + '_major';

    this.whenDisplayed(selector).then(function() {
      this.find(selector).sendKeys('');
      this.find(selector).sendKeys(major);
    }.bind(this));
    return this;
  },

  enterYear : function(key, year) {
    var button_selector = '#' + key + '_graduation_year-button',
        menu_selector = '#' + key + '_graduation_year-menu';

    this.find(button_selector).click();
    this.find("//*[@id='"+menu_selector.slice(1)+"']//a[contains(text(),'"+year+"')]", 'xpath').click();
    return this;
  },

  enterStatus : function(key, status) {
    var button_selector = '#' + key + '_status-button',
        menu_selector = '#' + key + '_status-menu';

    this.find(button_selector).click();
    this.find("//*[@id='"+menu_selector.slice(1)+"']//a[contains(text(),'"+status+"')]", 'xpath').click();
    return this;
  }


};

module.exports = Signup;
