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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUVhOzs7Ozs7Ozs7Ozs7Ozt5QkFPTixRQUFRO0FBQ1gsWUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOLENBRFc7Ozs7Ozs7Ozs7Ozs7MEJBV1AsUUFBUSxNQUFNO0FBQ2xCLFlBQU0sSUFBSSxLQUFKLENBQVUsMERBQVYsQ0FBTixDQURrQjs7OztTQWxCVDs7O0lBdUJBOzs7QUFDWCxXQURXLGtCQUNYLEdBQWM7MEJBREgsb0JBQ0c7O3VFQURILGdDQUNHOztBQUVaLFVBQUssS0FBTCxHQUFhLEVBQWIsQ0FGWTs7R0FBZDs7Ozs7Ozs7OztlQURXOzt5QkFZTixRQUFRO0FBQ1gsVUFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBUCxDQURLOztBQUdYLFVBQUksQ0FBQyxJQUFELEVBQU87QUFDVCxlQUFPLGtCQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBUCxDQURTO09BQVg7O0FBSUEsYUFBTyxrQkFBUSxPQUFSLENBQWdCLElBQWhCLENBQVAsQ0FQVzs7Ozs7Ozs7Ozs7OzswQkFpQlAsUUFBUSxNQUFNO0FBQ2xCLFdBQUssS0FBTCxDQUFXLE1BQVgsSUFBcUIsSUFBckIsQ0FEa0I7QUFFbEIsYUFBTyxrQkFBUSxPQUFSLEVBQVAsQ0FGa0I7Ozs7U0E3QlQ7RUFBMkI7O0lBbUMzQjtBQUNYLFdBRFcsWUFDWCxDQUFZLE9BQVosRUFBcUI7MEJBRFYsY0FDVTs7QUFDbkIsU0FBSyxPQUFMLEdBQWUsT0FBZixDQURtQjtHQUFyQjs7Ozs7Ozs7OztlQURXOzt5QkFXTixRQUFRO0FBQ1gsYUFBTyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLE1BQWxCLENBQVAsQ0FEVzs7Ozs7Ozs7Ozs7OzswQkFXUCxRQUFRLE1BQU07QUFDbEIsYUFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE1BQW5CLEVBQTJCLElBQTNCLENBQVAsQ0FEa0I7Ozs7U0F0QlQiLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgY2xhc3MgQ2FjaGVBZGFwdGVyIHtcbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBmaW5kKHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgZGljdGlvbmFyeVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZW1vcnlDYWNoZUFkYXB0ZXIgZXh0ZW5kcyBDYWNoZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZGljdHMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgZmluZChwcmVmaXgpIHtcbiAgICBjb25zdCBkaWN0ID0gdGhpcy5kaWN0c1twcmVmaXhdO1xuXG4gICAgaWYgKCFkaWN0KSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGljdCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FjaGUgdGhlIGRpY3Rpb25hcnlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcGFyYW0ge09iamVjdH0gZGljdFxuICAgKiBAcmV0dXJuIFByb21pc2U8dm9pZD5cbiAgICovXG4gIHN0b3JlKHByZWZpeCwgZGljdCkge1xuICAgIHRoaXMuZGljdHNbcHJlZml4XSA9IGRpY3Q7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgZmluZChwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmZpbmQocHJlZml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgZGljdGlvbmFyeVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5zdG9yZShwcmVmaXgsIGRpY3QpO1xuICB9XG59XG4iXX0=