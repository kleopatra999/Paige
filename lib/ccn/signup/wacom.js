var Nda = {
  key: 'nda',

  selectors: {
    favoriteToolButton: '#wacom_favorite_tool-button',
    favoriteToolMenu: '#wacom_favorite_tool-menu',
  },

  enterCcnInfo: function(data) {

    this.whenDisplayed( this.selectors.form ).then( function() {
      this.enterFavoriteTool(data.favorite_tool);
    }.bind(this));

    return this;
  },

  enterFavoriteTool: function(tool) {
    this.whenDisplayed(this.selectors.favoriteToolButton).then(function() {
      this.find(this.selectors.favoriteToolButton).click();

      this.whenDisplayed(this.selectors.favoriteToolMenu).then(function() {
        this.find("//*[@id='"+this.selectors.favoriteToolMenu.slice(1)+"']//a[contains(text(),'"+tool+"')]", 'xpath').click();
      }.bind(this));
    }.bind(this));

    return this;
  }
};

module.exports = Nda;
