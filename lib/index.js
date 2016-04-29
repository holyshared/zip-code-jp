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
    return _bluebird.Promise.bind(this).then(() => {
      return this.verifyCode(code);
    }).then(function (result) {
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
//# sourceMappingURL=data:application/json;base64,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ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBDYWNoZU1hbmFnZXIsIE1lbW9yeUNhY2hlQWRhcHRlciwgQ2FjaGVBZGFwdGVyIH0gZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgeyBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyLCBEaWN0aW9uYXJ5TG9hZGVyIH0gZnJvbSAnLi9kaWN0aW9uYXJ5LWxvYWRlcic7XG5cbmV4cG9ydCBjb25zdCBjYWNoZSA9IHtcbiAgQ2FjaGVNYW5hZ2VyOiBDYWNoZU1hbmFnZXIsXG4gIENhY2hlQWRhcHRlcjogQ2FjaGVBZGFwdGVyLFxuICBNZW1vcnlDYWNoZUFkYXB0ZXI6IE1lbW9yeUNhY2hlQWRhcHRlclxufTtcblxuZXhwb3J0IGNvbnN0IGRpY3QgPSB7XG4gIERpY3Rpb25hcnlMb2FkZXI6IERpY3Rpb25hcnlMb2FkZXIsXG4gIENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXI6IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXJcbn07XG5cbmNvbnN0IEVtcHR5UmVzdWx0ID0ge1xuICBwcmVmZWN0dXJlOiBudWxsLFxuICBjaXR5OiBudWxsLFxuICBhcmVhOiBudWxsLFxuICBzdHJlZXQ6IG51bGxcbn07XG5cbmNvbnN0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpO1xuXG5leHBvcnQgY2xhc3MgUmVzb2x2ZWRSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwcmVmZWN0dXJlLCBjaXR5LCBhcmVhLCBzdHJlZXQgPSBudWxsKSB7XG4gICAgdGhpcy5wcmVmZWN0dXJlID0gcHJlZmVjdHVyZTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgdGhpcy5zdHJlZXQgPSBzdHJlZXQ7XG4gIH1cbiAgc3RhdGljIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBSZXNvbHZlZFJlc3VsdChcbiAgICAgIG9iamVjdC5wcmVmZWN0dXJlLFxuICAgICAgb2JqZWN0LmNpdHksXG4gICAgICBvYmplY3QuYXJlYSxcbiAgICAgIG9iamVjdC5zdHJlZXRcbiAgICApO1xuICB9XG4gIHN0YXRpYyBlbXB0eVJlc3VsdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShFbXB0eVJlc3VsdCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzc1Jlc29sdmVyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IG5ldyBNZW1vcnlDYWNoZUFkYXB0ZXIoKSkge1xuICAgIHRoaXMuZGljdExvYWRlciA9IG5ldyBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyKGFkYXB0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGFkZHJlc3MgZnJvbSB0aGUgcG9zdGFsIGNvZGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGVcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICogQHRocm93cyB7QWRkcmVzc05vdEZvdW5kRXJyb3J9IFRocm93biBpZiB0aGUgYWRkcmVzcyBpcyBub3QgZm91bmRcbiAgICovXG4gIGZpbmQoY29kZSkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlDb2RlKGNvZGUpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICBpZiAoIXJlc3VsdC5wYXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzQnlDb2RlKHJlc3VsdC5wb3N0YWxDb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gKGNvZGUgfHwgJycpLnJlcGxhY2UoLy0vLCAnJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gKHBvc3RhbENvZGUubGVuZ3RoIDwgNykgPyBmYWxzZSA6IHRydWU7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIHBhc3NlZDogcmVzdWx0LFxuICAgICAgcG9zdGFsQ29kZTogcG9zdGFsQ29kZVxuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzQnlDb2RlKHBvc3RhbENvZGUpIHtcbiAgICBjb25zdCBwcmVmaXggPSBwb3N0YWxDb2RlLnN1YnN0cigwLCAzKTtcblxuICAgIHJldHVybiB0aGlzLmRpY3RMb2FkZXIubG9hZEZyb21QcmVmaXgocHJlZml4KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoIWRpY3RbcG9zdGFsQ29kZV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFkZHJlc3MgPSBkaWN0W3Bvc3RhbENvZGVdO1xuICAgICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21PYmplY3QoYWRkcmVzcyk7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19