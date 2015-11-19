'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var PREFECTURE_DICT = [null, '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];

var PROPERTIES = {
  0: 'prefecture',
  1: 'city',
  2: 'area',
  3: 'street'
};

var result = {};

Object.keys(PROPERTIES).forEach(function (k) {
  var key = PROPERTIES[k];
  result[key] = null;
});

var _emptyResult = result;

var readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

var ResolvedResult = exports.ResolvedResult = (function () {
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
    key: 'fromArray',
    value: function fromArray(addresses) {
      var result = ResolvedResult.emptyResult();

      addresses.forEach(function (val, i) {
        var key = PROPERTIES[i];

        if (i === 0) {
          result[key] = PREFECTURE_DICT[val];
        } else {
          result[key] = val;
        }
      });

      return ResolvedResult.fromObject(result);
    }
  }, {
    key: 'emptyResult',
    value: function emptyResult() {
      return Object.create(_emptyResult);
    }
  }]);

  return ResolvedResult;
})();

var AddressResolver = (function () {
  function AddressResolver() {
    _classCallCheck(this, AddressResolver);

    var adapter = arguments.length <= 0 || arguments[0] === undefined ? new _cache.MemoryCacheAdapter() : arguments[0];

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
        var addresses = dict[postalCode];
        return ResolvedResult.fromArray(addresses);
      });
    }
  }, {
    key: 'emptyResult',
    value: function emptyResult() {
      return _bluebird.Promise.resolve(null);
    }
  }]);

  return AddressResolver;
})();

exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,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RyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELFVBQU0sTUFBTSxHQUFHLEFBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFdEQsYUFBTyxVQTNHRixPQUFPLENBMkdHLE9BQU8sQ0FBQztBQUNyQixjQUFNLEVBQUUsTUFBTTtBQUNkLGtCQUFVLEVBQUUsVUFBVTtPQUN2QixDQUFDLENBQUM7S0FDSjs7O3NDQUNpQixVQUFVLEVBQUU7OztBQUM1QixVQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFdkMsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDM0QsWUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNyQixpQkFBTyxPQUFLLFdBQVcsRUFBRSxDQUFDO1NBQzNCO0FBQ0QsWUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLGVBQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUM1QyxDQUFDLENBQUM7S0FDSjs7O2tDQUNhO0FBQ1osYUFBTyxVQTVIRixPQUFPLENBNEhHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5Qjs7O1NBNUNrQixlQUFlOzs7a0JBQWYsZUFBZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBDYWNoZU1hbmFnZXIsIE1lbW9yeUNhY2hlQWRhcHRlciwgQ2FjaGVBZGFwdGVyIH0gZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgeyBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyLCBEaWN0aW9uYXJ5TG9hZGVyIH0gZnJvbSAnLi9kaWN0aW9uYXJ5LWxvYWRlcic7XG5cbmV4cG9ydCBjb25zdCBjYWNoZSA9IHtcbiAgQ2FjaGVNYW5hZ2VyOiBDYWNoZU1hbmFnZXIsXG4gIENhY2hlQWRhcHRlcjogQ2FjaGVBZGFwdGVyLFxuICBNZW1vcnlDYWNoZUFkYXB0ZXI6IE1lbW9yeUNhY2hlQWRhcHRlclxufTtcblxuZXhwb3J0IGNvbnN0IGRpY3QgPSB7XG4gIERpY3Rpb25hcnlMb2FkZXI6IERpY3Rpb25hcnlMb2FkZXIsXG4gIENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXI6IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXJcbn07XG5cbmNvbnN0IFBSRUZFQ1RVUkVfRElDVCA9IFtcbiAgbnVsbCwgICAgICAgJ+WMl+a1t+mBkycsICAgJ+mdkuajruecjCcsICAgJ+WyqeaJi+ecjCcsICAgJ+WuruWfjuecjCcsXG4gICfnp4vnlLDnnIwnLCAgICflsbHlvaLnnIwnLCAgICfnpo/ls7bnnIwnLCAgICfojKjln47nnIwnLCAgICfmoIPmnKjnnIwnLFxuICAn576k6aas55yMJywgICAn5Z+8546J55yMJywgICAn5Y2D6JGJ55yMJywgICAn5p2x5Lqs6YO9JywgICAn56We5aWI5bed55yMJyxcbiAgJ+aWsOa9n+ecjCcsICAgJ+WvjOWxseecjCcsICAgJ+efs+W3neecjCcsICAgJ+emj+S6leecjCcsICAgJ+WxseaiqOecjCcsXG4gICfplbfph47nnIwnLCAgICflspDpmJznnIwnLCAgICfpnZnlsqHnnIwnLCAgICfmhJvnn6XnnIwnLCAgICfkuInph43nnIwnLFxuICAn5ruL6LOA55yMJywgICAn5Lqs6YO95bqcJywgICAn5aSn6Ziq5bqcJywgICAn5YW15bqr55yMJywgICAn5aWI6Imv55yMJyxcbiAgJ+WSjOatjOWxseecjCcsICfps6Xlj5bnnIwnLCAgICfls7bmoLnnnIwnLCAgICflsqHlsbHnnIwnLCAgICfluoPls7bnnIwnLFxuICAn5bGx5Y+j55yMJywgICAn5b6z5bO255yMJywgICAn6aaZ5bed55yMJywgICAn5oSb5aqb55yMJywgICAn6auY55+l55yMJyxcbiAgJ+emj+WyoeecjCcsICAgJ+S9kOizgOecjCcsICAgJ+mVt+W0juecjCcsICAgJ+eGiuacrOecjCcsICAgJ+Wkp+WIhuecjCcsXG4gICflrq7ltI7nnIwnLCAgICfpub/lhZDls7bnnIwnLCAn5rKW57iE55yMJ1xuXTtcblxuY29uc3QgUFJPUEVSVElFUyA9IHtcbiAgMDogJ3ByZWZlY3R1cmUnLFxuICAxOiAnY2l0eScsXG4gIDI6ICdhcmVhJyxcbiAgMzogJ3N0cmVldCdcbn07XG5cbmxldCByZXN1bHQgPSB7fTtcblxuT2JqZWN0LmtleXMoUFJPUEVSVElFUykuZm9yRWFjaCgoaykgPT4ge1xuICBjb25zdCBrZXkgPSBQUk9QRVJUSUVTW2tdO1xuICByZXN1bHRba2V5XSA9IG51bGw7XG59KTtcblxuY29uc3QgZW1wdHlSZXN1bHQgPSByZXN1bHQ7XG5cbmNvbnN0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpO1xuXG5leHBvcnQgY2xhc3MgUmVzb2x2ZWRSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwcmVmZWN0dXJlLCBjaXR5LCBhcmVhLCBzdHJlZXQgPSBudWxsKSB7XG4gICAgdGhpcy5wcmVmZWN0dXJlID0gcHJlZmVjdHVyZTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgdGhpcy5zdHJlZXQgPSBzdHJlZXQ7XG4gIH1cbiAgc3RhdGljIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBSZXNvbHZlZFJlc3VsdChcbiAgICAgIG9iamVjdC5wcmVmZWN0dXJlLFxuICAgICAgb2JqZWN0LmNpdHksXG4gICAgICBvYmplY3QuYXJlYSxcbiAgICAgIG9iamVjdC5zdHJlZXRcbiAgICApO1xuICB9XG4gIHN0YXRpYyBmcm9tQXJyYXkoYWRkcmVzc2VzKSB7XG4gICAgbGV0IHJlc3VsdCA9IFJlc29sdmVkUmVzdWx0LmVtcHR5UmVzdWx0KCk7XG5cbiAgICBhZGRyZXNzZXMuZm9yRWFjaCgodmFsLCBpKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBQUk9QRVJUSUVTW2ldO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICByZXN1bHRba2V5XSA9IFBSRUZFQ1RVUkVfRElDVFt2YWxdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbU9iamVjdChyZXN1bHQpO1xuICB9XG4gIHN0YXRpYyBlbXB0eVJlc3VsdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShlbXB0eVJlc3VsdCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzc1Jlc29sdmVyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IG5ldyBNZW1vcnlDYWNoZUFkYXB0ZXIoKSkge1xuICAgIHRoaXMuZGljdExvYWRlciA9IG5ldyBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyKGFkYXB0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGFkZHJlc3MgZnJvbSB0aGUgcG9zdGFsIGNvZGVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGVcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICogQHRocm93cyB7QWRkcmVzc05vdEZvdW5kRXJyb3J9IFRocm93biBpZiB0aGUgYWRkcmVzcyBpcyBub3QgZm91bmRcbiAgICovXG4gIGZpbmQoY29kZSkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlDb2RlKGNvZGUpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICBpZiAoIXJlc3VsdC5wYXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzQnlDb2RlKHJlc3VsdC5wb3N0YWxDb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gKGNvZGUgfHwgJycpLnJlcGxhY2UoLy0vLCAnJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gKHBvc3RhbENvZGUubGVuZ3RoIDwgNykgPyBmYWxzZSA6IHRydWU7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIHBhc3NlZDogcmVzdWx0LFxuICAgICAgcG9zdGFsQ29kZTogcG9zdGFsQ29kZVxuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzQnlDb2RlKHBvc3RhbENvZGUpIHtcbiAgICBjb25zdCBwcmVmaXggPSBwb3N0YWxDb2RlLnN1YnN0cigwLCAzKTtcblxuICAgIHJldHVybiB0aGlzLmRpY3RMb2FkZXIubG9hZEZyb21QcmVmaXgocHJlZml4KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoIWRpY3RbcG9zdGFsQ29kZV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFkZHJlc3NlcyA9IGRpY3RbcG9zdGFsQ29kZV07XG4gICAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbUFycmF5KGFkZHJlc3Nlcyk7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19