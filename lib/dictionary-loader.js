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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxXQUFXLGtCQUFRLFNBQVIsQ0FBa0IsYUFBRyxRQUFyQixDQUFqQjs7QUFFTyxNQUFNLGdCQUFOLENBQXVCOzs7Ozs7O0FBTzVCLGlCQUFlLE1BQWYsRUFBdUI7QUFDckIsVUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOO0FBQ0Q7QUFUMkI7O1FBQWpCLGdCLEdBQUEsZ0I7QUFZTixNQUFNLHlCQUFOLFNBQXdDLGdCQUF4QyxDQUF5RDtBQUM5RCxjQUFZLE9BQVosRUFBcUI7QUFDbkI7QUFDQSxTQUFLLFlBQUwsR0FBb0Isd0JBQWlCLE9BQWpCLENBQXBCO0FBQ0Q7Ozs7Ozs7O0FBUUQsaUJBQWUsTUFBZixFQUF1QjtBQUNyQixXQUFPLEtBQUssOEJBQUwsQ0FBb0MsTUFBcEMsRUFBNEMsSUFBNUMsQ0FBa0QsSUFBRCxJQUFVO0FBQ2hFLFVBQUksSUFBSixFQUFVO0FBQ1IsZUFBTyxJQUFQO0FBQ0Q7QUFDRCxhQUFPLEtBQUssNkJBQUwsQ0FBbUMsTUFBbkMsQ0FBUDtBQUNELEtBTE0sQ0FBUDtBQU1EO0FBQ0QsaUNBQStCLE1BQS9CLEVBQXVDO0FBQ3JDLFdBQU8sS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLE1BQXZCLENBQVA7QUFDRDtBQUNELGdDQUE4QixNQUE5QixFQUFzQztBQUNwQyxVQUFNLE9BQU8sZUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixVQUFyQixFQUFpQyxTQUFTLE1BQVQsR0FBa0IsT0FBbkQsQ0FBYjs7QUFFQSxXQUFPLFNBQVMsSUFBVCxFQUFlLElBQWYsQ0FBcUIsT0FBRCxJQUFhO0FBQ3RDLFVBQUksT0FBTyxJQUFYO0FBQ0EsVUFBSTtBQUNGLGVBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFQO0FBQ0QsT0FGRCxDQUVFLE9BQU8sR0FBUCxFQUFZO0FBQ1osZUFBTyxrQkFBUSxNQUFSLENBQWUsR0FBZixDQUFQO0FBQ0Q7QUFDRCxZQUFNLGNBQWMsTUFBTSxrQkFBUSxPQUFSLENBQWdCLElBQWhCLENBQTFCO0FBQ0EsYUFBTyxLQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBd0IsTUFBeEIsRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsQ0FBMkMsV0FBM0MsQ0FBUDtBQUNELEtBVE0sQ0FBUDtBQVVEO0FBcEM2RDtRQUFuRCx5QixHQUFBLHlCIiwiZmlsZSI6ImRpY3Rpb25hcnktbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciB9IGZyb20gJy4vY2FjaGUnO1xuXG5jb25zdCByZWFkRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLnJlYWRGaWxlKTtcblxuZXhwb3J0IGNsYXNzIERpY3Rpb25hcnlMb2FkZXIge1xuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGxvYWRGcm9tUHJlZml4KHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciBleHRlbmRzIERpY3Rpb25hcnlMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbmV3IENhY2hlTWFuYWdlcihhZGFwdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgbG9hZEZyb21QcmVmaXgocHJlZml4KSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKGRpY3QpIHtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tRmlsZShwcmVmaXgpO1xuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21DYWNoZShwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZU1hbmFnZXIuZmluZChwcmVmaXgpO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCkge1xuICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLy4uL2pzb24nLCAnemlwLScgKyBwcmVmaXggKyAnLmpzb24nKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlKS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICBsZXQgZGljdCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBkaWN0ID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGRpY3QpO1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVNYW5hZ2VyLnN0b3JlKHByZWZpeCwgZGljdCkudGhlbihyZXR1cm5WYWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==