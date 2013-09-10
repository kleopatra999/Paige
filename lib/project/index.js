var Index,
    expect = require('chai').expect,
    Page = require('../page');

Index = Page.extend({

  selectors: {
    firstProject: '.project-cover.first a.projectName', // this should probably move to discover object
    sidebarFollow: '#project-sidebar .form-button-follow',
    sidebarFollowing: '#project-sidebar .form-button-unfollow',
    title: '#project-title',
    expeditedFrame: '#expedited-iframe'
  },

  init: function(config, session) {
    this._super(config, session);
    this._rootPage = '/';
  },

  openFirstProject: function() {
    this.find(this.selectors.firstProject).click();
    return this;
  },
  
  follow: function() {
    this.whenDisplayed(this.selectors.sidebarFollow).then(function () {
      this.find(this.selectors.sidebarFollow).click();
    }.bind(this));
    
    return this;
  },
  
  followed: function() {
    this.whenNotDisplayed(this.selectors.expeditedFrame).then(function () {
      this.find(this.selectors.sidebarFollowing);
    }.bind(this));
    
    return this;
  }

});

module.exports = Index;
