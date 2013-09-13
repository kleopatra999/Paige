var expect = require('chai').expect,

Nav = {
  burgerMaxAppear: 1024,
  burgerMinInvisible: 1025,
  height: 800,

  selectors: {
    burger: '.burger'
  },

  summonZeBurger: function() {
    this.resizeWindowTo({
      width: this.burgerMaxAppear,
      height: this.height
    });

    this.find(this.selectors.burger).isDisplayed(function(visible) {
      expect(visible).to.equal(true);
    });

    return this;
  },

  eatZeBurger: function() {
    this.resizeWindowTo({
      width: this.burgerMinInvisible,
      height: this.height
    });

    this.find(this.selectors.burger).isDisplayed(function(visible) {
      expect(visible).to.equal(false);
    });

    return this;
  }
};

module.exports = Nav;
