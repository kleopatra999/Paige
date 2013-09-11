var Index,
    expect = require('chai').expect,
    Page = require('../page');

Index = Page.extend({

  selectors: {
    firstProject: '.project-cover.first a.projectName', // this should probably move to discover object
    sidebarFollow: '#project-sidebar .form-button-follow',
    sidebarFollowing: '#project-sidebar .form-button-unfollow',
    sidebarAddToCollection: '#project-sidebar .add-to-collection',
    sidebarMessage: '#project-sidebar .send-message',
    expeditedFrame: '#expedited-iframe',
    collectionList: '#collection_ids',
    commentLogin: '#comments-container .action-login',
    sendMessageForm: 'form.send-message'
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
  
  comment: function() {
    this.whenDisplayed(this.selectors.commentLogin).then(function () {
      this.find(this.selectors.commentLogin).click();
    }.bind(this));
    
    return this;
  },
  
  message: function() {
    this.whenDisplayed(this.selectors.sidebarMessage).then(function () {
      this.find(this.selectors.sidebarMessage).click();
    }.bind(this));
    
    return this;
  },
  
  followed: function() {
    this.whenNotDisplayed(this.selectors.expeditedFrame).then(function () {
      this.find(this.selectors.sidebarFollowing);
    }.bind(this));
    
    return this;
  },
  
  addToCollection: function() {
    this.whenDisplayed(this.selectors.sidebarAddToCollection).then(function () {
      this.find(this.selectors.sidebarAddToCollection).click();
    }.bind(this));
    
    return this;
  },
  
  openedMessage: function() {
  
    this.whenNotDisplayed(this.selectors.expeditedFrame).then(function () {
      this.whenDisplayed(this.selectors.sendMessageForm).then(function () {
        this.find(this.selectors.sendMessageForm);
      }.bind(this));
    }.bind(this));
    
    return this;
  },
  
  openedAddCollection: function() {
  
    this.whenNotDisplayed(this.selectors.expeditedFrame).then(function () {
      this.whenDisplayed(this.selectors.collectionList).then(function () {
        this.find(this.selectors.collectionList);
      }.bind(this));
    }.bind(this));
    
    return this;
  }

});

module.exports = Index;
