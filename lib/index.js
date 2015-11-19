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
      }).then(function (passed) {
        if (!passed) {
          return this.emptyResult();
        }
        return this.loadAddressByCode(code);
      });
    }
  }, {
    key: 'verifyCode',
    value: function verifyCode(code) {
      var postalCode = (code || '').replace(/-/, '');
      var result = postalCode.length < 7 ? false : true;
      return _bluebird.Promise.resolve(result);
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
//# sourceMappingURL=data:application/json;base64,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O0FBQ2pELFVBQU0sTUFBTSxHQUFHLEFBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUN0RCxhQUFPLFVBMUdGLE9BQU8sQ0EwR0csT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hDOzs7c0NBQ2lCLFVBQVUsRUFBRTs7O0FBQzVCLFVBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUV2QyxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUMzRCxZQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3JCLGlCQUFPLE9BQUssV0FBVyxFQUFFLENBQUM7U0FDM0I7QUFDRCxZQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsZUFBTyxjQUFjLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQzVDLENBQUMsQ0FBQztLQUNKOzs7a0NBQ2E7QUFDWixhQUFPLFVBeEhGLE9BQU8sQ0F3SEcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCOzs7U0F4Q2tCLGVBQWU7OztrQkFBZixlQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciwgTWVtb3J5Q2FjaGVBZGFwdGVyLCBDYWNoZUFkYXB0ZXIgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIsIERpY3Rpb25hcnlMb2FkZXIgfSBmcm9tICcuL2RpY3Rpb25hcnktbG9hZGVyJztcblxuZXhwb3J0IGNvbnN0IGNhY2hlID0ge1xuICBDYWNoZU1hbmFnZXI6IENhY2hlTWFuYWdlcixcbiAgQ2FjaGVBZGFwdGVyOiBDYWNoZUFkYXB0ZXIsXG4gIE1lbW9yeUNhY2hlQWRhcHRlcjogTWVtb3J5Q2FjaGVBZGFwdGVyXG59O1xuXG5leHBvcnQgY29uc3QgZGljdCA9IHtcbiAgRGljdGlvbmFyeUxvYWRlcjogRGljdGlvbmFyeUxvYWRlcixcbiAgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcjogQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlclxufTtcblxuY29uc3QgUFJFRkVDVFVSRV9ESUNUID0gW1xuICBudWxsLCAgICAgICAn5YyX5rW36YGTJywgICAn6Z2S5qOu55yMJywgICAn5bKp5omL55yMJywgICAn5a6u5Z+O55yMJyxcbiAgJ+eni+eUsOecjCcsICAgJ+WxseW9ouecjCcsICAgJ+emj+WztuecjCcsICAgJ+iMqOWfjuecjCcsICAgJ+agg+acqOecjCcsXG4gICfnvqTppqznnIwnLCAgICfln7znjonnnIwnLCAgICfljYPokYnnnIwnLCAgICfmnbHkuqzpg70nLCAgICfnpZ7lpYjlt53nnIwnLFxuICAn5paw5r2f55yMJywgICAn5a+M5bGx55yMJywgICAn55+z5bed55yMJywgICAn56aP5LqV55yMJywgICAn5bGx5qKo55yMJyxcbiAgJ+mVt+mHjuecjCcsICAgJ+WykOmYnOecjCcsICAgJ+mdmeWyoeecjCcsICAgJ+aEm+efpeecjCcsICAgJ+S4iemHjeecjCcsXG4gICfmu4vos4DnnIwnLCAgICfkuqzpg73lupwnLCAgICflpKfpmKrlupwnLCAgICflhbXluqvnnIwnLCAgICflpYjoia/nnIwnLFxuICAn5ZKM5q2M5bGx55yMJywgJ+mzpeWPluecjCcsICAgJ+WztuagueecjCcsICAgJ+WyoeWxseecjCcsICAgJ+W6g+WztuecjCcsXG4gICflsbHlj6PnnIwnLCAgICflvrPls7bnnIwnLCAgICfpppnlt53nnIwnLCAgICfmhJvlqpvnnIwnLCAgICfpq5jnn6XnnIwnLFxuICAn56aP5bKh55yMJywgICAn5L2Q6LOA55yMJywgICAn6ZW35bSO55yMJywgICAn54aK5pys55yMJywgICAn5aSn5YiG55yMJyxcbiAgJ+WuruW0juecjCcsICAgJ+m5v+WFkOWztuecjCcsICfmspbnuITnnIwnXG5dO1xuXG5jb25zdCBQUk9QRVJUSUVTID0ge1xuICAwOiAncHJlZmVjdHVyZScsXG4gIDE6ICdjaXR5JyxcbiAgMjogJ2FyZWEnLFxuICAzOiAnc3RyZWV0J1xufTtcblxubGV0IHJlc3VsdCA9IHt9O1xuXG5PYmplY3Qua2V5cyhQUk9QRVJUSUVTKS5mb3JFYWNoKChrKSA9PiB7XG4gIGNvbnN0IGtleSA9IFBST1BFUlRJRVNba107XG4gIHJlc3VsdFtrZXldID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByZWZlY3R1cmUsIGNpdHksIGFyZWEsIHN0cmVldCA9IG51bGwpIHtcbiAgICB0aGlzLnByZWZlY3R1cmUgPSBwcmVmZWN0dXJlO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgfVxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc29sdmVkUmVzdWx0KFxuICAgICAgb2JqZWN0LnByZWZlY3R1cmUsXG4gICAgICBvYmplY3QuY2l0eSxcbiAgICAgIG9iamVjdC5hcmVhLFxuICAgICAgb2JqZWN0LnN0cmVldFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGZyb21BcnJheShhZGRyZXNzZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gUmVzb2x2ZWRSZXN1bHQuZW1wdHlSZXN1bHQoKTtcblxuICAgIGFkZHJlc3Nlcy5mb3JFYWNoKCh2YWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IFBST1BFUlRJRVNbaV07XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gUFJFRkVDVFVSRV9ESUNUW3ZhbF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tT2JqZWN0KHJlc3VsdCk7XG4gIH1cbiAgc3RhdGljIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKGVtcHR5UmVzdWx0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0gbmV3IE1lbW9yeUNhY2hlQWRhcHRlcigpKSB7XG4gICAgdGhpcy5kaWN0TG9hZGVyID0gbmV3IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIoYWRhcHRlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgYWRkcmVzcyBmcm9tIHRoZSBwb3N0YWwgY29kZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKiBAdGhyb3dzIHtBZGRyZXNzTm90Rm91bmRFcnJvcn0gVGhyb3duIGlmIHRoZSBhZGRyZXNzIGlzIG5vdCBmb3VuZFxuICAgKi9cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeUNvZGUoY29kZSk7XG4gICAgfSkudGhlbihmdW5jdGlvbihwYXNzZWQpIHtcbiAgICAgIGlmICghcGFzc2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0J5Q29kZShjb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gKGNvZGUgfHwgJycpLnJlcGxhY2UoLy0vLCAnJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gKHBvc3RhbENvZGUubGVuZ3RoIDwgNykgPyBmYWxzZSA6IHRydWU7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICB9XG4gIGxvYWRBZGRyZXNzQnlDb2RlKHBvc3RhbENvZGUpIHtcbiAgICBjb25zdCBwcmVmaXggPSBwb3N0YWxDb2RlLnN1YnN0cigwLCAzKTtcblxuICAgIHJldHVybiB0aGlzLmRpY3RMb2FkZXIubG9hZEZyb21QcmVmaXgocHJlZml4KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoIWRpY3RbcG9zdGFsQ29kZV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFkZHJlc3NlcyA9IGRpY3RbcG9zdGFsQ29kZV07XG4gICAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbUFycmF5KGFkZHJlc3Nlcyk7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19