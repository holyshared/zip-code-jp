'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheableDictionaryLoader = exports.DictionaryLoader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

var DictionaryLoader = exports.DictionaryLoader = function () {
  function DictionaryLoader() {
    _classCallCheck(this, DictionaryLoader);
  }

  _createClass(DictionaryLoader, [{
    key: 'loadFromPrefix',

    /**
     * Search the dictionary from the cache
     *
     * @param {string} prefix
     * @return Promise<Object>
     */
    value: function loadFromPrefix(prefix) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }
  }]);

  return DictionaryLoader;
}();

var CacheableDictionaryLoader = exports.CacheableDictionaryLoader = function (_DictionaryLoader) {
  _inherits(CacheableDictionaryLoader, _DictionaryLoader);

  function CacheableDictionaryLoader(adapter) {
    _classCallCheck(this, CacheableDictionaryLoader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CacheableDictionaryLoader).call(this));

    _this.cacheManager = new _cache.CacheManager(adapter);
    return _this;
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */


  _createClass(CacheableDictionaryLoader, [{
    key: 'loadFromPrefix',
    value: function loadFromPrefix(prefix) {
      var _this2 = this;

      return _bluebird.Promise.bind(this).then(function () {
        return _this2.loadAddressDictionaryFromCache(prefix);
      }).then(function (dict) {
        if (dict) {
          return dict;
        }
        return _this2.loadAddressDictionaryFromFile(prefix);
      });
    }
  }, {
    key: 'loadAddressDictionaryFromCache',
    value: function loadAddressDictionaryFromCache(prefix) {
      return this.cacheManager.find(prefix);
    }
  }, {
    key: 'loadAddressDictionaryFromFile',
    value: function loadAddressDictionaryFromFile(prefix) {
      var _this3 = this;

      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return _bluebird.Promise.bind(this).then(function () {
        return readFile(file);
      }).then(function (content) {
        var dict = null;
        try {
          dict = JSON.parse(content);
        } catch (err) {
          return _bluebird.Promise.reject(err);
        }
        var returnValue = function returnValue() {
          return _bluebird.Promise.resolve(dict);
        };
        return _this3.cacheManager.store(prefix, dict).then(returnValue);
      });
    }
  }]);

  return CacheableDictionaryLoader;
}(DictionaryLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFdBQVcsa0JBQVEsU0FBUixDQUFrQixhQUFHLFFBQXJCLENBQWpCOztJQUVhLGdCLFdBQUEsZ0I7V0FBQSxnQjswQkFBQSxnQjs7O2VBQUEsZ0I7Ozs7Ozs7OzttQ0FPSSxNLEVBQVE7QUFDckIsWUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOO0FBQ0Q7OztTQVRVLGdCOzs7SUFZQSx5QixXQUFBLHlCO1lBQUEseUI7O0FBQ1gsV0FEVyx5QkFDWCxDQUFZLE9BQVosRUFBcUI7QUFBQSwwQkFEVix5QkFDVTs7QUFBQSx1RUFEVix5QkFDVTs7QUFFbkIsVUFBSyxZQUFMLEdBQW9CLHdCQUFpQixPQUFqQixDQUFwQjtBQUZtQjtBQUdwQjs7Ozs7Ozs7OztlQUpVLHlCOzttQ0FZSSxNLEVBQVE7QUFBQTs7QUFDckIsYUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixZQUFNO0FBQ25DLGVBQU8sT0FBSyw4QkFBTCxDQUFvQyxNQUFwQyxDQUFQO0FBQ0QsT0FGTSxFQUVKLElBRkksQ0FFQyxVQUFDLElBQUQsRUFBVTtBQUNoQixZQUFJLElBQUosRUFBVTtBQUNSLGlCQUFPLElBQVA7QUFDRDtBQUNELGVBQU8sT0FBSyw2QkFBTCxDQUFtQyxNQUFuQyxDQUFQO0FBQ0QsT0FQTSxDQUFQO0FBUUQ7OzttREFDOEIsTSxFQUFRO0FBQ3JDLGFBQU8sS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLE1BQXZCLENBQVA7QUFDRDs7O2tEQUM2QixNLEVBQVE7QUFBQTs7QUFDcEMsVUFBTSxPQUFPLGVBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsVUFBckIsRUFBaUMsU0FBUyxNQUFULEdBQWtCLE9BQW5ELENBQWI7O0FBRUEsYUFBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixZQUFNO0FBQ25DLGVBQU8sU0FBUyxJQUFULENBQVA7QUFDRCxPQUZNLEVBRUosSUFGSSxDQUVDLFVBQUMsT0FBRCxFQUFhO0FBQ25CLFlBQUksT0FBTyxJQUFYO0FBQ0EsWUFBSTtBQUNGLGlCQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBUDtBQUNELFNBRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWTtBQUNaLGlCQUFPLGtCQUFRLE1BQVIsQ0FBZSxHQUFmLENBQVA7QUFDRDtBQUNELFlBQU0sY0FBYyxTQUFkLFdBQWM7QUFBQSxpQkFBTSxrQkFBUSxPQUFSLENBQWdCLElBQWhCLENBQU47QUFBQSxTQUFwQjtBQUNBLGVBQU8sT0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQXdCLE1BQXhCLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDLENBQTJDLFdBQTNDLENBQVA7QUFDRCxPQVhNLENBQVA7QUFZRDs7O1NBeENVLHlCO0VBQWtDLGdCIiwiZmlsZSI6ImRpY3Rpb25hcnktbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciB9IGZyb20gJy4vY2FjaGUnO1xuXG5jb25zdCByZWFkRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLnJlYWRGaWxlKTtcblxuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlMb2FkZXIge1xuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGxvYWRGcm9tUHJlZml4KHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciBleHRlbmRzIERpY3Rpb25hcnlMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbmV3IENhY2hlTWFuYWdlcihhZGFwdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgbG9hZEZyb21QcmVmaXgocHJlZml4KSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21DYWNoZShwcmVmaXgpO1xuICAgIH0pLnRoZW4oKGRpY3QpID0+IHtcbiAgICAgIGlmIChkaWN0KSB7XG4gICAgICAgIHJldHVybiBkaWN0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUZpbGUocHJlZml4KTtcbiAgICB9KTtcbiAgfVxuICBsb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tQ2FjaGUocHJlZml4KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVNYW5hZ2VyLmZpbmQocHJlZml4KTtcbiAgfVxuICBsb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tRmlsZShwcmVmaXgpIHtcbiAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy8uLi9qc29uJywgJ3ppcC0nICsgcHJlZml4ICsgJy5qc29uJyk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5iaW5kKHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHJlYWRGaWxlKGZpbGUpO1xuICAgIH0pLnRoZW4oKGNvbnRlbnQpID0+IHtcbiAgICAgIGxldCBkaWN0ID0gbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRpY3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSAoKSA9PiBQcm9taXNlLnJlc29sdmUoZGljdCk7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZU1hbmFnZXIuc3RvcmUocHJlZml4LCBkaWN0KS50aGVuKHJldHVyblZhbHVlKTtcbiAgICB9KTtcbiAgfVxufVxuIl19