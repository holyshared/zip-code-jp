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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFdBQVcsa0JBQVEsU0FBUixDQUFrQixhQUFHLFFBQUgsQ0FBN0I7O0lBRU87Ozs7Ozs7Ozs7Ozs7O21DQU9JLFFBQVE7QUFDckIsWUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOLENBRHFCOzs7O1NBUFo7OztJQVlBOzs7QUFDWCxXQURXLHlCQUNYLENBQVksT0FBWixFQUFxQjswQkFEViwyQkFDVTs7dUVBRFYsdUNBQ1U7O0FBRW5CLFVBQUssWUFBTCxHQUFvQix3QkFBaUIsT0FBakIsQ0FBcEIsQ0FGbUI7O0dBQXJCOzs7Ozs7Ozs7O2VBRFc7O21DQVlJLFFBQVE7OztBQUNyQixhQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLFlBQU07QUFDbkMsZUFBTyxPQUFLLDhCQUFMLENBQW9DLE1BQXBDLENBQVAsQ0FEbUM7T0FBTixDQUF4QixDQUVKLElBRkksQ0FFQyxVQUFDLElBQUQsRUFBVTtBQUNoQixZQUFJLElBQUosRUFBVTtBQUNSLGlCQUFPLElBQVAsQ0FEUTtTQUFWO0FBR0EsZUFBTyxPQUFLLDZCQUFMLENBQW1DLE1BQW5DLENBQVAsQ0FKZ0I7T0FBVixDQUZSLENBRHFCOzs7O21EQVVRLFFBQVE7QUFDckMsYUFBTyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsTUFBdkIsQ0FBUCxDQURxQzs7OztrREFHVCxRQUFROzs7QUFDcEMsVUFBTSxPQUFPLGVBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsVUFBckIsRUFBaUMsU0FBUyxNQUFULEdBQWtCLE9BQWxCLENBQXhDLENBRDhCOztBQUdwQyxhQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLFlBQU07QUFDbkMsZUFBTyxTQUFTLElBQVQsQ0FBUCxDQURtQztPQUFOLENBQXhCLENBRUosSUFGSSxDQUVDLFVBQUMsT0FBRCxFQUFhO0FBQ25CLFlBQUksT0FBTyxJQUFQLENBRGU7QUFFbkIsWUFBSTtBQUNGLGlCQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBUCxDQURFO1NBQUosQ0FFRSxPQUFPLEdBQVAsRUFBWTtBQUNaLGlCQUFPLGtCQUFRLE1BQVIsQ0FBZSxHQUFmLENBQVAsQ0FEWTtTQUFaO0FBR0YsWUFBTSxjQUFjLFNBQWQsV0FBYztpQkFBTSxrQkFBUSxPQUFSLENBQWdCLElBQWhCO1NBQU4sQ0FQRDtBQVFuQixlQUFPLE9BQUssWUFBTCxDQUFrQixLQUFsQixDQUF3QixNQUF4QixFQUFnQyxJQUFoQyxFQUFzQyxJQUF0QyxDQUEyQyxXQUEzQyxDQUFQLENBUm1CO09BQWIsQ0FGUixDQUhvQzs7OztTQXpCM0I7RUFBa0MiLCJmaWxlIjoiZGljdGlvbmFyeS1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyIH0gZnJvbSAnLi9jYWNoZSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpO1xuXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeUxvYWRlciB7XG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgbG9hZEZyb21QcmVmaXgocHJlZml4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyIGV4dGVuZHMgRGljdGlvbmFyeUxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5jYWNoZU1hbmFnZXIgPSBuZXcgQ2FjaGVNYW5hZ2VyKGFkYXB0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBsb2FkRnJvbVByZWZpeChwcmVmaXgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5iaW5kKHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCk7XG4gICAgfSkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKGRpY3QpIHtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tRmlsZShwcmVmaXgpO1xuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21DYWNoZShwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZU1hbmFnZXIuZmluZChwcmVmaXgpO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCkge1xuICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLy4uL2pzb24nLCAnemlwLScgKyBwcmVmaXggKyAnLmpzb24nKTtcblxuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gcmVhZEZpbGUoZmlsZSk7XG4gICAgfSkudGhlbigoY29udGVudCkgPT4ge1xuICAgICAgbGV0IGRpY3QgPSBudWxsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGljdCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgICBjb25zdCByZXR1cm5WYWx1ZSA9ICgpID0+IFByb21pc2UucmVzb2x2ZShkaWN0KTtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlTWFuYWdlci5zdG9yZShwcmVmaXgsIGRpY3QpLnRoZW4ocmV0dXJuVmFsdWUpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=