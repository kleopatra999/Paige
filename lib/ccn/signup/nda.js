var extend = require('nbd').util.extend,
    CcnSignup = require('../signup' ),

Nda = extend( {}, CcnSignup, {

  key: 'nda',

  selectors: {
    awardButton: '#nda_award-button',
    awardMenu: '#nda_award-menu',
  },

  enterCcnInfo: function(data) {
    this.enterAward(data.award);
    this.enterYear(this.key, data.year);
    this.enterStatus(this.key, data.status);

    return this;
  },

  enterAward: function(award) {
    this.whenDisplayed(this.selectors.awardButton).then(function() {
      console.log('click:', this.selectors.awardButton );
      this.find(this.selectors.awardButton).click();
      
      this.whenDisplayed(this.selectors.awardMenu).then(function() {
        this.find("//*[@id='"+this.selectors.awardMenu.slice(1)+"']//a[contains(text(),'"+award+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  }



});

module.exports = Nda;
