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
//# sourceMappingURL=data:application/json;base64,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QVosQ0FKcUQ7QUFLM0QsZUFBTyxlQUFlLFNBQWYsQ0FBeUIsU0FBekIsQ0FBUCxDQUwyRDtPQUFWLENBQW5ELENBSDRCOzs7O2tDQVdoQjtBQUNaLGFBQU8sa0JBQVEsT0FBUixDQUFnQixJQUFoQixDQUFQLENBRFk7Ozs7U0ExQ0siLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyLCBNZW1vcnlDYWNoZUFkYXB0ZXIsIENhY2hlQWRhcHRlciB9IGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciwgRGljdGlvbmFyeUxvYWRlciB9IGZyb20gJy4vZGljdGlvbmFyeS1sb2FkZXInO1xuXG5leHBvcnQgY29uc3QgY2FjaGUgPSB7XG4gIENhY2hlTWFuYWdlcjogQ2FjaGVNYW5hZ2VyLFxuICBDYWNoZUFkYXB0ZXI6IENhY2hlQWRhcHRlcixcbiAgTWVtb3J5Q2FjaGVBZGFwdGVyOiBNZW1vcnlDYWNoZUFkYXB0ZXJcbn07XG5cbmV4cG9ydCBjb25zdCBkaWN0ID0ge1xuICBEaWN0aW9uYXJ5TG9hZGVyOiBEaWN0aW9uYXJ5TG9hZGVyLFxuICBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyOiBDYWNoZWFibGVEaWN0aW9uYXJ5TG9hZGVyXG59O1xuXG5jb25zdCBQUkVGRUNUVVJFX0RJQ1QgPSBbXG4gIG51bGwsICAgICAgICfljJfmtbfpgZMnLCAgICfpnZLmo67nnIwnLCAgICflsqnmiYvnnIwnLCAgICflrq7ln47nnIwnLFxuICAn56eL55Sw55yMJywgICAn5bGx5b2i55yMJywgICAn56aP5bO255yMJywgICAn6Iyo5Z+O55yMJywgICAn5qCD5pyo55yMJyxcbiAgJ+e+pOmmrOecjCcsICAgJ+WfvOeOieecjCcsICAgJ+WNg+iRieecjCcsICAgJ+adseS6rOmDvScsICAgJ+elnuWliOW3neecjCcsXG4gICfmlrDmvZ/nnIwnLCAgICflr4zlsbHnnIwnLCAgICfnn7Plt53nnIwnLCAgICfnpo/kupXnnIwnLCAgICflsbHmoqjnnIwnLFxuICAn6ZW36YeO55yMJywgICAn5bKQ6Zic55yMJywgICAn6Z2Z5bKh55yMJywgICAn5oSb55+l55yMJywgICAn5LiJ6YeN55yMJyxcbiAgJ+a7i+izgOecjCcsICAgJ+S6rOmDveW6nCcsICAgJ+Wkp+mYquW6nCcsICAgJ+WFteW6q+ecjCcsICAgJ+WliOiJr+ecjCcsXG4gICflkozmrYzlsbHnnIwnLCAn6bOl5Y+W55yMJywgICAn5bO25qC555yMJywgICAn5bKh5bGx55yMJywgICAn5bqD5bO255yMJyxcbiAgJ+WxseWPo+ecjCcsICAgJ+W+s+WztuecjCcsICAgJ+mmmeW3neecjCcsICAgJ+aEm+Wqm+ecjCcsICAgJ+mrmOefpeecjCcsXG4gICfnpo/lsqHnnIwnLCAgICfkvZDos4DnnIwnLCAgICfplbfltI7nnIwnLCAgICfnhormnKznnIwnLCAgICflpKfliIbnnIwnLFxuICAn5a6u5bSO55yMJywgICAn6bm/5YWQ5bO255yMJywgJ+aylue4hOecjCdcbl07XG5cbmNvbnN0IFBST1BFUlRJRVMgPSB7XG4gIDA6ICdwcmVmZWN0dXJlJyxcbiAgMTogJ2NpdHknLFxuICAyOiAnYXJlYScsXG4gIDM6ICdzdHJlZXQnXG59O1xuXG5sZXQgcmVzdWx0ID0ge307XG5cbk9iamVjdC5rZXlzKFBST1BFUlRJRVMpLmZvckVhY2goKGspID0+IHtcbiAgY29uc3Qga2V5ID0gUFJPUEVSVElFU1trXTtcbiAgcmVzdWx0W2tleV0gPSBudWxsO1xufSk7XG5cbmNvbnN0IGVtcHR5UmVzdWx0ID0gcmVzdWx0O1xuXG5jb25zdCByZWFkRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLnJlYWRGaWxlKTtcblxuZXhwb3J0IGNsYXNzIFJlc29sdmVkUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHJlZmVjdHVyZSwgY2l0eSwgYXJlYSwgc3RyZWV0ID0gbnVsbCkge1xuICAgIHRoaXMucHJlZmVjdHVyZSA9IHByZWZlY3R1cmU7XG4gICAgdGhpcy5jaXR5ID0gY2l0eTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgIHRoaXMuc3RyZWV0ID0gc3RyZWV0O1xuICB9XG4gIHN0YXRpYyBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgIHJldHVybiBuZXcgUmVzb2x2ZWRSZXN1bHQoXG4gICAgICBvYmplY3QucHJlZmVjdHVyZSxcbiAgICAgIG9iamVjdC5jaXR5LFxuICAgICAgb2JqZWN0LmFyZWEsXG4gICAgICBvYmplY3Quc3RyZWV0XG4gICAgKTtcbiAgfVxuICBzdGF0aWMgZnJvbUFycmF5KGFkZHJlc3Nlcykge1xuICAgIGxldCByZXN1bHQgPSBSZXNvbHZlZFJlc3VsdC5lbXB0eVJlc3VsdCgpO1xuXG4gICAgYWRkcmVzc2VzLmZvckVhY2goKHZhbCwgaSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gUFJPUEVSVElFU1tpXTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBQUkVGRUNUVVJFX0RJQ1RbdmFsXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21PYmplY3QocmVzdWx0KTtcbiAgfVxuICBzdGF0aWMgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoZW1wdHlSZXN1bHQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSBuZXcgTWVtb3J5Q2FjaGVBZGFwdGVyKCkpIHtcbiAgICB0aGlzLmRpY3RMb2FkZXIgPSBuZXcgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlcihhZGFwdGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBhZGRyZXNzIGZyb20gdGhlIHBvc3RhbCBjb2RlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqIEB0aHJvd3Mge0FkZHJlc3NOb3RGb3VuZEVycm9yfSBUaHJvd24gaWYgdGhlIGFkZHJlc3MgaXMgbm90IGZvdW5kXG4gICAqL1xuICBmaW5kKGNvZGUpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5iaW5kKHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5Q29kZShjb2RlKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgaWYgKCFyZXN1bHQucGFzc2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0J5Q29kZShyZXN1bHQucG9zdGFsQ29kZSk7XG4gICAgfSk7XG4gIH1cbiAgdmVyaWZ5Q29kZShjb2RlKSB7XG4gICAgY29uc3QgcG9zdGFsQ29kZSA9IChjb2RlIHx8ICcnKS5yZXBsYWNlKC8tLywgJycpO1xuICAgIGNvbnN0IHJlc3VsdCA9IChwb3N0YWxDb2RlLmxlbmd0aCA8IDcpID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICBwYXNzZWQ6IHJlc3VsdCxcbiAgICAgIHBvc3RhbENvZGU6IHBvc3RhbENvZGVcbiAgICB9KTtcbiAgfVxuICBsb2FkQWRkcmVzc0J5Q29kZShwb3N0YWxDb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcG9zdGFsQ29kZS5zdWJzdHIoMCwgMyk7XG5cbiAgICByZXR1cm4gdGhpcy5kaWN0TG9hZGVyLmxvYWRGcm9tUHJlZml4KHByZWZpeCkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKCFkaWN0W3Bvc3RhbENvZGVdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBhZGRyZXNzZXMgPSBkaWN0W3Bvc3RhbENvZGVdO1xuICAgICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21BcnJheShhZGRyZXNzZXMpO1xuICAgIH0pO1xuICB9XG4gIGVtcHR5UmVzdWx0KCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cbn1cbiJdfQ==