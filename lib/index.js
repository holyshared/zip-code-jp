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

var _error = require('./error');

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
      var postalCode = code || '';
      var result = postalCode.length < 7 ? false : true;
      return _bluebird.Promise.resolve(result);
    }
  }, {
    key: 'loadAddressByCode',
    value: function loadAddressByCode(postalCode) {
      var prefix = postalCode.substr(0, 3);

      return this.dictLoader.loadFromPrefix(prefix).then(function (dict) {
        if (!dict[postalCode]) {
          throw new _error.NotFoundError('Address could not be found');
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
//# sourceMappingURL=data:application/json;base64,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SSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ3RELGFBQU8sVUFuR0YsT0FBTyxDQW1HRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEM7OztzQ0FDaUIsVUFBVSxFQUFFO0FBQzVCLFVBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUV2QyxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUMzRCxZQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3JCLGdCQUFNLFdBdkdMLGFBQWEsQ0F1R1UsNEJBQTRCLENBQUMsQ0FBQztTQUN2RDs7QUFFRCxZQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsZUFBTyxjQUFjLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQzVDLENBQUMsQ0FBQztLQUNKOzs7a0NBQ2E7QUFDWixhQUFPLFVBbEhGLE9BQU8sQ0FrSEcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCOzs7U0FqQ2tCLGVBQWU7OztrQkFBZixlQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciwgTWVtb3J5Q2FjaGVBZGFwdGVyLCBDYWNoZUFkYXB0ZXIgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIsIERpY3Rpb25hcnlMb2FkZXIgfSBmcm9tICcuL2RpY3Rpb25hcnktbG9hZGVyJztcbmltcG9ydCB7IE5vdEZvdW5kRXJyb3IgfSBmcm9tICcuL2Vycm9yJztcblxuZXhwb3J0IGNvbnN0IGNhY2hlID0ge1xuICBDYWNoZU1hbmFnZXI6IENhY2hlTWFuYWdlcixcbiAgQ2FjaGVBZGFwdGVyOiBDYWNoZUFkYXB0ZXIsXG4gIE1lbW9yeUNhY2hlQWRhcHRlcjogTWVtb3J5Q2FjaGVBZGFwdGVyXG59O1xuXG5leHBvcnQgY29uc3QgZGljdCA9IHtcbiAgRGljdGlvbmFyeUxvYWRlcjogRGljdGlvbmFyeUxvYWRlcixcbiAgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcjogQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlclxufTtcblxuY29uc3QgUFJFRkVDVFVSRV9ESUNUID0gW1xuICBudWxsLCAgICAgICAn5YyX5rW36YGTJywgICAn6Z2S5qOu55yMJywgICAn5bKp5omL55yMJywgICAn5a6u5Z+O55yMJyxcbiAgJ+eni+eUsOecjCcsICAgJ+WxseW9ouecjCcsICAgJ+emj+WztuecjCcsICAgJ+iMqOWfjuecjCcsICAgJ+agg+acqOecjCcsXG4gICfnvqTppqznnIwnLCAgICfln7znjonnnIwnLCAgICfljYPokYnnnIwnLCAgICfmnbHkuqzpg70nLCAgICfnpZ7lpYjlt53nnIwnLFxuICAn5paw5r2f55yMJywgICAn5a+M5bGx55yMJywgICAn55+z5bed55yMJywgICAn56aP5LqV55yMJywgICAn5bGx5qKo55yMJyxcbiAgJ+mVt+mHjuecjCcsICAgJ+WykOmYnOecjCcsICAgJ+mdmeWyoeecjCcsICAgJ+aEm+efpeecjCcsICAgJ+S4iemHjeecjCcsXG4gICfmu4vos4DnnIwnLCAgICfkuqzpg73lupwnLCAgICflpKfpmKrlupwnLCAgICflhbXluqvnnIwnLCAgICflpYjoia/nnIwnLFxuICAn5ZKM5q2M5bGx55yMJywgJ+mzpeWPluecjCcsICAgJ+WztuagueecjCcsICAgJ+WyoeWxseecjCcsICAgJ+W6g+WztuecjCcsXG4gICflsbHlj6PnnIwnLCAgICflvrPls7bnnIwnLCAgICfpppnlt53nnIwnLCAgICfmhJvlqpvnnIwnLCAgICfpq5jnn6XnnIwnLFxuICAn56aP5bKh55yMJywgICAn5L2Q6LOA55yMJywgICAn6ZW35bSO55yMJywgICAn54aK5pys55yMJywgICAn5aSn5YiG55yMJyxcbiAgJ+WuruW0juecjCcsICAgJ+m5v+WFkOWztuecjCcsICfmspbnuITnnIwnXG5dO1xuXG5jb25zdCBQUk9QRVJUSUVTID0ge1xuICAwOiAncHJlZmVjdHVyZScsXG4gIDE6ICdjaXR5JyxcbiAgMjogJ2FyZWEnLFxuICAzOiAnc3RyZWV0J1xufTtcblxubGV0IHJlc3VsdCA9IHt9O1xuXG5PYmplY3Qua2V5cyhQUk9QRVJUSUVTKS5mb3JFYWNoKChrKSA9PiB7XG4gIGNvbnN0IGtleSA9IFBST1BFUlRJRVNba107XG4gIHJlc3VsdFtrZXldID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByZWZlY3R1cmUsIGNpdHksIGFyZWEsIHN0cmVldCA9IG51bGwpIHtcbiAgICB0aGlzLnByZWZlY3R1cmUgPSBwcmVmZWN0dXJlO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgfVxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc29sdmVkUmVzdWx0KFxuICAgICAgb2JqZWN0LnByZWZlY3R1cmUsXG4gICAgICBvYmplY3QuY2l0eSxcbiAgICAgIG9iamVjdC5hcmVhLFxuICAgICAgb2JqZWN0LnN0cmVldFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGZyb21BcnJheShhZGRyZXNzZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gUmVzb2x2ZWRSZXN1bHQuZW1wdHlSZXN1bHQoKTtcblxuICAgIGFkZHJlc3Nlcy5mb3JFYWNoKCh2YWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IFBST1BFUlRJRVNbaV07XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gUFJFRkVDVFVSRV9ESUNUW3ZhbF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tT2JqZWN0KHJlc3VsdCk7XG4gIH1cbiAgc3RhdGljIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKGVtcHR5UmVzdWx0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0gbmV3IE1lbW9yeUNhY2hlQWRhcHRlcigpKSB7XG4gICAgdGhpcy5kaWN0TG9hZGVyID0gbmV3IENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIoYWRhcHRlcik7XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeUNvZGUoY29kZSk7XG4gICAgfSkudGhlbihmdW5jdGlvbihwYXNzZWQpIHtcbiAgICAgIGlmICghcGFzc2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0J5Q29kZShjb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gY29kZSB8fCAnJztcbiAgICBjb25zdCByZXN1bHQgPSAocG9zdGFsQ29kZS5sZW5ndGggPCA3KSA/IGZhbHNlIDogdHJ1ZTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gIH1cbiAgbG9hZEFkZHJlc3NCeUNvZGUocG9zdGFsQ29kZSkge1xuICAgIGNvbnN0IHByZWZpeCA9IHBvc3RhbENvZGUuc3Vic3RyKDAsIDMpO1xuXG4gICAgcmV0dXJuIHRoaXMuZGljdExvYWRlci5sb2FkRnJvbVByZWZpeChwcmVmaXgpLnRoZW4oKGRpY3QpID0+IHtcbiAgICAgIGlmICghZGljdFtwb3N0YWxDb2RlXSkge1xuICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmRFcnJvcignQWRkcmVzcyBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWRkcmVzc2VzID0gZGljdFtwb3N0YWxDb2RlXTtcbiAgICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tQXJyYXkoYWRkcmVzc2VzKTtcbiAgICB9KTtcbiAgfVxuICBlbXB0eVJlc3VsdCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG59XG4iXX0=