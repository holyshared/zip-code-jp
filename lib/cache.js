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

    /**
     * Search the dictionary from the cache
     *
     * @param {string} prefix
     * @return Promise<Object>
     */
    value: function find(prefix) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }

    /**
     * Cache the dictionary
     *
     * @param {string} prefix
     * @param {Object} dict
     * @return Promise<void>
     */

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

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */

  _createClass(MemoryCacheAdapter, [{
    key: 'find',
    value: function find(prefix) {
      var dict = this.dicts[prefix];

      if (!dict) {
        return _bluebird.Promise.resolve(null);
      }

      return _bluebird.Promise.resolve(dict);
    }

    /**
     * Cache the dictionary
     *
     * @param {string} prefix
     * @param {Object} dict
     * @return Promise<void>
     */

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

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */

  _createClass(CacheManager, [{
    key: 'find',
    value: function find(prefix) {
      return this.adapter.find(prefix);
    }

    /**
     * Cache the dictionary
     *
     * @param {string} prefix
     * @param {Object} dict
     * @return Promise<void>
     */

  }, {
    key: 'store',
    value: function store(prefix, dict) {
      return this.adapter.store(prefix, dict);
    }
  }]);

  return CacheManager;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUVhLFlBQVksV0FBWixZQUFZO1dBQVosWUFBWTswQkFBWixZQUFZOzs7ZUFBWixZQUFZOzs7Ozs7Ozs7eUJBT2xCLE1BQU0sRUFBRTtBQUNYLFlBQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztLQUM3RTs7Ozs7Ozs7Ozs7OzBCQVNLLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbEIsWUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0tBQzdFOzs7U0FwQlUsWUFBWTs7O0lBdUJaLGtCQUFrQixXQUFsQixrQkFBa0I7WUFBbEIsa0JBQWtCOztBQUM3QixXQURXLGtCQUFrQixHQUNmOzBCQURILGtCQUFrQjs7dUVBQWxCLGtCQUFrQjs7QUFHM0IsVUFBSyxLQUFLLEdBQUcsRUFBRSxDQUFDOztHQUNqQjs7Ozs7Ozs7QUFBQTtlQUpVLGtCQUFrQjs7eUJBWXhCLE1BQU0sRUFBRTtBQUNYLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWhDLFVBQUksQ0FBQyxJQUFJLEVBQUU7QUFDVCxlQUFPLFVBekNKLE9BQU8sQ0F5Q0ssT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzlCOztBQUVELGFBQU8sVUE1Q0YsT0FBTyxDQTRDRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7Ozs7Ozs7Ozs7OzswQkFTSyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ2xCLFVBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGFBQU8sVUF4REYsT0FBTyxDQXdERyxPQUFPLEVBQUUsQ0FBQztLQUMxQjs7O1NBaENVLGtCQUFrQjtHQUFTLFlBQVk7O0lBbUN2QyxZQUFZLFdBQVosWUFBWTtBQUN2QixXQURXLFlBQVksQ0FDWCxPQUFPLEVBQUU7MEJBRFYsWUFBWTs7QUFFckIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7R0FDeEI7Ozs7Ozs7O0FBQUE7ZUFIVSxZQUFZOzt5QkFXbEIsTUFBTSxFQUFFO0FBQ1gsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsQzs7Ozs7Ozs7Ozs7OzBCQVNLLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbEIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekM7OztTQXhCVSxZQUFZIiwiZmlsZSI6ImNhY2hlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGNsYXNzIENhY2hlQWRhcHRlciB7XG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgZmluZChwcmVmaXgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSByZWZlciB0byB0aGUgaW1wbGVtZW50YXRpb24gdG8gZXhhbWluZSB0aGUgY2FjaGUuJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2FjaGUgdGhlIGRpY3Rpb25hcnlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcGFyYW0ge09iamVjdH0gZGljdFxuICAgKiBAcmV0dXJuIFByb21pc2U8dm9pZD5cbiAgICovXG4gIHN0b3JlKHByZWZpeCwgZGljdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWVtb3J5Q2FjaGVBZGFwdGVyIGV4dGVuZHMgQ2FjaGVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmRpY3RzID0ge307XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGZpbmQocHJlZml4KSB7XG4gICAgY29uc3QgZGljdCA9IHRoaXMuZGljdHNbcHJlZml4XTtcblxuICAgIGlmICghZGljdCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRpY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRoZSBkaWN0aW9uYXJ5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHBhcmFtIHtPYmplY3R9IGRpY3RcbiAgICogQHJldHVybiBQcm9taXNlPHZvaWQ+XG4gICAqL1xuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICB0aGlzLmRpY3RzW3ByZWZpeF0gPSBkaWN0O1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHRoaXMuYWRhcHRlciA9IGFkYXB0ZXI7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGZpbmQocHJlZml4KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5maW5kKHByZWZpeCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FjaGUgdGhlIGRpY3Rpb25hcnlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcGFyYW0ge09iamVjdH0gZGljdFxuICAgKiBAcmV0dXJuIFByb21pc2U8dm9pZD5cbiAgICovXG4gIHN0b3JlKHByZWZpeCwgZGljdCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuc3RvcmUocHJlZml4LCBkaWN0KTtcbiAgfVxufVxuIl19