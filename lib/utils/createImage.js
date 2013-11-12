var phantom = require('phantom');

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

function createImage(attributes, callback) {
  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.open("", function() {
        page.evaluate(_createCanvas, function(result) {
          var buffer = new Buffer(result.split(',')[1], 'base64');
          callback(buffer);
          ph.exit();
        }, attributes);
      });
    });
  });
}

module.exports = createImage;
