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
  result[k] = null;
});

var emptyResult = result;

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
      var result = Object.create(emptyResult);

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
//# sourceMappingURL=data:application/json;base64,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QUU7QUFDNUIsVUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXZDLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQzNELFlBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDckIsZ0JBQU0sV0FuR0wsYUFBYSxDQW1HVSw0QkFBNEIsQ0FBQyxDQUFDO1NBQ3ZEOztBQUVELFlBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxlQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7T0FDNUMsQ0FBQyxDQUFDO0tBQ0o7OztrQ0FDYTtBQUNaLGFBQU8sVUE5R0YsT0FBTyxDQThHRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7OztTQWpDa0IsZUFBZTs7O2tCQUFmLGVBQWUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyLCBNZW1vcnlDYWNoZUFkYXB0ZXIsIENhY2hlQWRhcHRlciB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciwgRGljdGlvbmFyeUxvYWRlciB9IGZyb20gJy4vZGljdGlvbmFyeS1sb2FkZXInO1xuaW1wb3J0IHsgTm90Rm91bmRFcnJvciB9IGZyb20gJy4vZXJyb3InO1xuXG5leHBvcnQgY29uc3QgY2FjaGUgPSB7XG4gIENhY2hlTWFuYWdlcjogQ2FjaGVNYW5hZ2VyLFxuICBDYWNoZUFkYXB0ZXI6IENhY2hlQWRhcHRlcixcbiAgTWVtb3J5Q2FjaGVBZGFwdGVyOiBNZW1vcnlDYWNoZUFkYXB0ZXJcbn07XG5cbmV4cG9ydCBjb25zdCBkaWN0ID0ge1xuICBEaWN0aW9uYXJ5TG9hZGVyOiBEaWN0aW9uYXJ5TG9hZGVyLFxuICBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyOiBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyXG59O1xuXG5jb25zdCBQUkVGRUNUVVJFX0RJQ1QgPSBbXG4gIG51bGwsICAgICAgICfljJfmtbfpgZMnLCAgICfpnZLmo67nnIwnLCAgICflsqnmiYvnnIwnLCAgICflrq7ln47nnIwnLFxuICAn56eL55Sw55yMJywgICAn5bGx5b2i55yMJywgICAn56aP5bO255yMJywgICAn6Iyo5Z+O55yMJywgICAn5qCD5pyo55yMJyxcbiAgJ+e+pOmmrOecjCcsICAgJ+WfvOeOieecjCcsICAgJ+WNg+iRieecjCcsICAgJ+adseS6rOmDvScsICAgJ+elnuWliOW3neecjCcsXG4gICfmlrDmvZ/nnIwnLCAgICflr4zlsbHnnIwnLCAgICfnn7Plt53nnIwnLCAgICfnpo/kupXnnIwnLCAgICflsbHmoqjnnIwnLFxuICAn6ZW36YeO55yMJywgICAn5bKQ6Zic55yMJywgICAn6Z2Z5bKh55yMJywgICAn5oSb55+l55yMJywgICAn5LiJ6YeN55yMJyxcbiAgJ+a7i+izgOecjCcsICAgJ+S6rOmDveW6nCcsICAgJ+Wkp+mYquW6nCcsICAgJ+WFteW6q+ecjCcsICAgJ+WliOiJr+ecjCcsXG4gICflkozmrYzlsbHnnIwnLCAn6bOl5Y+W55yMJywgICAn5bO25qC555yMJywgICAn5bKh5bGx55yMJywgICAn5bqD5bO255yMJyxcbiAgJ+WxseWPo+ecjCcsICAgJ+W+s+WztuecjCcsICAgJ+mmmeW3neecjCcsICAgJ+aEm+Wqm+ecjCcsICAgJ+mrmOefpeecjCcsXG4gICfnpo/lsqHnnIwnLCAgICfkvZDos4DnnIwnLCAgICfplbfltI7nnIwnLCAgICfnhormnKznnIwnLCAgICflpKfliIbnnIwnLFxuICAn5a6u5bSO55yMJywgICAn6bm/5YWQ5bO255yMJywgJ+aylue4hOecjCdcbl07XG5cbmNvbnN0IFBST1BFUlRJRVMgPSB7XG4gIDA6ICdwcmVmZWN0dXJlJyxcbiAgMTogJ2NpdHknLFxuICAyOiAnYXJlYScsXG4gIDM6ICdzdHJlZXQnXG59O1xuXG5sZXQgcmVzdWx0ID0ge307XG5cbk9iamVjdC5rZXlzKFBST1BFUlRJRVMpLmZvckVhY2goKGspID0+IHtcbiAgcmVzdWx0W2tdID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByZWZlY3R1cmUsIGNpdHksIGFyZWEsIHN0cmVldCA9IG51bGwpIHtcbiAgICB0aGlzLnByZWZlY3R1cmUgPSBwcmVmZWN0dXJlO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgfVxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc29sdmVkUmVzdWx0KFxuICAgICAgb2JqZWN0LnByZWZlY3R1cmUsXG4gICAgICBvYmplY3QuY2l0eSxcbiAgICAgIG9iamVjdC5hcmVhLFxuICAgICAgb2JqZWN0LnN0cmVldFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGZyb21BcnJheShhZGRyZXNzZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShlbXB0eVJlc3VsdCk7XG5cbiAgICBhZGRyZXNzZXMuZm9yRWFjaCgodmFsLCBpKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBQUk9QRVJUSUVTW2ldO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICByZXN1bHRba2V5XSA9IFBSRUZFQ1RVUkVfRElDVFt2YWxdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbU9iamVjdChyZXN1bHQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSBuZXcgTWVtb3J5Q2FjaGVBZGFwdGVyKCkpIHtcbiAgICB0aGlzLmRpY3RMb2FkZXIgPSBuZXcgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcihhZGFwdGVyKTtcbiAgfVxuICBmaW5kKGNvZGUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5iaW5kKHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5Q29kZShjb2RlKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHBhc3NlZCkge1xuICAgICAgaWYgKCFwYXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzQnlDb2RlKGNvZGUpO1xuICAgIH0pO1xuICB9XG4gIHZlcmlmeUNvZGUoY29kZSkge1xuICAgIGNvbnN0IHBvc3RhbENvZGUgPSBjb2RlIHx8ICcnO1xuICAgIGNvbnN0IHJlc3VsdCA9IChwb3N0YWxDb2RlLmxlbmd0aCA8IDcpID8gZmFsc2UgOiB0cnVlO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgfVxuICBsb2FkQWRkcmVzc0J5Q29kZShwb3N0YWxDb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcG9zdGFsQ29kZS5zdWJzdHIoMCwgMyk7XG5cbiAgICByZXR1cm4gdGhpcy5kaWN0TG9hZGVyLmxvYWRGcm9tUHJlZml4KHByZWZpeCkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKCFkaWN0W3Bvc3RhbENvZGVdKSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEVycm9yKCdBZGRyZXNzIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhZGRyZXNzZXMgPSBkaWN0W3Bvc3RhbENvZGVdO1xuICAgICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21BcnJheShhZGRyZXNzZXMpO1xuICAgIH0pO1xuICB9XG4gIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cbn1cbiJdfQ==