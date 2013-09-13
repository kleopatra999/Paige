var request = require("request"),
querystring = require("querystring"),

facebook = {
  url: "https://graph.facebook.com/",
  testUserEndpoint: "/accounts/test-users",

  createUser: function(appId, secret, syncFn) {
    var params  = {
      installed: "true",
      locale: "en_US",
      permissions: "email,publish_actions,read_stream",
      method: "post",
      access_token: appId + "|" + secret
    };
    var uri = "?" + querystring.stringify(params);
    var full_url = this.url + appId + this.testUserEndpoint + uri;

    request.post(full_url, function(code, response, body) {
      syncFn(JSON.parse(body));
    });
  },

  deleteUser: function(user, syncFn) {
    var params = {
      method: 'delete',
      access_token: user.access_token
    };
    var deleteEndpoint = this.url + user.id + "?" + querystring.stringify(params);
    request.get(deleteEndpoint, function(code, response, body) {
      syncFn(JSON.parse(body));
    });
  }
}

module.exports = facebook;
