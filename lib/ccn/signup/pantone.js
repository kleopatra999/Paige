var Nda = {
  key: 'nda',

  selectors: {
    favoriteToolMenu: '#wacom_favorite_tool-menu',
  },

  enterCcnInfo: function(data) {

    this.whenDisplayed( this.selectors.form ).then( function() {
      this.enterFavoriteColor(data.favorite_color);
    }.bind(this));

    return this;
  },

  enterFavoriteColor: function(tool) {
    var colorButton = "[data-hex='#add703']";

    this.whenDisplayed(colorButton).then(function() {
      this.find(colorButton).click();
    }.bind(this));

    return this;
  }
};

module.exports = Nda;
