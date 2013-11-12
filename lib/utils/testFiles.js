var phantom = require('phantom'),
    testFile;

function _createCanvas(attributes) {
  var attribute,
      canvas = document.createElement("canvas");

  for (attribute in attributes) {
    if (attributes.hasOwnProperty(attribute)) {
      canvas.setAttribute(attribute, attributes[attribute]);
    }
  }

  return canvas.toDataURL();
}

testFile = function createImage(attributes, callback) {
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.open("", function() {
        page.evaluate(_createCanvas(attributes), function(result) {
          var buffer = new Buffer(result.split(',')[1], 'base64');
          callback(buffer);
          ph.exit();
        }, attributes);
      });
    });
  });
};

module.exports = testFile;
