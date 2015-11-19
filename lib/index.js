'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var ResolvedResult = (function () {
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
  function AddressResolver(adapter) {
    _classCallCheck(this, AddressResolver);

    this.cacheManager = new _cache.CacheManager(adapter);
  }

  _createClass(AddressResolver, [{
    key: 'find',
    value: function find(code) {
      var _this = this;

      return _bluebird.Promise.bind(this).then(function () {
        return _this.verifyCode(code);
      }).then(function (postalCode) {
        if (!postalCode) {
          return this.emptyResult();
        }
        return this.loadAddressByCode(postalCode);
      });
    }
  }, {
    key: 'verifyCode',
    value: function verifyCode(code) {
      var postalCode = code || '';

      if (postalCode.length < 7) {
        return _bluebird.Promise.resolve(null);
      }
      return _bluebird.Promise.resolve(postalCode);
    }
  }, {
    key: 'loadAddressByCode',
    value: function loadAddressByCode(postalCode) {
      var prefix = postalCode.substr(0, 3);
      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return readFile(file).then(function (content) {
        var dict = JSON.parse(content);

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
//# sourceMappingURL=data:application/json;base64,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S0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVqQyxZQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3JCLGdCQUFNLFdBL0ZMLGFBQWEsQ0ErRlUsNEJBQTRCLENBQUMsQ0FBQztTQUN2RDs7QUFFRCxZQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsZUFBTyxjQUFjLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQzVDLENBQUMsQ0FBQztLQUNKOzs7a0NBQ2E7QUFDWixhQUFPLFVBekdGLE9BQU8sQ0F5R0csT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCOzs7U0F2Q2tCLGVBQWU7OztrQkFBZixlQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IENhY2hlTWFuYWdlciB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgTm90Rm91bmRFcnJvciB9IGZyb20gJy4vZXJyb3InO1xuXG5jb25zdCBQUkVGRUNUVVJFX0RJQ1QgPSBbXG4gIG51bGwsICAgICAgICfljJfmtbfpgZMnLCAgICfpnZLmo67nnIwnLCAgICflsqnmiYvnnIwnLCAgICflrq7ln47nnIwnLFxuICAn56eL55Sw55yMJywgICAn5bGx5b2i55yMJywgICAn56aP5bO255yMJywgICAn6Iyo5Z+O55yMJywgICAn5qCD5pyo55yMJyxcbiAgJ+e+pOmmrOecjCcsICAgJ+WfvOeOieecjCcsICAgJ+WNg+iRieecjCcsICAgJ+adseS6rOmDvScsICAgJ+elnuWliOW3neecjCcsXG4gICfmlrDmvZ/nnIwnLCAgICflr4zlsbHnnIwnLCAgICfnn7Plt53nnIwnLCAgICfnpo/kupXnnIwnLCAgICflsbHmoqjnnIwnLFxuICAn6ZW36YeO55yMJywgICAn5bKQ6Zic55yMJywgICAn6Z2Z5bKh55yMJywgICAn5oSb55+l55yMJywgICAn5LiJ6YeN55yMJyxcbiAgJ+a7i+izgOecjCcsICAgJ+S6rOmDveW6nCcsICAgJ+Wkp+mYquW6nCcsICAgJ+WFteW6q+ecjCcsICAgJ+WliOiJr+ecjCcsXG4gICflkozmrYzlsbHnnIwnLCAn6bOl5Y+W55yMJywgICAn5bO25qC555yMJywgICAn5bKh5bGx55yMJywgICAn5bqD5bO255yMJyxcbiAgJ+WxseWPo+ecjCcsICAgJ+W+s+WztuecjCcsICAgJ+mmmeW3neecjCcsICAgJ+aEm+Wqm+ecjCcsICAgJ+mrmOefpeecjCcsXG4gICfnpo/lsqHnnIwnLCAgICfkvZDos4DnnIwnLCAgICfplbfltI7nnIwnLCAgICfnhormnKznnIwnLCAgICflpKfliIbnnIwnLFxuICAn5a6u5bSO55yMJywgICAn6bm/5YWQ5bO255yMJywgJ+aylue4hOecjCdcbl07XG5cbmNvbnN0IFBST1BFUlRJRVMgPSB7XG4gIDA6ICdwcmVmZWN0dXJlJyxcbiAgMTogJ2NpdHknLFxuICAyOiAnYXJlYScsXG4gIDM6ICdzdHJlZXQnXG59O1xuXG5sZXQgcmVzdWx0ID0ge307XG5cbk9iamVjdC5rZXlzKFBST1BFUlRJRVMpLmZvckVhY2goKGspID0+IHtcbiAgcmVzdWx0W2tdID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmNsYXNzIFJlc29sdmVkUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHJlZmVjdHVyZSwgY2l0eSwgYXJlYSwgc3RyZWV0ID0gbnVsbCkge1xuICAgIHRoaXMucHJlZmVjdHVyZSA9IHByZWZlY3R1cmU7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgIHRoaXMuc3RyZWV0ID0gc3RyZWV0O1xuICB9XG4gIHN0YXRpYyBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiBuZXcgUmVzb2x2ZWRSZXN1bHQoXG4gICAgICBvYmplY3QucHJlZmVjdHVyZSxcbiAgICAgIG9iamVjdC5jaXR5LFxuICAgICAgb2JqZWN0LmFyZWEsXG4gICAgICBvYmplY3Quc3RyZWV0XG4gICAgKTtcbiAgfVxuICBzdGF0aWMgZnJvbUFycmF5KGFkZHJlc3Nlcykge1xuICAgIGxldCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKGVtcHR5UmVzdWx0KTtcblxuICAgIGFkZHJlc3Nlcy5mb3JFYWNoKCh2YWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IFBST1BFUlRJRVNbaV07XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gUFJFRkVDVFVSRV9ESUNUW3ZhbF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tT2JqZWN0KHJlc3VsdCk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgdGhpcy5jYWNoZU1hbmFnZXIgPSBuZXcgQ2FjaGVNYW5hZ2VyKGFkYXB0ZXIpO1xuICB9XG4gIGZpbmQoY29kZSkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy52ZXJpZnlDb2RlKGNvZGUpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24ocG9zdGFsQ29kZSkge1xuICAgICAgaWYgKCFwb3N0YWxDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0J5Q29kZShwb3N0YWxDb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gY29kZSB8fCAnJztcblxuICAgIGlmIChwb3N0YWxDb2RlLmxlbmd0aCA8IDcpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocG9zdGFsQ29kZSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NCeUNvZGUocG9zdGFsQ29kZSkge1xuICAgIGNvbnN0IHByZWZpeCA9IHBvc3RhbENvZGUuc3Vic3RyKDAsIDMpO1xuICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLy4uL2pzb24nLCAnemlwLScgKyBwcmVmaXggKyAnLmpzb24nKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlKS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICBjb25zdCBkaWN0ID0gSlNPTi5wYXJzZShjb250ZW50KTtcblxuICAgICAgaWYgKCFkaWN0W3Bvc3RhbENvZGVdKSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEVycm9yKCdBZGRyZXNzIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhZGRyZXNzZXMgPSBkaWN0W3Bvc3RhbENvZGVdO1xuICAgICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21BcnJheShhZGRyZXNzZXMpO1xuICAgIH0pO1xuICB9XG4gIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cbn1cbiJdfQ==