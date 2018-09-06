(function () {
  var _ = function (aggr) {
    var propsMatch = function (obj, elm) {
      for (var prop in obj) {
        if (!(prop in elm) || obj[prop] !== elm[prop]) return false;
      }
      return true;
    };

    var u = {
      first: function () { return aggr[0]; },
      last: function () { return aggr[aggr.length - 1]; },
      without: function (...args) {
        return aggr.filter(function (elm) {
          return !args.includes(elm);
        });
      },
      lastIndexOf: function (val) {
        return aggr.lastIndexOf(val);
      },
      sample: function (num) {
        sampleArr = [];
        copyArr = aggr.slice();
        get = function () {
          var idx = Math.floor(Math.random() * copyArr.length);
          var elm = copyArr[idx];
          copyArr.splice(idx, 1);
          return elm;
        }
        if (!num) return get();
        for (var i = 0; i < num && copyArr.length > 0; i += 1) { sampleArr.push(get()); }
        return sampleArr;
      },
      findWhere: function (props) {
        for (var i = 0; i < aggr.length; i += 1) {
          if (propsMatch(props, aggr[i])) return aggr[i];
        }
        return undefined;
      },
      where: function (props) {
        return aggr.filter(function (elm) {
          return propsMatch(props, elm);
        });
      },
      pluck: function (prop) {
        return aggr.filter(function (elm) { return (prop in elm); })
                  .map(function (elm) { return elm[prop]; });
      },
      keys: function () { return Object.keys(aggr); },
      values: function () { return Object.values(aggr); },
      pick: function (...args) {
        var newObj = {};
        args.forEach(function (prop) { newObj[prop] = aggr[prop]; });
        return newObj;
      },
      omit: function (...args) {
        var newObj = {};
        for (var prop in aggr) {
          if (!args.includes(prop)) newObj[prop] = aggr[prop];
        }
        return newObj;
      },
      has: function (prop) { return (prop in aggr); },
    };

    [
      'isElement', 'isArray', 'isObject', 'isFunction',
      'isBoolean', 'isString', 'isNumber'
    ].forEach(function (method) {
      u[method] = function () { _[method].call(u, aggr); };
    });

    return u;
  };

  _.range = function (a, b) {
    if (b === undefined) [a, b] = [0, a];
    return Array(b - a).fill().map(function (elm, idx) { return idx + a; });
  };

  _.extend = function (obj1, obj2, ...args) {
      var tempObj = (args.length === 0) ? obj2 : _.extend(obj2, ...args);
      for (var prop in tempObj) { obj1[prop] = tempObj[prop]; }
      return obj1;
  };

  _.isElement = function (obj) {
    return obj && ('nodeType' in obj) && (obj.nodeType === 1);
  };

  _.isArray = Array.isArray || function (obj) {
    // return obj && (typeof(obj) === 'object') && (obj.constructor === Array);
    return obj && toString.call(obj) === "[object Array]";
  };

  _.isObject = function (obj) {
    return obj && (typeof(obj) === 'object' || typeof(obj) === 'function');
  };

  _.isFunction = function (obj) {
    return obj && typeof(obj) === 'function';
  };

  ['Boolean', 'String', 'Number'].forEach(function (method) {
    _['is' + method] = function (obj) {
      return toString.call(obj) === '[object ' + method + ']';
    };
  });

  window._ = _;
})();
