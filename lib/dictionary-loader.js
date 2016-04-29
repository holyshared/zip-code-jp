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
    return _bluebird.Promise.bind(this).then(() => {
      return this.loadAddressDictionaryFromCache(prefix);
    }).then(dict => {
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

    return _bluebird.Promise.bind(this).then(() => {
      return readFile(file);
    }).then(content => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxXQUFXLGtCQUFRLFNBQVIsQ0FBa0IsYUFBRyxRQUFyQixDQUFqQjs7QUFFTyxNQUFNLGdCQUFOLENBQXVCOzs7Ozs7O0FBTzVCLGlCQUFlLE1BQWYsRUFBdUI7QUFDckIsVUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOO0FBQ0Q7QUFUMkI7O1FBQWpCLGdCLEdBQUEsZ0I7QUFZTixNQUFNLHlCQUFOLFNBQXdDLGdCQUF4QyxDQUF5RDtBQUM5RCxjQUFZLE9BQVosRUFBcUI7QUFDbkI7QUFDQSxTQUFLLFlBQUwsR0FBb0Isd0JBQWlCLE9BQWpCLENBQXBCO0FBQ0Q7Ozs7Ozs7O0FBUUQsaUJBQWUsTUFBZixFQUF1QjtBQUNyQixXQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQW1CLElBQW5CLENBQXdCLE1BQU07QUFDbkMsYUFBTyxLQUFLLDhCQUFMLENBQW9DLE1BQXBDLENBQVA7QUFDRCxLQUZNLEVBRUosSUFGSSxDQUVFLElBQUQsSUFBVTtBQUNoQixVQUFJLElBQUosRUFBVTtBQUNSLGVBQU8sSUFBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLLDZCQUFMLENBQW1DLE1BQW5DLENBQVA7QUFDRCxLQVBNLENBQVA7QUFRRDtBQUNELGlDQUErQixNQUEvQixFQUF1QztBQUNyQyxXQUFPLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixNQUF2QixDQUFQO0FBQ0Q7QUFDRCxnQ0FBOEIsTUFBOUIsRUFBc0M7QUFDcEMsVUFBTSxPQUFPLGVBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsVUFBckIsRUFBaUMsU0FBUyxNQUFULEdBQWtCLE9BQW5ELENBQWI7O0FBRUEsV0FBTyxrQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixJQUFuQixDQUF3QixNQUFNO0FBQ25DLGFBQU8sU0FBUyxJQUFULENBQVA7QUFDRCxLQUZNLEVBRUosSUFGSSxDQUVFLE9BQUQsSUFBYTtBQUNuQixVQUFJLE9BQU8sSUFBWDtBQUNBLFVBQUk7QUFDRixlQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBUDtBQUNELE9BRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWTtBQUNaLGVBQU8sa0JBQVEsTUFBUixDQUFlLEdBQWYsQ0FBUDtBQUNEO0FBQ0QsWUFBTSxjQUFjLE1BQU0sa0JBQVEsT0FBUixDQUFnQixJQUFoQixDQUExQjtBQUNBLGFBQU8sS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQXdCLE1BQXhCLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDLENBQTJDLFdBQTNDLENBQVA7QUFDRCxLQVhNLENBQVA7QUFZRDtBQXhDNkQ7UUFBbkQseUIsR0FBQSx5QiIsImZpbGUiOiJkaWN0aW9uYXJ5LWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBDYWNoZU1hbmFnZXIgfSBmcm9tICcuL2NhY2hlJztcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5TG9hZGVyIHtcbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBsb2FkRnJvbVByZWZpeChwcmVmaXgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSByZWZlciB0byB0aGUgaW1wbGVtZW50YXRpb24gdG8gZXhhbWluZSB0aGUgY2FjaGUuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIgZXh0ZW5kcyBEaWN0aW9uYXJ5TG9hZGVyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG5ldyBDYWNoZU1hbmFnZXIoYWRhcHRlcik7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGxvYWRGcm9tUHJlZml4KHByZWZpeCkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tQ2FjaGUocHJlZml4KTtcbiAgICB9KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoZGljdCkge1xuICAgICAgICByZXR1cm4gZGljdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCk7XG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlTWFuYWdlci5maW5kKHByZWZpeCk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUZpbGUocHJlZml4KSB7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiByZWFkRmlsZShmaWxlKTtcbiAgICB9KS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICBsZXQgZGljdCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBkaWN0ID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGRpY3QpO1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVNYW5hZ2VyLnN0b3JlKHByZWZpeCwgZGljdCkudGhlbihyZXR1cm5WYWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==