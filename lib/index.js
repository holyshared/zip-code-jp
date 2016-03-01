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
}();

exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,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ZUFBZSxTQUFmLENBQXlCLFNBQXpCLENBQVAsQ0FMMkQ7T0FBVixDQUFuRCxDQUg0Qjs7OztrQ0FXaEI7QUFDWixhQUFPLGtCQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBUCxDQURZOzs7O1NBMUNLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciwgTWVtb3J5Q2FjaGVBZGFwdGVyLCBDYWNoZUFkYXB0ZXIgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIsIERpY3Rpb25hcnlMb2FkZXIgfSBmcm9tICcuL2RpY3Rpb25hcnktbG9hZGVyJztcblxuZXhwb3J0IGNvbnN0IGNhY2hlID0ge1xuICBDYWNoZU1hbmFnZXI6IENhY2hlTWFuYWdlcixcbiAgQ2FjaGVBZGFwdGVyOiBDYWNoZUFkYXB0ZXIsXG4gIE1lbW9yeUNhY2hlQWRhcHRlcjogTWVtb3J5Q2FjaGVBZGFwdGVyXG59O1xuXG5leHBvcnQgY29uc3QgZGljdCA9IHtcbiAgRGljdGlvbmFyeUxvYWRlcjogRGljdGlvbmFyeUxvYWRlcixcbiAgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcjogQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlclxufTtcblxuY29uc3QgUFJFRkVDVFVSRV9ESUNUID0gW1xuICBudWxsLCAgICAgICAn5YyX5rW36YGTJywgICAn6Z2S5qOu55yMJywgICAn5bKp5omL55yMJywgICAn5a6u5Z+O55yMJyxcbiAgJ+eni+eUsOecjCcsICAgJ+WxseW9ouecjCcsICAgJ+emj+WztuecjCcsICAgJ+iMqOWfjuecjCcsICAgJ+agg+acqOecjCcsXG4gICfnvqTppqznnIwnLCAgICfln7znjonnnIwnLCAgICfljYPokYnnnIwnLCAgICfmnbHkuqzpg70nLCAgICfnpZ7lpYjlt53nnIwnLFxuICAn5paw5r2f55yMJywgICAn5a+M5bGx55yMJywgICAn55+z5bed55yMJywgICAn56aP5LqV55yMJywgICAn5bGx5qKo55yMJyxcbiAgJ+mVt+mHjuecjCcsICAgJ+WykOmYnOecjCcsICAgJ+mdmeWyoeecjCcsICAgJ+aEm+efpeecjCcsICAgJ+S4iemHjeecjCcsXG4gICfmu4vos4DnnIwnLCAgICfkuqzpg73lupwnLCAgICflpKfpmKrlupwnLCAgICflhbXluqvnnIwnLCAgICflpYjoia/nnIwnLFxuICAn5ZKM5q2M5bGx55yMJywgJ+mzpeWPluecjCcsICAgJ+WztuagueecjCcsICAgJ+WyoeWxseecjCcsICAgJ+W6g+WztuecjCcsXG4gICflsbHlj6PnnIwnLCAgICflvrPls7bnnIwnLCAgICfpppnlt53nnIwnLCAgICfmhJvlqpvnnIwnLCAgICfpq5jnn6XnnIwnLFxuICAn56aP5bKh55yMJywgICAn5L2Q6LOA55yMJywgICAn6ZW35bSO55yMJywgICAn54aK5pys55yMJywgICAn5aSn5YiG55yMJyxcbiAgJ+WuruW0juecjCcsICAgJ+m5v+WFkOWztuecjCcsICfmspbnuITnnIwnXG5dO1xuXG5jb25zdCBQUk9QRVJUSUVTID0ge1xuICAwOiAncHJlZmVjdHVyZScsXG4gIDE6ICdjaXR5JyxcbiAgMjogJ2FyZWEnLFxuICAzOiAnc3RyZWV0J1xufTtcblxubGV0IHJlc3VsdCA9IHt9O1xuXG5PYmplY3Qua2V5cyhQUk9QRVJUSUVTKS5mb3JFYWNoKChrKSA9PiB7XG4gIGNvbnN0IGtleSA9IFBST1BFUlRJRVNba107XG4gIHJlc3VsdFtrZXldID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByZWZlY3R1cmUsIGNpdHksIGFyZWEsIHN0cmVldCA9IG51bGwpIHtcbiAgICB0aGlzLnByZWZlY3R1cmUgPSBwcmVmZWN0dXJlO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgfVxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc29sdmVkUmVzdWx0KFxuICAgICAgb2JqZWN0LnByZWZlY3R1cmUsXG4gICAgICBvYmplY3QuY2l0eSxcbiAgICAgIG9iamVjdC5hcmVhLFxuICAgICAgb2JqZWN0LnN0cmVldFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGZyb21BcnJheShhZGRyZXNzZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gUmVzb2x2ZWRSZXN1bHQuZW1wdHlSZXN1bHQoKTtcblxuICAgIGFkZHJlc3Nlcy5mb3JFYWNoKCh2YWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IFBST1BFUlRJRVNbaV07XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gUFJFRkVDVFVSRV9ESUNUW3ZhbF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tT2JqZWN0KHJlc3VsdCk7XG4gIH1cbiAgc3RhdGljIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKGVtcHR5UmVzdWx0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0gbmV3IE1lbW9yeUNhY2hlQWRhcHRlcigpKSB7XG4gICAgdGhpcy5kaWN0TG9hZGVyID0gbmV3IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIoYWRhcHRlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgYWRkcmVzcyBmcm9tIHRoZSBwb3N0YWwgY29kZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICAgKiBAcmV0dXJuIFByb21pc2U8T2JqZWN0PlxuICAgKiBAdGhyb3dzIHtBZGRyZXNzTm90Rm91bmRFcnJvcn0gVGhyb3duIGlmIHRoZSBhZGRyZXNzIGlzIG5vdCBmb3VuZFxuICAgKi9cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeUNvZGUoY29kZSk7XG4gICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgIGlmICghcmVzdWx0LnBhc3NlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NCeUNvZGUocmVzdWx0LnBvc3RhbENvZGUpO1xuICAgIH0pO1xuICB9XG4gIHZlcmlmeUNvZGUoY29kZSkge1xuICAgIGNvbnN0IHBvc3RhbENvZGUgPSAoY29kZSB8fCAnJykucmVwbGFjZSgvLS8sICcnKTtcbiAgICBjb25zdCByZXN1bHQgPSAocG9zdGFsQ29kZS5sZW5ndGggPCA3KSA/IGZhbHNlIDogdHJ1ZTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgcGFzc2VkOiByZXN1bHQsXG4gICAgICBwb3N0YWxDb2RlOiBwb3N0YWxDb2RlXG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NCeUNvZGUocG9zdGFsQ29kZSkge1xuICAgIGNvbnN0IHByZWZpeCA9IHBvc3RhbENvZGUuc3Vic3RyKDAsIDMpO1xuXG4gICAgcmV0dXJuIHRoaXMuZGljdExvYWRlci5sb2FkRnJvbVByZWZpeChwcmVmaXgpLnRoZW4oKGRpY3QpID0+IHtcbiAgICAgIGlmICghZGljdFtwb3N0YWxDb2RlXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgYWRkcmVzc2VzID0gZGljdFtwb3N0YWxDb2RlXTtcbiAgICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tQXJyYXkoYWRkcmVzc2VzKTtcbiAgICB9KTtcbiAgfVxuICBlbXB0eVJlc3VsdCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG59XG4iXX0=