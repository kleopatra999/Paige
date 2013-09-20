var Signup = {
  selectors: {
    form: '#ccn-container'
  },

  enterCcnInfo : function() { return this; },

  // Pages that do not need to submit twice shuold overwrite to only return this
  submitCcnForm : function() {
    this.submitForm();
    return this;
  },

  enterMajor : function(major) {
    var selector = '#' + this.key + '_major';

    this.whenDisplayed(selector).then(function() {
      this.find(selector).sendKeys('');
      this.find(selector).sendKeys(major);
    }.bind(this));

    return this;
  },

  enterYear : function(year) {
    var buttonSelector = '#' + this.key + '_year-button',
        menuSelector = '#' + this.key + '_year-menu';

    this.whenDisplayed(buttonSelector).then(function() {
      this.find(buttonSelector).click();

      this.whenDisplayed(menuSelector).then(function() {
        this.find("//*[@id='"+menuSelector.slice(1)+"']//a[contains(text(),'"+year+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  },
  
  // TODO: Are these all labeled as department? If so, rename function
  enterMajorSelect: function(major) {
    var buttonSelector = '#' + this.key + '_major-button',
        menuSelector = '#' + this.key + '_major-menu';

    this.whenDisplayed(buttonSelector).then(function() {
      this.find(buttonSelector).click();

      this.whenDisplayed(menuSelector).then(function() {
        this.find("//*[@id='"+menuSelector.slice(1)+"']//a[contains(text(),'"+major+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  },

  enterGraduationYear : function(year) {
    var buttonSelector = '#' + this.key + '_graduation_year-button',
        menuSelector = '#' + this.key + '_graduation_year-menu';

    this.whenDisplayed(buttonSelector).then(function() {
      this.find(buttonSelector).click();

      this.whenDisplayed(menuSelector).then(function() {
        this.find("//*[@id='"+menuSelector.slice(1)+"']//a[contains(text(),'"+year+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  },

  enterStatus : function(status) {
    var buttonSelector = '#' + this.key + '_status-button',
        menuSelector = '#' + this.key + '_status-menu';

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
