(function () {
  var _ = function (arr) {
    var u = {
      first: function () { return arr[0]; },
      last: function () { return arr[arr.length - 1]; },
      without: function (...args) {
        return arr.filter(function (elm) {
          return !args.includes(elm);
        });
      },
      lastIndexOf: function (val) {
        return arr.lastIndexOf(val);
      },
      sample: function (num) {
        sampleArr = [];
        copyArr = arr.slice();
        get = function () {
          var idx = Math.floor(Math.random() * copyArr.length);
          var elm = copyArr[idx];
          copyArr.splice(idx, 1);
          return elm;
        }
        if (!num) return get();
        for (var i = 0; i < num && copyArr.length > 0; i += 1) { sampleArr.push(get()); }
        return sampleArr;
      }
    };
    return u;
  };

  _.range = function (a, b) {
    if (b === undefined) [a, b] = [0, a];
    return Array(b - a).fill().map(function (elm, idx) { return idx + a; });
  };

  window._ = _;
})();
