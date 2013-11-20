// Abstraction of the "with-ability of Components to generate merged objects
// with non-overridden 'selectors' properties.
var Class = require('nbd').Class,
    merge = require('./merge');

function compose() {
  var merger = {},
      mixins = [].slice.call(arguments),
      proto,
      Composite;

  if (this.inherits && this.inherits(Class)) {
    proto = this.prototype;

    Object.keys(proto).forEach(function(key) {
      if (typeof proto[key] === 'object' && proto[key].constructor === Object) {
        merger[key] = merge.apply(null, mixins.map(function(mixin) {
          return mixin[key];
        }));
      }
    });

    mixins.push(Object.keys(merger).reduce(function(composite, key) {
      composite[key] = merge(composite[key], proto[key]);
      return composite;
    }, {}));

    Composite = this.mixin(mixins.reduce(function(prev, curr) {
      var prop;

      for (prop in curr) {
        prev[prop] = curr[prop];
      }

      return prev;
    }, {}));
  }
  else {
    Composite = merge.apply(null, mixins);
  }

  return Composite;
}

module.exports = compose;
