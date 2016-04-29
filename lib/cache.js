'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManager = exports.MemoryCacheAdapter = exports.CacheAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CacheAdapter = exports.CacheAdapter = function () {
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
}();

var MemoryCacheAdapter = exports.MemoryCacheAdapter = function (_CacheAdapter) {
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
}(CacheAdapter);

var CacheManager = exports.CacheManager = function () {
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
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFYSxZLFdBQUEsWTtXQUFBLFk7MEJBQUEsWTs7O2VBQUEsWTs7Ozs7Ozs7O3lCQU9OLE0sRUFBUTtBQUNYLFlBQU0sSUFBSSxLQUFKLENBQVUsMERBQVYsQ0FBTjtBQUNEOzs7Ozs7Ozs7Ozs7MEJBU0ssTSxFQUFRLEksRUFBTTtBQUNsQixZQUFNLElBQUksS0FBSixDQUFVLDBEQUFWLENBQU47QUFDRDs7O1NBcEJVLFk7OztJQXVCQSxrQixXQUFBLGtCO1lBQUEsa0I7O0FBQ1gsV0FEVyxrQkFDWCxHQUFjO0FBQUEsMEJBREgsa0JBQ0c7O0FBQUEsdUVBREgsa0JBQ0c7O0FBRVosVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUZZO0FBR2I7Ozs7Ozs7Ozs7ZUFKVSxrQjs7eUJBWU4sTSxFQUFRO0FBQ1gsVUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBYjs7QUFFQSxVQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1QsZUFBTyxrQkFBUSxPQUFSLENBQWdCLElBQWhCLENBQVA7QUFDRDs7QUFFRCxhQUFPLGtCQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7MEJBU0ssTSxFQUFRLEksRUFBTTtBQUNsQixXQUFLLEtBQUwsQ0FBVyxNQUFYLElBQXFCLElBQXJCO0FBQ0EsYUFBTyxrQkFBUSxPQUFSLEVBQVA7QUFDRDs7O1NBaENVLGtCO0VBQTJCLFk7O0lBbUMzQixZLFdBQUEsWTtBQUNYLFdBRFcsWUFDWCxDQUFZLE9BQVosRUFBcUI7QUFBQSwwQkFEVixZQUNVOztBQUNuQixTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7Ozs7Ozs7Ozs7ZUFIVSxZOzt5QkFXTixNLEVBQVE7QUFDWCxhQUFPLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsTUFBbEIsQ0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7MEJBU0ssTSxFQUFRLEksRUFBTTtBQUNsQixhQUFPLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsTUFBbkIsRUFBMkIsSUFBM0IsQ0FBUDtBQUNEOzs7U0F4QlUsWSIsImZpbGUiOiJjYWNoZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBjbGFzcyBDYWNoZUFkYXB0ZXIge1xuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGZpbmQocHJlZml4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRoZSBkaWN0aW9uYXJ5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHBhcmFtIHtPYmplY3R9IGRpY3RcbiAgICogQHJldHVybiBQcm9taXNlPHZvaWQ+XG4gICAqL1xuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSByZWZlciB0byB0aGUgaW1wbGVtZW50YXRpb24gdG8gZXhhbWluZSB0aGUgY2FjaGUuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lbW9yeUNhY2hlQWRhcHRlciBleHRlbmRzIENhY2hlQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5kaWN0cyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBmaW5kKHByZWZpeCkge1xuICAgIGNvbnN0IGRpY3QgPSB0aGlzLmRpY3RzW3ByZWZpeF07XG5cbiAgICBpZiAoIWRpY3QpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkaWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgZGljdGlvbmFyeVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgdGhpcy5kaWN0c1twcmVmaXhdID0gZGljdDtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhY2hlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICB0aGlzLmFkYXB0ZXIgPSBhZGFwdGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBmaW5kKHByZWZpeCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZmluZChwcmVmaXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRoZSBkaWN0aW9uYXJ5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHBhcmFtIHtPYmplY3R9IGRpY3RcbiAgICogQHJldHVybiBQcm9taXNlPHZvaWQ+XG4gICAqL1xuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnN0b3JlKHByZWZpeCwgZGljdCk7XG4gIH1cbn1cbiJdfQ==