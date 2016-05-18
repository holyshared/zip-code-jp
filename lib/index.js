'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dict = exports.cache = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

var _dictionaryLoader = require('./dictionary-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cache = exports.cache = {
  CacheManager: _cache.CacheManager,
  CacheAdapter: _cache.CacheAdapter,
  MemoryCacheAdapter: _cache.MemoryCacheAdapter
};

const dict = exports.dict = {
  DictionaryLoader: _dictionaryLoader.DictionaryLoader,
  CacheableDictionaryLoader: _dictionaryLoader.CacheableDictionaryLoader
};

const readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

class AddressResolver {
  constructor() {
    let adapter = arguments.length <= 0 || arguments[0] === undefined ? new _cache.MemoryCacheAdapter() : arguments[0];

    this.dictLoader = new _dictionaryLoader.CacheableDictionaryLoader(adapter);
  }

  /**
   * Find the address from the postal code
   *
   * @param {string} code
   * @return Promise<Object>
   * @throws {AddressNotFoundError} Thrown if the address is not found
   */
  find(code) {
    return this.verifyCode(code).then(result => {
      if (!result.passed) {
        return this.emptyResult();
      }
      return this.loadAddressByCode(result.postalCode);
    });
  }
  verifyCode(code) {
    const postalCode = (code || '').replace(/-/, '');
    const result = postalCode.length < 7 ? false : true;

    return _bluebird.Promise.resolve({
      passed: result,
      postalCode: postalCode
    });
  }
  loadAddressByCode(postalCode) {
    const prefix = postalCode.substr(0, 3);

    return this.dictLoader.loadFromPrefix(prefix).then(dict => {
      if (!dict[postalCode]) {
        return this.emptyResult();
      }
      const results = dict[postalCode] || null;
      return results;
    });
  }
  emptyResult() {
    return _bluebird.Promise.resolve(null);
  }
}
exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRU8sTUFBTSx3QkFBUTtBQUNuQixtQ0FEbUI7QUFFbkIsbUNBRm1CO0FBR25CO0FBSG1CLENBQWQ7O0FBTUEsTUFBTSxzQkFBTztBQUNsQixzREFEa0I7QUFFbEI7QUFGa0IsQ0FBYjs7QUFLUCxNQUFNLFdBQVcsa0JBQVEsU0FBUixDQUFrQixhQUFHLFFBQXJCLENBQWpCOztBQUVlLE1BQU0sZUFBTixDQUFzQjtBQUNuQyxnQkFBZ0Q7QUFBQSxRQUFwQyxPQUFvQyx5REFBMUIsK0JBQTBCOztBQUM5QyxTQUFLLFVBQUwsR0FBa0IsZ0RBQThCLE9BQTlCLENBQWxCO0FBQ0Q7Ozs7Ozs7OztBQVNELE9BQUssSUFBTCxFQUFXO0FBQ1QsV0FBTyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsQ0FBNEIsTUFBRCxJQUFZO0FBQzVDLFVBQUksQ0FBQyxPQUFPLE1BQVosRUFBb0I7QUFDbEIsZUFBTyxLQUFLLFdBQUwsRUFBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLLGlCQUFMLENBQXVCLE9BQU8sVUFBOUIsQ0FBUDtBQUNELEtBTE0sQ0FBUDtBQU1EO0FBQ0QsYUFBVyxJQUFYLEVBQWlCO0FBQ2YsVUFBTSxhQUFhLENBQUMsUUFBUSxFQUFULEVBQWEsT0FBYixDQUFxQixHQUFyQixFQUEwQixFQUExQixDQUFuQjtBQUNBLFVBQU0sU0FBVSxXQUFXLE1BQVgsR0FBb0IsQ0FBckIsR0FBMEIsS0FBMUIsR0FBa0MsSUFBakQ7O0FBRUEsV0FBTyxrQkFBUSxPQUFSLENBQWdCO0FBQ3JCLGNBQVEsTUFEYTtBQUVyQixrQkFBWTtBQUZTLEtBQWhCLENBQVA7QUFJRDtBQUNELG9CQUFrQixVQUFsQixFQUE4QjtBQUM1QixVQUFNLFNBQVMsV0FBVyxNQUFYLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLENBQWY7O0FBRUEsV0FBTyxLQUFLLFVBQUwsQ0FBZ0IsY0FBaEIsQ0FBK0IsTUFBL0IsRUFBdUMsSUFBdkMsQ0FBNkMsSUFBRCxJQUFVO0FBQzNELFVBQUksQ0FBQyxLQUFLLFVBQUwsQ0FBTCxFQUF1QjtBQUNyQixlQUFPLEtBQUssV0FBTCxFQUFQO0FBQ0Q7QUFDRCxZQUFNLFVBQVUsS0FBSyxVQUFMLEtBQW9CLElBQXBDO0FBQ0EsYUFBTyxPQUFQO0FBQ0QsS0FOTSxDQUFQO0FBT0Q7QUFDRCxnQkFBYztBQUNaLFdBQU8sa0JBQVEsT0FBUixDQUFnQixJQUFoQixDQUFQO0FBQ0Q7QUExQ2tDO2tCQUFoQixlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciwgTWVtb3J5Q2FjaGVBZGFwdGVyLCBDYWNoZUFkYXB0ZXIgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIsIERpY3Rpb25hcnlMb2FkZXIgfSBmcm9tICcuL2RpY3Rpb25hcnktbG9hZGVyJztcblxuZXhwb3J0IGNvbnN0IGNhY2hlID0ge1xuICBDYWNoZU1hbmFnZXI6IENhY2hlTWFuYWdlcixcbiAgQ2FjaGVBZGFwdGVyOiBDYWNoZUFkYXB0ZXIsXG4gIE1lbW9yeUNhY2hlQWRhcHRlcjogTWVtb3J5Q2FjaGVBZGFwdGVyXG59O1xuXG5leHBvcnQgY29uc3QgZGljdCA9IHtcbiAgRGljdGlvbmFyeUxvYWRlcjogRGljdGlvbmFyeUxvYWRlcixcbiAgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcjogQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlclxufTtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSBuZXcgTWVtb3J5Q2FjaGVBZGFwdGVyKCkpIHtcbiAgICB0aGlzLmRpY3RMb2FkZXIgPSBuZXcgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcihhZGFwdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBhZGRyZXNzIGZyb20gdGhlIHBvc3RhbCBjb2RlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqIEB0aHJvd3Mge0FkZHJlc3NOb3RGb3VuZEVycm9yfSBUaHJvd24gaWYgdGhlIGFkZHJlc3MgaXMgbm90IGZvdW5kXG4gICAqL1xuICBmaW5kKGNvZGUpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJpZnlDb2RlKGNvZGUpLnRoZW4oKHJlc3VsdCkgPT7jgIB7XG4gICAgICBpZiAoIXJlc3VsdC5wYXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzQnlDb2RlKHJlc3VsdC5wb3N0YWxDb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gKGNvZGUgfHwgJycpLnJlcGxhY2UoLy0vLCAnJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gKHBvc3RhbENvZGUubGVuZ3RoIDwgNykgPyBmYWxzZSA6IHRydWU7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIHBhc3NlZDogcmVzdWx0LFxuICAgICAgcG9zdGFsQ29kZTogcG9zdGFsQ29kZVxuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzQnlDb2RlKHBvc3RhbENvZGUpIHtcbiAgICBjb25zdCBwcmVmaXggPSBwb3N0YWxDb2RlLnN1YnN0cigwLCAzKTtcblxuICAgIHJldHVybiB0aGlzLmRpY3RMb2FkZXIubG9hZEZyb21QcmVmaXgocHJlZml4KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoIWRpY3RbcG9zdGFsQ29kZV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBkaWN0W3Bvc3RhbENvZGVdIHx8IG51bGw7XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KTtcbiAgfVxuICBlbXB0eVJlc3VsdCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG59XG4iXX0=