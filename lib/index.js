'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManager = exports.FileCacheAdapter = exports.CacheAdapter = exports.NotFoundError = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFoundError = exports.NotFoundError = (function (_Error) {
  _inherits(NotFoundError, _Error);

  function NotFoundError() {
    _classCallCheck(this, NotFoundError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFoundError).call(this, arguments));
  }

  return NotFoundError;
})(Error);

var CacheAdapter = exports.CacheAdapter = function CacheAdapter() {
  _classCallCheck(this, CacheAdapter);
};

var FileCacheAdapter = exports.FileCacheAdapter = (function (_CacheAdapter) {
  _inherits(FileCacheAdapter, _CacheAdapter);

  function FileCacheAdapter() {
    _classCallCheck(this, FileCacheAdapter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FileCacheAdapter).call(this));
  }

  return FileCacheAdapter;
})(CacheAdapter);

var CacheManager = exports.CacheManager = function CacheManager(adapter) {
  _classCallCheck(this, CacheManager);

  this.adapter = adapter;
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

    this.cacheManager = new CacheManager(adapter);
  }

  _createClass(AddressResolver, [{
    key: 'find',
    value: function find(code) {
      var postalCode = code || '';

      if (postalCode.length < 7) {
        return _bluebird.Promise.resolve(null);
      }

      var prefix = postalCode.substr(0, 3);
      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return readFile(file).then(function (content) {
        var dict = JSON.parse(content);

        if (!dict[postalCode]) {
          throw new NotFoundError('Address could not be found');
        }

        var addresses = dict[postalCode];

        return ResolvedResult.fromArray(addresses);
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
  }]);

  return AddressResolver;
})();

exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,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SSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRWpDLFlBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDckIsZ0JBQU0sSUFBSSxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUN2RDs7QUFFRCxZQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRW5DLGVBQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztPQUM1QyxDQUFDLENBQUM7S0FDSjs7OytCQUVVLElBQUksRUFBRTtBQUNmLFVBQU0sVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7O0FBRTlCLFVBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDekIsZUFBTyxVQXZISixPQUFPLENBdUhLLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUM5QjtBQUNELGFBQU8sVUF6SEYsT0FBTyxDQXlIRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7OztTQWxDa0IsZUFBZTs7O2tCQUFmLGVBQWUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgY2xhc3MgTm90Rm91bmRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoYXJndW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVDYWNoZUFkYXB0ZXIgZXh0ZW5kcyBDYWNoZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlcjtcbiAgfVxufVxuXG5jb25zdCBQUkVGRUNUVVJFX0RJQ1QgPSBbXG4gIG51bGwsICAgICAgICfljJfmtbfpgZMnLCAgICfpnZLmo67nnIwnLCAgICflsqnmiYvnnIwnLCAgICflrq7ln47nnIwnLFxuICAn56eL55Sw55yMJywgICAn5bGx5b2i55yMJywgICAn56aP5bO255yMJywgICAn6Iyo5Z+O55yMJywgICAn5qCD5pyo55yMJyxcbiAgJ+e+pOmmrOecjCcsICAgJ+WfvOeOieecjCcsICAgJ+WNg+iRieecjCcsICAgJ+adseS6rOmDvScsICAgJ+elnuWliOW3neecjCcsXG4gICfmlrDmvZ/nnIwnLCAgICflr4zlsbHnnIwnLCAgICfnn7Plt53nnIwnLCAgICfnpo/kupXnnIwnLCAgICflsbHmoqjnnIwnLFxuICAn6ZW36YeO55yMJywgICAn5bKQ6Zic55yMJywgICAn6Z2Z5bKh55yMJywgICAn5oSb55+l55yMJywgICAn5LiJ6YeN55yMJyxcbiAgJ+a7i+izgOecjCcsICAgJ+S6rOmDveW6nCcsICAgJ+Wkp+mYquW6nCcsICAgJ+WFteW6q+ecjCcsICAgJ+WliOiJr+ecjCcsXG4gICflkozmrYzlsbHnnIwnLCAn6bOl5Y+W55yMJywgICAn5bO25qC555yMJywgICAn5bKh5bGx55yMJywgICAn5bqD5bO255yMJyxcbiAgJ+WxseWPo+ecjCcsICAgJ+W+s+WztuecjCcsICAgJ+mmmeW3neecjCcsICAgJ+aEm+Wqm+ecjCcsICAgJ+mrmOefpeecjCcsXG4gICfnpo/lsqHnnIwnLCAgICfkvZDos4DnnIwnLCAgICfplbfltI7nnIwnLCAgICfnhormnKznnIwnLCAgICflpKfliIbnnIwnLFxuICAn5a6u5bSO55yMJywgICAn6bm/5YWQ5bO255yMJywgJ+aylue4hOecjCdcbl07XG5cbmNvbnN0IFBST1BFUlRJRVMgPSB7XG4gIDA6ICdwcmVmZWN0dXJlJyxcbiAgMTogJ2NpdHknLFxuICAyOiAnYXJlYScsXG4gIDM6ICdzdHJlZXQnXG59O1xuXG5sZXQgcmVzdWx0ID0ge307XG5cbk9iamVjdC5rZXlzKFBST1BFUlRJRVMpLmZvckVhY2goKGspID0+IHtcbiAgcmVzdWx0W2tdID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmNsYXNzIFJlc29sdmVkUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHJlZmVjdHVyZSwgY2l0eSwgYXJlYSwgc3RyZWV0ID0gbnVsbCkge1xuICAgIHRoaXMucHJlZmVjdHVyZSA9IHByZWZlY3R1cmU7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgIHRoaXMuc3RyZWV0ID0gc3RyZWV0O1xuICB9XG4gIHN0YXRpYyBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiBuZXcgUmVzb2x2ZWRSZXN1bHQoXG4gICAgICBvYmplY3QucHJlZmVjdHVyZSxcbiAgICAgIG9iamVjdC5jaXR5LFxuICAgICAgb2JqZWN0LmFyZWEsXG4gICAgICBvYmplY3Quc3RyZWV0XG4gICAgKTtcbiAgfVxuICBzdGF0aWMgZnJvbUFycmF5KGFkZHJlc3Nlcykge1xuICAgIGxldCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKGVtcHR5UmVzdWx0KTtcblxuICAgIGFkZHJlc3Nlcy5mb3JFYWNoKCh2YWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IFBST1BFUlRJRVNbaV07XG5cbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gUFJFRkVDVFVSRV9ESUNUW3ZhbF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZXNvbHZlZFJlc3VsdC5mcm9tT2JqZWN0KHJlc3VsdCk7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgdGhpcy5jYWNoZU1hbmFnZXIgPSBuZXcgQ2FjaGVNYW5hZ2VyKGFkYXB0ZXIpO1xuICB9XG4gIGZpbmQoY29kZSkge1xuICAgIGNvbnN0IHBvc3RhbENvZGUgPSBjb2RlIHx8ICcnO1xuXG4gICAgaWYgKHBvc3RhbENvZGUubGVuZ3RoIDwgNykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmVmaXggPSBwb3N0YWxDb2RlLnN1YnN0cigwLCAzKTtcbiAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy8uLi9qc29uJywgJ3ppcC0nICsgcHJlZml4ICsgJy5qc29uJyk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZSkudGhlbigoY29udGVudCkgPT4ge1xuICAgICAgY29uc3QgZGljdCA9IEpTT04ucGFyc2UoY29udGVudCk7XG5cbiAgICAgIGlmICghZGljdFtwb3N0YWxDb2RlXSkge1xuICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmRFcnJvcignQWRkcmVzcyBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWRkcmVzc2VzID0gZGljdFtwb3N0YWxDb2RlXTtcblxuICAgICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21BcnJheShhZGRyZXNzZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgdmVyaWZ5Q29kZShjb2RlKSB7XG4gICAgY29uc3QgcG9zdGFsQ29kZSA9IGNvZGUgfHwgJyc7XG5cbiAgICBpZiAocG9zdGFsQ29kZS5sZW5ndGggPCA3KSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBvc3RhbENvZGUpO1xuICB9XG5cbn1cbiJdfQ==