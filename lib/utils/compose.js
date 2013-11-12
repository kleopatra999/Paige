// Abstraction of the "with-ability of Components to generate merged objects
// with non-overridden 'selectors' properties.
var Class = require('nbd').Class,
    merge = require('./merge');

function compose() {
  var selectors = {},
      mixins = [].slice.call(arguments),
      Composite;

  selectors = merge.apply(null, mixins.map(function(mixin) {
    return mixin.selectors;
  }));

  if (this.inherits && this.inherits(Class)) {
    mixins.push({
      selectors: merge(selectors, this.prototype.selectors)
    });

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
    Composite.selectors = selectors;
  }

  return Composite;
};

module.exports = compose;