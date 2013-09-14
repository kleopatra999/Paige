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
    var buttonSelector = '#' + key + '_year-button',
        menuSelector = '#' + key + '_year-menu';
        
    this.whenDisplayed(buttonSelector).then(function() {
      this.find(buttonSelector).click();
      
      this.whenDisplayed(menuSelector).then(function() {
        this.find("//*[@id='"+menuSelector.slice(1)+"']//a[contains(text(),'"+year+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  },

  enterGraduationYear : function(key, year) {
    var buttonSelector = '#' + key + '_graduation_year-button',
        menuSelector = '#' + key + '_graduation_year-menu';

    this.whenDisplayed(buttonSelector).then(function() {
      this.find(buttonSelector).click();
      
      this.whenDisplayed(menuSelector).then(function() {
        this.find("//*[@id='"+menuSelector.slice(1)+"']//a[contains(text(),'"+year+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  },

  enterStatus : function(key, status) {
    var buttonSelector = '#' + key + '_status-button',
        menuSelector = '#' + key + '_status-menu';

    this.whenDisplayed(buttonSelector).then(function() {
      this.find(buttonSelector).click();
      
      this.whenDisplayed(menuSelector).then(function() {
        this.find("//*[@id='"+menuSelector.slice(1)+"']//a[contains(text(),'"+status+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  }


};

module.exports = Signup;
