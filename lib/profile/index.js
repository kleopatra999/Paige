var Index,
    expect = require('chai').expect,
    Page = require('../page'),
    Warnings = require('../components/warnings');

Index = Page.extend({
  pageRoot: '/profile',

  selectors: {
    locationInfo: '#profile-info .location-link',
    profileImage: '#profile-utility .profile-image-wrap img',
  },

  goToUsername: function( username ) {
    this._session.get(this._prefix + '/' + username);
    return this;
  },

  // TODO: We probably want this to check more things. Should be considered when profile is rewritten.
  verifyProfileInfo: function(info) {
    this.find(this.selectors.locationInfo).getText().then(function (locationInfo) {
      expect(locationInfo).to.contain(info.location.city);
      expect(locationInfo).to.contain(info.location.country);
    });

    this.find(this.selectors.profileImage).getAttribute('src').then(function (profileImage) {
      // TODO: This seems like something that needs to be somewhere else and not embedded in the test.
      expect(profileImage).to.contain('no-image-138.jpg');
    });

    return this;
  }
}).with( Warnings );

module.exports = Index;
