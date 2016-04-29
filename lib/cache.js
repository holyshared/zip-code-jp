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
    this.dicts = {};
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
    const dict = this.dicts[prefix];

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
    this.dicts[prefix] = dict;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRU8sTUFBTSxZQUFOLENBQW1COzs7Ozs7O0FBT3hCLE9BQUssTUFBTCxFQUFhO0FBQ1gsVUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOO0FBQ0Q7Ozs7Ozs7OztBQVNELFFBQU0sTUFBTixFQUFjLElBQWQsRUFBb0I7QUFDbEIsVUFBTSxJQUFJLEtBQUosQ0FBVSwwREFBVixDQUFOO0FBQ0Q7QUFwQnVCOztRQUFiLFksR0FBQSxZO0FBdUJOLE1BQU0sa0JBQU4sU0FBaUMsWUFBakMsQ0FBOEM7QUFDbkQsZ0JBQWM7QUFDWjtBQUNBLFNBQUssS0FBTCxHQUFhLEVBQWI7QUFDRDs7Ozs7Ozs7QUFRRCxPQUFLLE1BQUwsRUFBYTtBQUNYLFVBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWI7O0FBRUEsUUFBSSxDQUFDLElBQUwsRUFBVztBQUNULGFBQU8sa0JBQVEsT0FBUixDQUFnQixJQUFoQixDQUFQO0FBQ0Q7O0FBRUQsV0FBTyxrQkFBUSxPQUFSLENBQWdCLElBQWhCLENBQVA7QUFDRDs7Ozs7Ozs7O0FBU0QsUUFBTSxNQUFOLEVBQWMsSUFBZCxFQUFvQjtBQUNsQixTQUFLLEtBQUwsQ0FBVyxNQUFYLElBQXFCLElBQXJCO0FBQ0EsV0FBTyxrQkFBUSxPQUFSLEVBQVA7QUFDRDtBQWhDa0Q7O1FBQXhDLGtCLEdBQUEsa0I7QUFtQ04sTUFBTSxZQUFOLENBQW1CO0FBQ3hCLGNBQVksT0FBWixFQUFxQjtBQUNuQixTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0Q7Ozs7Ozs7O0FBUUQsT0FBSyxNQUFMLEVBQWE7QUFDWCxXQUFPLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsTUFBbEIsQ0FBUDtBQUNEOzs7Ozs7Ozs7QUFTRCxRQUFNLE1BQU4sRUFBYyxJQUFkLEVBQW9CO0FBQ2xCLFdBQU8sS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixNQUFuQixFQUEyQixJQUEzQixDQUFQO0FBQ0Q7QUF4QnVCO1FBQWIsWSxHQUFBLFkiLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgY2xhc3MgQ2FjaGVBZGFwdGVyIHtcbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBmaW5kKHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgZGljdGlvbmFyeVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcmVmZXIgdG8gdGhlIGltcGxlbWVudGF0aW9uIHRvIGV4YW1pbmUgdGhlIGNhY2hlLicpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZW1vcnlDYWNoZUFkYXB0ZXIgZXh0ZW5kcyBDYWNoZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZGljdHMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgZmluZChwcmVmaXgpIHtcbiAgICBjb25zdCBkaWN0ID0gdGhpcy5kaWN0c1twcmVmaXhdO1xuXG4gICAgaWYgKCFkaWN0KSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGljdCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FjaGUgdGhlIGRpY3Rpb25hcnlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcGFyYW0ge09iamVjdH0gZGljdFxuICAgKiBAcmV0dXJuIFByb21pc2U8dm9pZD5cbiAgICovXG4gIHN0b3JlKHByZWZpeCwgZGljdCkge1xuICAgIHRoaXMuZGljdHNbcHJlZml4XSA9IGRpY3Q7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2ggdGhlIGRpY3Rpb25hcnkgZnJvbSB0aGUgY2FjaGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKi9cbiAgZmluZChwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmZpbmQocHJlZml4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB0aGUgZGljdGlvbmFyeVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgc3RvcmUocHJlZml4LCBkaWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5zdG9yZShwcmVmaXgsIGRpY3QpO1xuICB9XG59XG4iXX0=