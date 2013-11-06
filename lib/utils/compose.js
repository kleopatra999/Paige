var Class = require('nbd').Class,
    merge = require('./merge');

var compose = function compose() {
  var selectors = {},
      mixins = [].slice.call(arguments);

  selectors = merge.apply(merge, mixins.map(function(mixin) {
    return mixin.selectors || mixin.prototype.selectors;
  }));

  mixins.push({
    selectors: merge(selectors, this.prototype.selectors)
  });

  return this.mixin(mixins.reduce(function(prev, curr) {
    var prop,
        mixin = Class.prototype.isPrototypeOf(curr.prototype) ? curr.prototype : curr;

    for (prop in mixin) {
      prev[prop] = mixin[prop];
    }

    return prev;
  }, {}));
};

module.exports = compose;
