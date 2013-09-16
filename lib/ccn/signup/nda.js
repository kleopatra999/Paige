var Nda = {
  key: 'nda',

  selectors: {
    awardButton: '#nda_award-button',
    awardMenu: '#nda_award-menu',
  },

  enterCcnInfo: function(data) {

    this.whenDisplayed( this.selectors.form ).then( function() {
      this.enterStatus(data.status);
      this.enterAward(data.award);
      this.enterYear(data.year);
    }.bind(this));

    return this;
  },

  enterAward: function(award) {
    this.whenDisplayed(this.selectors.awardButton).then(function() {
      this.find(this.selectors.awardButton).click();

      this.whenDisplayed(this.selectors.awardMenu).then(function() {
        this.find("//*[@id='"+this.selectors.awardMenu.slice(1)+"']//a[contains(text(),'"+award+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  }
};

module.exports = Nda;
