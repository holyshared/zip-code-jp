'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManager = exports.MemoryCacheAdapter = exports.CacheAdapter = undefined;

var _bluebird = require('bluebird');

class CacheAdapter {
  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }

  /**
   * Cache the dictionary
   *
   * @param {string} prefix
   * @param {Object} dict
   * @return Promise<void>
   */
  store(prefix, dict) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

exports.CacheAdapter = CacheAdapter;
class MemoryCacheAdapter extends CacheAdapter {
  constructor() {
    super();
    this.cache = new Map();
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
    const dict = this.cache.get(prefix);

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
  store(prefix, dict) {
    this.cache.set(prefix, dict);
    return _bluebird.Promise.resolve();
  }
}

exports.MemoryCacheAdapter = MemoryCacheAdapter;
class CacheManager {
  constructor(adapter) {
    this.adapter = adapter;
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
    return this.adapter.find(prefix);
  }

  /**
   * Cache the dictionary
   *
   * @param {string} prefix
   * @param {Object} dict
   * @return Promise<void>
   */
  store(prefix, dict) {
    return this.adapter.store(prefix, dict);
  }
}
exports.CacheManager = CacheManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRU8sTUFBTSxZQUFOLENBQW1COzs7Ozs7O0FBT3hCLE9BQUssTUFBTCxFQUFhO0FBQ1gsVUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOLENBRFc7R0FBYjs7Ozs7Ozs7O0FBUHdCLE9Ba0J4QixDQUFNLE1BQU4sRUFBYyxJQUFkLEVBQW9CO0FBQ2xCLFVBQU0sSUFBSSxLQUFKLENBQVUsMERBQVYsQ0FBTixDQURrQjtHQUFwQjtDQWxCSzs7UUFBTTtBQXVCTixNQUFNLGtCQUFOLFNBQWlDLFlBQWpDLENBQThDO0FBQ25ELGdCQUFjO0FBQ1osWUFEWTtBQUVaLFNBQUssS0FBTCxHQUFhLElBQUksR0FBSixFQUFiLENBRlk7R0FBZDs7Ozs7Ozs7QUFEbUQsTUFZbkQsQ0FBSyxNQUFMLEVBQWE7QUFDWCxVQUFNLE9BQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLE1BQWYsQ0FBUCxDQURLOztBQUdYLFFBQUksQ0FBQyxJQUFELEVBQU87QUFDVCxhQUFPLGtCQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBUCxDQURTO0tBQVg7O0FBSUEsV0FBTyxrQkFBUSxPQUFSLENBQWdCLElBQWhCLENBQVAsQ0FQVztHQUFiOzs7Ozs7Ozs7QUFabUQsT0E2Qm5ELENBQU0sTUFBTixFQUFjLElBQWQsRUFBb0I7QUFDbEIsU0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLE1BQWYsRUFBdUIsSUFBdkIsRUFEa0I7QUFFbEIsV0FBTyxrQkFBUSxPQUFSLEVBQVAsQ0FGa0I7R0FBcEI7Q0E3Qks7O1FBQU07QUFtQ04sTUFBTSxZQUFOLENBQW1CO0FBQ3hCLGNBQVksT0FBWixFQUFxQjtBQUNuQixTQUFLLE9BQUwsR0FBZSxPQUFmLENBRG1CO0dBQXJCOzs7Ozs7OztBQUR3QixNQVd4QixDQUFLLE1BQUwsRUFBYTtBQUNYLFdBQU8sS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixNQUFsQixDQUFQLENBRFc7R0FBYjs7Ozs7Ozs7O0FBWHdCLE9Bc0J4QixDQUFNLE1BQU4sRUFBYyxJQUFkLEVBQW9CO0FBQ2xCLFdBQU8sS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixFQUEyQixJQUEzQixDQUFQLENBRGtCO0dBQXBCO0NBdEJLO1FBQU0iLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgY2xhc3MgQ2FjaGVBZGFwdGVyIHtcbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBmaW5kKHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgZGljdGlvbmFyeVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZW1vcnlDYWNoZUFkYXB0ZXIgZXh0ZW5kcyBDYWNoZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2FjaGUgPSBuZXcgTWFwKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGZpbmQocHJlZml4KSB7XG4gICAgY29uc3QgZGljdCA9IHRoaXMuY2FjaGUuZ2V0KHByZWZpeCk7XG5cbiAgICBpZiAoIWRpY3QpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkaWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgZGljdGlvbmFyeVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgdGhpcy5jYWNoZS5zZXQocHJlZml4LCBkaWN0KTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhY2hlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICB0aGlzLmFkYXB0ZXIgPSBhZGFwdGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBmaW5kKHByZWZpeCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZmluZChwcmVmaXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRoZSBkaWN0aW9uYXJ5XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHBhcmFtIHtPYmplY3R9IGRpY3RcbiAgICogQHJldHVybiBQcm9taXNlPHZvaWQ+XG4gICAqL1xuICBzdG9yZShwcmVmaXgsIGRpY3QpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnN0b3JlKHByZWZpeCwgZGljdCk7XG4gIH1cbn1cbiJdfQ==