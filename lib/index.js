'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResolvedResult = exports.dict = exports.cache = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

var _dictionaryLoader = require('./dictionary-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cache = exports.cache = {
  CacheManager: _cache.CacheManager,
  CacheAdapter: _cache.CacheAdapter,
  MemoryCacheAdapter: _cache.MemoryCacheAdapter
};

var dict = exports.dict = {
  DictionaryLoader: _dictionaryLoader.DictionaryLoader,
  CacheableDictionaryLoader: _dictionaryLoader.CacheableDictionaryLoader
};

var EmptyResult = {
  prefecture: null,
  city: null,
  area: null,
  street: null
};

var readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

var ResolvedResult = exports.ResolvedResult = function () {
  function ResolvedResult(prefecture, city, area) {
    var street = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, ResolvedResult);

    this.prefecture = prefecture;
    this.city = city;
    this.area = area;
    this.street = street;
  }

  _createClass(ResolvedResult, null, [{
    key: 'fromObject',
    value: function fromObject(object) {
      return new ResolvedResult(object.prefecture, object.city, object.area, object.street);
    }
  }, {
    key: 'emptyResult',
    value: function emptyResult() {
      return Object.create(EmptyResult);
    }
  }]);

  return ResolvedResult;
}();

var AddressResolver = function () {
  function AddressResolver() {
    var adapter = arguments.length <= 0 || arguments[0] === undefined ? new _cache.MemoryCacheAdapter() : arguments[0];

    _classCallCheck(this, AddressResolver);

    this.dictLoader = new _dictionaryLoader.CacheableDictionaryLoader(adapter);
  }

  /**
   * Find the address from the postal code
   *
   * @param {string} code
   * @return Promise<Object>
   * @throws {AddressNotFoundError} Thrown if the address is not found
   */


  _createClass(AddressResolver, [{
    key: 'find',
    value: function find(code) {
      var _this = this;

      return _bluebird.Promise.bind(this).then(function () {
        return _this.verifyCode(code);
      }).then(function (result) {
        if (!result.passed) {
          return this.emptyResult();
        }
        return this.loadAddressByCode(result.postalCode);
      });
    }
  }, {
    key: 'verifyCode',
    value: function verifyCode(code) {
      var postalCode = (code || '').replace(/-/, '');
      var result = postalCode.length < 7 ? false : true;

      return _bluebird.Promise.resolve({
        passed: result,
        postalCode: postalCode
      });
    }
  }, {
    key: 'loadAddressByCode',
    value: function loadAddressByCode(postalCode) {
      var _this2 = this;

      var prefix = postalCode.substr(0, 3);

      return this.dictLoader.loadFromPrefix(prefix).then(function (dict) {
        if (!dict[postalCode]) {
          return _this2.emptyResult();
        }
        var address = dict[postalCode];
        return ResolvedResult.fromObject(address);
      });
    }
  }, {
    key: 'emptyResult',
    value: function emptyResult() {
      return _bluebird.Promise.resolve(null);
    }
  }]);

  return AddressResolver;
}();

exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,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ZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciwgTWVtb3J5Q2FjaGVBZGFwdGVyLCBDYWNoZUFkYXB0ZXIgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIsIERpY3Rpb25hcnlMb2FkZXIgfSBmcm9tICcuL2RpY3Rpb25hcnktbG9hZGVyJztcblxuZXhwb3J0IGNvbnN0IGNhY2hlID0ge1xuICBDYWNoZU1hbmFnZXI6IENhY2hlTWFuYWdlcixcbiAgQ2FjaGVBZGFwdGVyOiBDYWNoZUFkYXB0ZXIsXG4gIE1lbW9yeUNhY2hlQWRhcHRlcjogTWVtb3J5Q2FjaGVBZGFwdGVyXG59O1xuXG5leHBvcnQgY29uc3QgZGljdCA9IHtcbiAgRGljdGlvbmFyeUxvYWRlcjogRGljdGlvbmFyeUxvYWRlcixcbiAgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcjogQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlclxufTtcblxuY29uc3QgRW1wdHlSZXN1bHQgPSB7XG4gIHByZWZlY3R1cmU6IG51bGwsXG4gIGNpdHk6IG51bGwsXG4gIGFyZWE6IG51bGwsXG4gIHN0cmVldDogbnVsbFxufTtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByZWZlY3R1cmUsIGNpdHksIGFyZWEsIHN0cmVldCA9IG51bGwpIHtcbiAgICB0aGlzLnByZWZlY3R1cmUgPSBwcmVmZWN0dXJlO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgfVxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc29sdmVkUmVzdWx0KFxuICAgICAgb2JqZWN0LnByZWZlY3R1cmUsXG4gICAgICBvYmplY3QuY2l0eSxcbiAgICAgIG9iamVjdC5hcmVhLFxuICAgICAgb2JqZWN0LnN0cmVldFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKEVtcHR5UmVzdWx0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0gbmV3IE1lbW9yeUNhY2hlQWRhcHRlcigpKSB7XG4gICAgdGhpcy5kaWN0TG9hZGVyID0gbmV3IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIoYWRhcHRlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgYWRkcmVzcyBmcm9tIHRoZSBwb3N0YWwgY29kZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKiBAdGhyb3dzIHtBZGRyZXNzTm90Rm91bmRFcnJvcn0gVGhyb3duIGlmIHRoZSBhZGRyZXNzIGlzIG5vdCBmb3VuZFxuICAgKi9cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeUNvZGUoY29kZSk7XG4gICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgIGlmICghcmVzdWx0LnBhc3NlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NCeUNvZGUocmVzdWx0LnBvc3RhbENvZGUpO1xuICAgIH0pO1xuICB9XG4gIHZlcmlmeUNvZGUoY29kZSkge1xuICAgIGNvbnN0IHBvc3RhbENvZGUgPSAoY29kZSB8fCAnJykucmVwbGFjZSgvLS8sICcnKTtcbiAgICBjb25zdCByZXN1bHQgPSAocG9zdGFsQ29kZS5sZW5ndGggPCA3KSA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgcGFzc2VkOiByZXN1bHQsXG4gICAgICBwb3N0YWxDb2RlOiBwb3N0YWxDb2RlXG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NCeUNvZGUocG9zdGFsQ29kZSkge1xuICAgIGNvbnN0IHByZWZpeCA9IHBvc3RhbENvZGUuc3Vic3RyKDAsIDMpO1xuXG4gICAgcmV0dXJuIHRoaXMuZGljdExvYWRlci5sb2FkRnJvbVByZWZpeChwcmVmaXgpLnRoZW4oKGRpY3QpID0+IHtcbiAgICAgIGlmICghZGljdFtwb3N0YWxDb2RlXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgYWRkcmVzcyA9IGRpY3RbcG9zdGFsQ29kZV07XG4gICAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbU9iamVjdChhZGRyZXNzKTtcbiAgICB9KTtcbiAgfVxuICBlbXB0eVJlc3VsdCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG59XG4iXX0=