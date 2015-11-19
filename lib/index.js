'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResolvedResult = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

var _error = require('./error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    this.cacheManager = new _cache.CacheManager(adapter);
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

      return this.loadAddressDictionary(prefix).then(function (dict) {
        if (!dict[postalCode]) {
          throw new _error.NotFoundError('Address could not be found');
        }

        var addresses = dict[postalCode];
        return ResolvedResult.fromArray(addresses);
      });
    }
  }, {
    key: 'loadAddressDictionary',
    value: function loadAddressDictionary(prefix) {
      var _this2 = this;

      return _bluebird.Promise.bind(this).then(function () {
        return _this2.loadAddressDictionaryFromCache(prefix);
      }).then(function (dict) {
        if (dict) {
          return dict;
        }
        return _this2.loadAddressDictionaryFromFile(prefix);
      });
    }
  }, {
    key: 'loadAddressDictionaryFromCache',
    value: function loadAddressDictionaryFromCache(prefix) {
      return this.cacheManager.find(prefix);
    }
  }, {
    key: 'loadAddressDictionaryFromFile',
    value: function loadAddressDictionaryFromFile(prefix) {
      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return readFile(file).then(function (content) {
        var dict = JSON.parse(content);
        return dict;
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
//# sourceMappingURL=data:application/json;base64,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cnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBDYWNoZU1hbmFnZXIsIE1lbW9yeUNhY2hlQWRhcHRlciB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgTm90Rm91bmRFcnJvciB9IGZyb20gJy4vZXJyb3InO1xuXG5jb25zdCBQUkVGRUNUVVJFX0RJQ1QgPSBbXG4gIG51bGwsICAgICAgICfljJfmtbfpgZMnLCAgICfpnZLmo67nnIwnLCAgICflsqnmiYvnnIwnLCAgICflrq7ln47nnIwnLFxuICAn56eL55Sw55yMJywgICAn5bGx5b2i55yMJywgICAn56aP5bO255yMJywgICAn6Iyo5Z+O55yMJywgICAn5qCD5pyo55yMJyxcbiAgJ+e+pOmmrOecjCcsICAgJ+WfvOeOieecjCcsICAgJ+WNg+iRieecjCcsICAgJ+adseS6rOmDvScsICAgJ+elnuWliOW3neecjCcsXG4gICfmlrDmvZ/nnIwnLCAgICflr4zlsbHnnIwnLCAgICfnn7Plt53nnIwnLCAgICfnpo/kupXnnIwnLCAgICflsbHmoqjnnIwnLFxuICAn6ZW36YeO55yMJywgICAn5bKQ6Zic55yMJywgICAn6Z2Z5bKh55yMJywgICAn5oSb55+l55yMJywgICAn5LiJ6YeN55yMJyxcbiAgJ+a7i+izgOecjCcsICAgJ+S6rOmDveW6nCcsICAgJ+Wkp+mYquW6nCcsICAgJ+WFteW6q+ecjCcsICAgJ+WliOiJr+ecjCcsXG4gICflkozmrYzlsbHnnIwnLCAn6bOl5Y+W55yMJywgICAn5bO25qC555yMJywgICAn5bKh5bGx55yMJywgICAn5bqD5bO255yMJyxcbiAgJ+WxseWPo+ecjCcsICAgJ+W+s+WztuecjCcsICAgJ+mmmeW3neecjCcsICAgJ+aEm+Wqm+ecjCcsICAgJ+mrmOefpeecjCcsXG4gICfnpo/lsqHnnIwnLCAgICfkvZDos4DnnIwnLCAgICfplbfltI7nnIwnLCAgICfnhormnKznnIwnLCAgICflpKfliIbnnIwnLFxuICAn5a6u5bSO55yMJywgICAn6bm/5YWQ5bO255yMJywgJ+aylue4hOecjCdcbl07XG5cbmNvbnN0IFBST1BFUlRJRVMgPSB7XG4gIDA6ICdwcmVmZWN0dXJlJyxcbiAgMTogJ2NpdHknLFxuICAyOiAnYXJlYScsXG4gIDM6ICdzdHJlZXQnXG59O1xuXG5sZXQgcmVzdWx0ID0ge307XG5cbk9iamVjdC5rZXlzKFBST1BFUlRJRVMpLmZvckVhY2goKGspID0+IHtcbiAgcmVzdWx0W2tdID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZlZFJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHByZWZlY3R1cmUsIGNpdHksIGFyZWEsIHN0cmVldCA9IG51bGwpIHtcbiAgICB0aGlzLnByZWZlY3R1cmUgPSBwcmVmZWN0dXJlO1xuICAgIHRoaXMuY2l0eSA9IGNpdHk7XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB0aGlzLnN0cmVldCA9IHN0cmVldDtcbiAgfVxuICBzdGF0aWMgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc29sdmVkUmVzdWx0KFxuICAgICAgb2JqZWN0LnByZWZlY3R1cmUsXG4gICAgICBvYmplY3QuY2l0eSxcbiAgICAgIG9iamVjdC5hcmVhLFxuICAgICAgb2JqZWN0LnN0cmVldFxuICAgICk7XG4gIH1cbiAgc3RhdGljIGZyb21BcnJheShhZGRyZXNzZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShlbXB0eVJlc3VsdCk7XG5cbiAgICBhZGRyZXNzZXMuZm9yRWFjaCgodmFsLCBpKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBQUk9QRVJUSUVTW2ldO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICByZXN1bHRba2V5XSA9IFBSRUZFQ1RVUkVfRElDVFt2YWxdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbU9iamVjdChyZXN1bHQpO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzc1Jlc29sdmVyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IG5ldyBNZW1vcnlDYWNoZUFkYXB0ZXIoKSkge1xuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbmV3IENhY2hlTWFuYWdlcihhZGFwdGVyKTtcbiAgfVxuICBmaW5kKGNvZGUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5iaW5kKHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5Q29kZShjb2RlKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHBhc3NlZCkge1xuICAgICAgaWYgKCFwYXNzZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzQnlDb2RlKGNvZGUpO1xuICAgIH0pO1xuICB9XG4gIHZlcmlmeUNvZGUoY29kZSkge1xuICAgIGNvbnN0IHBvc3RhbENvZGUgPSBjb2RlIHx8ICcnO1xuICAgIGNvbnN0IHJlc3VsdCA9IChwb3N0YWxDb2RlLmxlbmd0aCA8IDcpID8gZmFsc2UgOiB0cnVlO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgfVxuICBsb2FkQWRkcmVzc0J5Q29kZShwb3N0YWxDb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcG9zdGFsQ29kZS5zdWJzdHIoMCwgMyk7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnkocHJlZml4KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoIWRpY3RbcG9zdGFsQ29kZV0pIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXJyb3IoJ0FkZHJlc3MgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFkZHJlc3NlcyA9IGRpY3RbcG9zdGFsQ29kZV07XG4gICAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbUFycmF5KGFkZHJlc3Nlcyk7XG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5KHByZWZpeCkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tQ2FjaGUocHJlZml4KTtcbiAgICB9KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoZGljdCkge1xuICAgICAgICByZXR1cm4gZGljdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCk7XG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlTWFuYWdlci5maW5kKHByZWZpeCk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUZpbGUocHJlZml4KSB7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGUpLnRoZW4oKGNvbnRlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRpY3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19