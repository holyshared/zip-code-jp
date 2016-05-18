'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheableDictionaryLoader = exports.DictionaryLoader = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

class DictionaryLoader {
  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  loadFromPrefix(prefix) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

exports.DictionaryLoader = DictionaryLoader;
class CacheableDictionaryLoader extends DictionaryLoader {
  constructor(adapter) {
    super();
    this.cacheManager = new _cache.CacheManager(adapter);
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  loadFromPrefix(prefix) {
    return this.loadAddressDictionaryFromCache(prefix).then(dict => {
      if (dict) {
        return dict;
      }
      return this.loadAddressDictionaryFromFile(prefix);
    });
  }
  loadAddressDictionaryFromCache(prefix) {
    return this.cacheManager.find(prefix);
  }
  loadAddressDictionaryFromFile(prefix) {
    const file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

    return readFile(file).then(content => {
      let dict = null;
      try {
        dict = JSON.parse(content);
      } catch (err) {
        return _bluebird.Promise.reject(err);
      }
      const returnValue = () => _bluebird.Promise.resolve(dict);
      return this.cacheManager.store(prefix, dict).then(returnValue);
    });
  }
}
exports.CacheableDictionaryLoader = CacheableDictionaryLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxXQUFXLGtCQUFRLFNBQVIsQ0FBa0IsYUFBRyxRQUFILENBQTdCOztBQUVDLE1BQU0sZ0JBQU4sQ0FBdUI7Ozs7Ozs7QUFPNUIsaUJBQWUsTUFBZixFQUF1QjtBQUNyQixVQUFNLElBQUksS0FBSixDQUFVLDBEQUFWLENBQU4sQ0FEcUI7R0FBdkI7Q0FQSzs7UUFBTTtBQVlOLE1BQU0seUJBQU4sU0FBd0MsZ0JBQXhDLENBQXlEO0FBQzlELGNBQVksT0FBWixFQUFxQjtBQUNuQixZQURtQjtBQUVuQixTQUFLLFlBQUwsR0FBb0Isd0JBQWlCLE9BQWpCLENBQXBCLENBRm1CO0dBQXJCOzs7Ozs7OztBQUQ4RCxnQkFZOUQsQ0FBZSxNQUFmLEVBQXVCO0FBQ3JCLFdBQU8sS0FBSyw4QkFBTCxDQUFvQyxNQUFwQyxFQUE0QyxJQUE1QyxDQUFpRCxRQUFVO0FBQ2hFLFVBQUksSUFBSixFQUFVO0FBQ1IsZUFBTyxJQUFQLENBRFE7T0FBVjtBQUdBLGFBQU8sS0FBSyw2QkFBTCxDQUFtQyxNQUFuQyxDQUFQLENBSmdFO0tBQVYsQ0FBeEQsQ0FEcUI7R0FBdkI7QUFRQSxpQ0FBK0IsTUFBL0IsRUFBdUM7QUFDckMsV0FBTyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsTUFBdkIsQ0FBUCxDQURxQztHQUF2QztBQUdBLGdDQUE4QixNQUE5QixFQUFzQztBQUNwQyxVQUFNLE9BQU8sZUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixVQUFyQixFQUFpQyxTQUFTLE1BQVQsR0FBa0IsT0FBbEIsQ0FBeEMsQ0FEOEI7O0FBR3BDLFdBQU8sU0FBUyxJQUFULEVBQWUsSUFBZixDQUFvQixXQUFhO0FBQ3RDLFVBQUksT0FBTyxJQUFQLENBRGtDO0FBRXRDLFVBQUk7QUFDRixlQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBUCxDQURFO09BQUosQ0FFRSxPQUFPLEdBQVAsRUFBWTtBQUNaLGVBQU8sa0JBQVEsTUFBUixDQUFlLEdBQWYsQ0FBUCxDQURZO09BQVo7QUFHRixZQUFNLGNBQWMsTUFBTSxrQkFBUSxPQUFSLENBQWdCLElBQWhCLENBQU4sQ0FQa0I7QUFRdEMsYUFBTyxLQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBd0IsTUFBeEIsRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsQ0FBMkMsV0FBM0MsQ0FBUCxDQVJzQztLQUFiLENBQTNCLENBSG9DO0dBQXRDO0NBdkJLO1FBQU0iLCJmaWxlIjoiZGljdGlvbmFyeS1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyIH0gZnJvbSAnLi9jYWNoZSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpO1xuXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeUxvYWRlciB7XG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgbG9hZEZyb21QcmVmaXgocHJlZml4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyIGV4dGVuZHMgRGljdGlvbmFyeUxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5jYWNoZU1hbmFnZXIgPSBuZXcgQ2FjaGVNYW5hZ2VyKGFkYXB0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBsb2FkRnJvbVByZWZpeChwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tQ2FjaGUocHJlZml4KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoZGljdCkge1xuICAgICAgICByZXR1cm4gZGljdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCk7XG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlTWFuYWdlci5maW5kKHByZWZpeCk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUZpbGUocHJlZml4KSB7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGUpLnRoZW4oKGNvbnRlbnQpID0+IHtcbiAgICAgIGxldCBkaWN0ID0gbnVsbDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRpY3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgfVxuICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSAoKSA9PiBQcm9taXNlLnJlc29sdmUoZGljdCk7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZU1hbmFnZXIuc3RvcmUocHJlZml4LCBkaWN0KS50aGVuKHJldHVyblZhbHVlKTtcbiAgICB9KTtcbiAgfVxufVxuIl19