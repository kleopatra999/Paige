var merge = require('./merge');

function compose() {
  var selectors = {},
      mixins = [].slice.call(arguments);

  selectors = merge.apply(merge, mixins.map(function(mixin) {
    return mixin.selectors || mixin.prototype.selectors;
  }));

  mixins.push({
    selectors: merge(selectors, this.selectors)
  });

  mixins = mixins.reduce(function(prev, curr) {
    var prop;

    for (prop in curr.prototype) {
      prev[prop] = curr.prototype[prop];
    }

    return prev;
  }, {});

  return this.mixin(mixins);
}

module.exports = compose;
