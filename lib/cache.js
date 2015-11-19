'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManager = exports.MemoryCacheAdapter = exports.CacheAdapter = undefined;

var _bluebird = require('bluebird');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CacheAdapter = exports.CacheAdapter = (function () {
  function CacheAdapter() {
    _classCallCheck(this, CacheAdapter);
  }

  _createClass(CacheAdapter, [{
    key: 'find',
    value: function find(code) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }
  }, {
    key: 'store',
    value: function store(prefix, dict) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }
  }]);

  return CacheAdapter;
})();

var MemoryCacheAdapter = exports.MemoryCacheAdapter = (function (_CacheAdapter) {
  _inherits(MemoryCacheAdapter, _CacheAdapter);

  function MemoryCacheAdapter() {
    _classCallCheck(this, MemoryCacheAdapter);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MemoryCacheAdapter).call(this));

    _this.dicts = {};
    return _this;
  }

  _createClass(MemoryCacheAdapter, [{
    key: 'find',
    value: function find(code) {
      return _bluebird.Promise.resolve(null);
    }
  }, {
    key: 'store',
    value: function store(prefix, dict) {
      this.dicts[prefix] = dict;
    }
  }]);

  return MemoryCacheAdapter;
})(CacheAdapter);

var CacheManager = exports.CacheManager = (function () {
  function CacheManager(adapter) {
    _classCallCheck(this, CacheManager);

    this.adapter = adapter;
  }

  _createClass(CacheManager, [{
    key: 'find',
    value: function find(code) {
      return this.adapter.find(code);
    }
  }, {
    key: 'store',
    value: function store(prefix, dict) {
      return this.adapter.store(prefix, dict);
    }
  }]);

  return CacheManager;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLFlBQVksV0FBWixZQUFZO0FBQ3ZCLFdBRFcsWUFBWSxHQUNUOzBCQURILFlBQVk7R0FFdEI7O2VBRlUsWUFBWTs7eUJBR2xCLElBQUksRUFBRTtBQUNULFlBQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztLQUM3RTs7OzBCQUNLLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbEIsWUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0tBQzdFOzs7U0FSVSxZQUFZOzs7SUFXWixrQkFBa0IsV0FBbEIsa0JBQWtCO1lBQWxCLGtCQUFrQjs7QUFDN0IsV0FEVyxrQkFBa0IsR0FDZjswQkFESCxrQkFBa0I7O3VFQUFsQixrQkFBa0I7O0FBRzNCLFVBQUssS0FBSyxHQUFHLEVBQUUsQ0FBQzs7R0FDakI7O2VBSlUsa0JBQWtCOzt5QkFLeEIsSUFBSSxFQUFFO0FBQ1QsYUFBTyxVQW5CRixPQUFPLENBbUJHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Qjs7OzBCQUNLLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbEIsVUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDM0I7OztTQVZVLGtCQUFrQjtHQUFTLFlBQVk7O0lBYXZDLFlBQVksV0FBWixZQUFZO0FBQ3ZCLFdBRFcsWUFBWSxDQUNYLE9BQU8sRUFBRTswQkFEVixZQUFZOztBQUVyQixRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztHQUN4Qjs7ZUFIVSxZQUFZOzt5QkFJbEIsSUFBSSxFQUFFO0FBQ1QsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoQzs7OzBCQUNLLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbEIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekM7OztTQVRVLFlBQVkiLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgY2xhc3MgQ2FjaGVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG4gIHN0b3JlKHByZWZpeCwgZGljdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWVtb3J5Q2FjaGVBZGFwdGVyIGV4dGVuZHMgQ2FjaGVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmRpY3RzID0ge307XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICB0aGlzLmRpY3RzW3ByZWZpeF0gPSBkaWN0O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlcjtcbiAgfVxuICBmaW5kKGNvZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmZpbmQoY29kZSk7XG4gIH1cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5zdG9yZShwcmVmaXgsIGRpY3QpO1xuICB9XG59XG4iXX0=