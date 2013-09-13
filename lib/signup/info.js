var Info,
    Page = require('../page');

Info = Page.extend({
  selectors: {
    firstName: '#first_name',
    lastName: '#last_name',
    username: '#username',
    password: '#password',
    countryButton: '#country-button',
    country: '#country-menu',
    stateButton: '#signup-state-select-button',
    state: '#signup-state-select-menu',
    city: '#city',
    firstCity: '#city-container li:first-child',
    monthButton: '#dob_month-button',
    month: '#dob_month-menu',
    dayButton: '#dob_day-button',
    day: '#dob_day-menu',
    yearButton: '#dob_year-button',
    year: '#dob_year-menu',
    continue: '#info-submit'
  },

  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/signup/info';
  },

  enterPassword: function(password) {
    this.whenDisplayed(this.selectors.password).then(function() {
      this.find(this.selectors.password).sendKeys(password);
    }.bind(this));

    return this;
  },

  enterInformation: function(userInfo) {
    this.enterFirstName(userInfo.firstName);
    this.enterLastName(userInfo.lastName);
    this.enterUsername(userInfo.username);

    this.completeLocationWidget(userInfo.location);
    this.completeDobWidget(userInfo.dob);

    this.find(this.selectors.continue).click();

    return this;
  },

  enterFirstName: function(firstName) {
    this.whenDisplayed(this.selectors.firstName).then(function() {
      this.find(this.selectors.firstName).sendKeys('');
      this.find(this.selectors.firstName).sendKeys(firstName);
    }.bind(this));
  },

  enterLastName: function(lastName) {
    this.whenDisplayed(this.selectors.firstName).then(function() {
      this.find(this.selectors.lastName).sendKeys('');
      this.find(this.selectors.lastName).sendKeys(lastName);
    }.bind(this));
  },

  enterUsername: function(username) {
    this.whenDisplayed(this.selectors.firstName).then(function() {
      this.find(this.selectors.username).sendKeys('');
      this.find(this.selectors.username).sendKeys(username);
    }.bind(this));
  },

  completeLocationWidget: function(location) {
    this.find(this.selectors.countryButton).click();
    this.find("//*[@id='"+this.selectors.country.slice(1)+"']//a[contains(text(),'"+location.country+"')]", 'xpath').click();

    this.find(this.selectors.stateButton).click();
    this.find("//*[@id='"+this.selectors.state.slice(1)+"']//a[contains(text(),'"+location.state+"')]", 'xpath').click();

    this.find(this.selectors.city).sendKeys('');
    this.find(this.selectors.city).sendKeys(location.city);
    this.whenDisplayed(this.selectors.firstCity).then(function() {
      this.find(this.selectors.firstCity).click();
    }.bind(this));
  },

  completeDobWidget: function(dob) {
    this.find(this.selectors.monthButton).click();
    this.find("//*[@id='"+this.selectors.month.slice(1)+"']//a[contains(text(),'"+dob.month+"')]", 'xpath').click();

    this.find(this.selectors.dayButton).click();
    this.find("//*[@id='"+this.selectors.day.slice(1)+"']//a[contains(text(),'"+dob.day+"')]", 'xpath').click();

    this.find(this.selectors.yearButton).click();
    this.find("//*[@id='"+this.selectors.year.slice(1)+"']//a[contains(text(),'"+dob.year+"')]", 'xpath').click();
  }
});

module.exports = Info;
