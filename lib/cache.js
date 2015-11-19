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
      return _bluebird.Promise.resolve();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLFlBQVksV0FBWixZQUFZO0FBQ3ZCLFdBRFcsWUFBWSxHQUNUOzBCQURILFlBQVk7R0FFdEI7O2VBRlUsWUFBWTs7eUJBR2xCLElBQUksRUFBRTtBQUNULFlBQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztLQUM3RTs7OzBCQUNLLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbEIsWUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0tBQzdFOzs7U0FSVSxZQUFZOzs7SUFXWixrQkFBa0IsV0FBbEIsa0JBQWtCO1lBQWxCLGtCQUFrQjs7QUFDN0IsV0FEVyxrQkFBa0IsR0FDZjswQkFESCxrQkFBa0I7O3VFQUFsQixrQkFBa0I7O0FBRzNCLFVBQUssS0FBSyxHQUFHLEVBQUUsQ0FBQzs7R0FDakI7O2VBSlUsa0JBQWtCOzt5QkFLeEIsSUFBSSxFQUFFO0FBQ1QsYUFBTyxVQW5CRixPQUFPLENBbUJHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Qjs7OzBCQUNLLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbEIsVUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDMUIsYUFBTyxVQXZCRixPQUFPLENBdUJHLE9BQU8sRUFBRSxDQUFDO0tBQzFCOzs7U0FYVSxrQkFBa0I7R0FBUyxZQUFZOztJQWN2QyxZQUFZLFdBQVosWUFBWTtBQUN2QixXQURXLFlBQVksQ0FDWCxPQUFPLEVBQUU7MEJBRFYsWUFBWTs7QUFFckIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7R0FDeEI7O2VBSFUsWUFBWTs7eUJBSWxCLElBQUksRUFBRTtBQUNULGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7OzswQkFDSyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ2xCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3pDOzs7U0FUVSxZQUFZIiwiZmlsZSI6ImNhY2hlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGNsYXNzIENhY2hlQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIGZpbmQoY29kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSByZWZlciB0byB0aGUgaW1wbGVtZW50YXRpb24gdG8gZXhhbWluZSB0aGUgY2FjaGUuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lbW9yeUNhY2hlQWRhcHRlciBleHRlbmRzIENhY2hlQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kaWN0cyA9IHt9O1xuICB9XG4gIGZpbmQoY29kZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgdGhpcy5kaWN0c1twcmVmaXhdID0gZGljdDtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhY2hlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICB0aGlzLmFkYXB0ZXIgPSBhZGFwdGVyO1xuICB9XG4gIGZpbmQoY29kZSkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZmluZChjb2RlKTtcbiAgfVxuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnN0b3JlKHByZWZpeCwgZGljdCk7XG4gIH1cbn1cbiJdfQ==