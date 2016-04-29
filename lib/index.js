'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResolvedResult = exports.dict = exports.cache = undefined;

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

const EmptyResult = {
  prefecture: null,
  city: null,
  area: null,
  street: null
};

const readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

class ResolvedResult {
  constructor(prefecture, city, area) {
    let street = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    this.prefecture = prefecture;
    this.city = city;
    this.area = area;
    this.street = street;
  }
  static fromObject(object) {
    return new ResolvedResult(object.prefecture, object.city, object.area, object.street);
  }
  static emptyResult() {
    return Object.create(EmptyResult);
  }
}

exports.ResolvedResult = ResolvedResult;
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
      const address = dict[postalCode];
      return ResolvedResult.fromObject(address);
    });
  }
  emptyResult() {
    return _bluebird.Promise.resolve(null);
  }
}
exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRU8sTUFBTSx3QkFBUTtBQUNuQixtQ0FEbUI7QUFFbkIsbUNBRm1CO0FBR25CO0FBSG1CLENBQWQ7O0FBTUEsTUFBTSxzQkFBTztBQUNsQixzREFEa0I7QUFFbEI7QUFGa0IsQ0FBYjs7QUFLUCxNQUFNLGNBQWM7QUFDbEIsY0FBWSxJQURNO0FBRWxCLFFBQU0sSUFGWTtBQUdsQixRQUFNLElBSFk7QUFJbEIsVUFBUTtBQUpVLENBQXBCOztBQU9BLE1BQU0sV0FBVyxrQkFBUSxTQUFSLENBQWtCLGFBQUcsUUFBckIsQ0FBakI7O0FBRU8sTUFBTSxjQUFOLENBQXFCO0FBQzFCLGNBQVksVUFBWixFQUF3QixJQUF4QixFQUE4QixJQUE5QixFQUFtRDtBQUFBLFFBQWYsTUFBZSx5REFBTixJQUFNOztBQUNqRCxTQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDQSxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssTUFBTCxHQUFjLE1BQWQ7QUFDRDtBQUNELFNBQU8sVUFBUCxDQUFrQixNQUFsQixFQUEwQjtBQUN4QixXQUFPLElBQUksY0FBSixDQUNMLE9BQU8sVUFERixFQUVMLE9BQU8sSUFGRixFQUdMLE9BQU8sSUFIRixFQUlMLE9BQU8sTUFKRixDQUFQO0FBTUQ7QUFDRCxTQUFPLFdBQVAsR0FBcUI7QUFDbkIsV0FBTyxPQUFPLE1BQVAsQ0FBYyxXQUFkLENBQVA7QUFDRDtBQWpCeUI7O1FBQWYsYyxHQUFBLGM7QUFvQkUsTUFBTSxlQUFOLENBQXNCO0FBQ25DLGdCQUFnRDtBQUFBLFFBQXBDLE9BQW9DLHlEQUExQiwrQkFBMEI7O0FBQzlDLFNBQUssVUFBTCxHQUFrQixnREFBOEIsT0FBOUIsQ0FBbEI7QUFDRDs7Ozs7Ozs7O0FBU0QsT0FBSyxJQUFMLEVBQVc7QUFDVCxXQUFPLEtBQUssVUFBTCxDQUFnQixJQUFoQixFQUFzQixJQUF0QixDQUE0QixNQUFELElBQVk7QUFDNUMsVUFBSSxDQUFDLE9BQU8sTUFBWixFQUFvQjtBQUNsQixlQUFPLEtBQUssV0FBTCxFQUFQO0FBQ0Q7QUFDRCxhQUFPLEtBQUssaUJBQUwsQ0FBdUIsT0FBTyxVQUE5QixDQUFQO0FBQ0QsS0FMTSxDQUFQO0FBTUQ7QUFDRCxhQUFXLElBQVgsRUFBaUI7QUFDZixVQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQVQsRUFBYSxPQUFiLENBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLENBQW5CO0FBQ0EsVUFBTSxTQUFVLFdBQVcsTUFBWCxHQUFvQixDQUFyQixHQUEwQixLQUExQixHQUFrQyxJQUFqRDs7QUFFQSxXQUFPLGtCQUFRLE9BQVIsQ0FBZ0I7QUFDckIsY0FBUSxNQURhO0FBRXJCLGtCQUFZO0FBRlMsS0FBaEIsQ0FBUDtBQUlEO0FBQ0Qsb0JBQWtCLFVBQWxCLEVBQThCO0FBQzVCLFVBQU0sU0FBUyxXQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsQ0FBZjs7QUFFQSxXQUFPLEtBQUssVUFBTCxDQUFnQixjQUFoQixDQUErQixNQUEvQixFQUF1QyxJQUF2QyxDQUE2QyxJQUFELElBQVU7QUFDM0QsVUFBSSxDQUFDLEtBQUssVUFBTCxDQUFMLEVBQXVCO0FBQ3JCLGVBQU8sS0FBSyxXQUFMLEVBQVA7QUFDRDtBQUNELFlBQU0sVUFBVSxLQUFLLFVBQUwsQ0FBaEI7QUFDQSxhQUFPLGVBQWUsVUFBZixDQUEwQixPQUExQixDQUFQO0FBQ0QsS0FOTSxDQUFQO0FBT0Q7QUFDRCxnQkFBYztBQUNaLFdBQU8sa0JBQVEsT0FBUixDQUFnQixJQUFoQixDQUFQO0FBQ0Q7QUExQ2tDO2tCQUFoQixlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciwgTWVtb3J5Q2FjaGVBZGFwdGVyLCBDYWNoZUFkYXB0ZXIgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIsIERpY3Rpb25hcnlMb2FkZXIgfSBmcm9tICcuL2RpY3Rpb25hcnktbG9hZGVyJztcblxuZXhwb3J0IGNvbnN0IGNhY2hlID0ge1xuICBDYWNoZU1hbmFnZXI6IENhY2hlTWFuYWdlcixcbiAgQ2FjaGVBZGFwdGVyOiBDYWNoZUFkYXB0ZXIsXG4gIE1lbW9yeUNhY2hlQWRhcHRlcjogTWVtb3J5Q2FjaGVBZGFwdGVyXG59O1xuXG5leHBvcnQgY29uc3QgZGljdCA9IHtcbiAgRGljdGlvbmFyeUxvYWRlcjogRGljdGlvbmFyeUxvYWRlcixcbiAgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcjogQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlclxufTtcblxuY29uc3QgRW1wdHlSZXN1bHQgPSB7XG4gIHByZWZlY3R1cmU6IG51bGwsXG4gIGNpdHk6IG51bGwsXG4gIGFyZWE6IG51bGwsXG4gIHN0cmVldDogbnVsbFxufTtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByZWZlY3R1cmUsIGNpdHksIGFyZWEsIHN0cmVldCA9IG51bGwpIHtcbiAgICB0aGlzLnByZWZlY3R1cmUgPSBwcmVmZWN0dXJlO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgfVxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc29sdmVkUmVzdWx0KFxuICAgICAgb2JqZWN0LnByZWZlY3R1cmUsXG4gICAgICBvYmplY3QuY2l0eSxcbiAgICAgIG9iamVjdC5hcmVhLFxuICAgICAgb2JqZWN0LnN0cmVldFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKEVtcHR5UmVzdWx0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0gbmV3IE1lbW9yeUNhY2hlQWRhcHRlcigpKSB7XG4gICAgdGhpcy5kaWN0TG9hZGVyID0gbmV3IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIoYWRhcHRlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgYWRkcmVzcyBmcm9tIHRoZSBwb3N0YWwgY29kZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKiBAdGhyb3dzIHtBZGRyZXNzTm90Rm91bmRFcnJvcn0gVGhyb3duIGlmIHRoZSBhZGRyZXNzIGlzIG5vdCBmb3VuZFxuICAgKi9cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyaWZ5Q29kZShjb2RlKS50aGVuKChyZXN1bHQpID0+44CAe1xuICAgICAgaWYgKCFyZXN1bHQucGFzc2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0J5Q29kZShyZXN1bHQucG9zdGFsQ29kZSk7XG4gICAgfSk7XG4gIH1cbiAgdmVyaWZ5Q29kZShjb2RlKSB7XG4gICAgY29uc3QgcG9zdGFsQ29kZSA9IChjb2RlIHx8ICcnKS5yZXBsYWNlKC8tLywgJycpO1xuICAgIGNvbnN0IHJlc3VsdCA9IChwb3N0YWxDb2RlLmxlbmd0aCA8IDcpID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBwYXNzZWQ6IHJlc3VsdCxcbiAgICAgIHBvc3RhbENvZGU6IHBvc3RhbENvZGVcbiAgICB9KTtcbiAgfVxuICBsb2FkQWRkcmVzc0J5Q29kZShwb3N0YWxDb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcG9zdGFsQ29kZS5zdWJzdHIoMCwgMyk7XG5cbiAgICByZXR1cm4gdGhpcy5kaWN0TG9hZGVyLmxvYWRGcm9tUHJlZml4KHByZWZpeCkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKCFkaWN0W3Bvc3RhbENvZGVdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBhZGRyZXNzID0gZGljdFtwb3N0YWxDb2RlXTtcbiAgICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tT2JqZWN0KGFkZHJlc3MpO1xuICAgIH0pO1xuICB9XG4gIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cbn1cbiJdfQ==