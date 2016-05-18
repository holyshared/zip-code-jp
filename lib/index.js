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
//# sourceMappingURL=data:application/json;base64,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Q29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyLCBNZW1vcnlDYWNoZUFkYXB0ZXIsIENhY2hlQWRhcHRlciB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciwgRGljdGlvbmFyeUxvYWRlciB9IGZyb20gJy4vZGljdGlvbmFyeS1sb2FkZXInO1xuXG5leHBvcnQgY29uc3QgY2FjaGUgPSB7XG4gIENhY2hlTWFuYWdlcjogQ2FjaGVNYW5hZ2VyLFxuICBDYWNoZUFkYXB0ZXI6IENhY2hlQWRhcHRlcixcbiAgTWVtb3J5Q2FjaGVBZGFwdGVyOiBNZW1vcnlDYWNoZUFkYXB0ZXJcbn07XG5cbmV4cG9ydCBjb25zdCBkaWN0ID0ge1xuICBEaWN0aW9uYXJ5TG9hZGVyOiBEaWN0aW9uYXJ5TG9hZGVyLFxuICBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyOiBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyXG59O1xuXG5jb25zdCBFbXB0eVJlc3VsdCA9IHtcbiAgcHJlZmVjdHVyZTogbnVsbCxcbiAgY2l0eTogbnVsbCxcbiAgYXJlYTogbnVsbCxcbiAgc3RyZWV0OiBudWxsXG59O1xuXG5jb25zdCByZWFkRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLnJlYWRGaWxlKTtcblxuZXhwb3J0IGNsYXNzIFJlc29sdmVkUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHJlZmVjdHVyZSwgY2l0eSwgYXJlYSwgc3RyZWV0ID0gbnVsbCkge1xuICAgIHRoaXMucHJlZmVjdHVyZSA9IHByZWZlY3R1cmU7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgIHRoaXMuc3RyZWV0ID0gc3RyZWV0O1xuICB9XG4gIHN0YXRpYyBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiBuZXcgUmVzb2x2ZWRSZXN1bHQoXG4gICAgICBvYmplY3QucHJlZmVjdHVyZSxcbiAgICAgIG9iamVjdC5jaXR5LFxuICAgICAgb2JqZWN0LmFyZWEsXG4gICAgICBvYmplY3Quc3RyZWV0XG4gICAgKTtcbiAgfVxuICBzdGF0aWMgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoRW1wdHlSZXN1bHQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSBuZXcgTWVtb3J5Q2FjaGVBZGFwdGVyKCkpIHtcbiAgICB0aGlzLmRpY3RMb2FkZXIgPSBuZXcgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcihhZGFwdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBhZGRyZXNzIGZyb20gdGhlIHBvc3RhbCBjb2RlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqIEB0aHJvd3Mge0FkZHJlc3NOb3RGb3VuZEVycm9yfSBUaHJvd24gaWYgdGhlIGFkZHJlc3MgaXMgbm90IGZvdW5kXG4gICAqL1xuICBmaW5kKGNvZGUpIHtcbiAgICByZXR1cm4gdGhpcy52ZXJpZnlDb2RlKGNvZGUpLnRoZW4oKHJlc3VsdCkgPT7jgIB7XG4gICAgICBpZiAoIXJlc3VsdC5wYXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzQnlDb2RlKHJlc3VsdC5wb3N0YWxDb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gKGNvZGUgfHwgJycpLnJlcGxhY2UoLy0vLCAnJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gKHBvc3RhbENvZGUubGVuZ3RoIDwgNykgPyBmYWxzZSA6IHRydWU7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIHBhc3NlZDogcmVzdWx0LFxuICAgICAgcG9zdGFsQ29kZTogcG9zdGFsQ29kZVxuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzQnlDb2RlKHBvc3RhbENvZGUpIHtcbiAgICBjb25zdCBwcmVmaXggPSBwb3N0YWxDb2RlLnN1YnN0cigwLCAzKTtcblxuICAgIHJldHVybiB0aGlzLmRpY3RMb2FkZXIubG9hZEZyb21QcmVmaXgocHJlZml4KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoIWRpY3RbcG9zdGFsQ29kZV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFkZHJlc3MgPSBkaWN0W3Bvc3RhbENvZGVdO1xuICAgICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21PYmplY3QoYWRkcmVzcyk7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19