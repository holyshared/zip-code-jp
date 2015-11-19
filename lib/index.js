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
      var _this3 = this;

      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return _bluebird.Promise.bind(this).then(function () {
        return readFile(file);
      }).then(function (content) {
        var dict = JSON.parse(content);
        _this3.cacheManager.store(prefix, dict);
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
//# sourceMappingURL=data:application/json;base64,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QU8sVUEzSEYsT0FBTyxDQTJIRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7OztTQXpEa0IsZUFBZTs7O2tCQUFmLGVBQWUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyLCBNZW1vcnlDYWNoZUFkYXB0ZXIgfSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IE5vdEZvdW5kRXJyb3IgfSBmcm9tICcuL2Vycm9yJztcblxuY29uc3QgUFJFRkVDVFVSRV9ESUNUID0gW1xuICBudWxsLCAgICAgICAn5YyX5rW36YGTJywgICAn6Z2S5qOu55yMJywgICAn5bKp5omL55yMJywgICAn5a6u5Z+O55yMJyxcbiAgJ+eni+eUsOecjCcsICAgJ+WxseW9ouecjCcsICAgJ+emj+WztuecjCcsICAgJ+iMqOWfjuecjCcsICAgJ+agg+acqOecjCcsXG4gICfnvqTppqznnIwnLCAgICfln7znjonnnIwnLCAgICfljYPokYnnnIwnLCAgICfmnbHkuqzpg70nLCAgICfnpZ7lpYjlt53nnIwnLFxuICAn5paw5r2f55yMJywgICAn5a+M5bGx55yMJywgICAn55+z5bed55yMJywgICAn56aP5LqV55yMJywgICAn5bGx5qKo55yMJyxcbiAgJ+mVt+mHjuecjCcsICAgJ+WykOmYnOecjCcsICAgJ+mdmeWyoeecjCcsICAgJ+aEm+efpeecjCcsICAgJ+S4iemHjeecjCcsXG4gICfmu4vos4DnnIwnLCAgICfkuqzpg73lupwnLCAgICflpKfpmKrlupwnLCAgICflhbXluqvnnIwnLCAgICflpYjoia/nnIwnLFxuICAn5ZKM5q2M5bGx55yMJywgJ+mzpeWPluecjCcsICAgJ+WztuagueecjCcsICAgJ+WyoeWxseecjCcsICAgJ+W6g+WztuecjCcsXG4gICflsbHlj6PnnIwnLCAgICflvrPls7bnnIwnLCAgICfpppnlt53nnIwnLCAgICfmhJvlqpvnnIwnLCAgICfpq5jnn6XnnIwnLFxuICAn56aP5bKh55yMJywgICAn5L2Q6LOA55yMJywgICAn6ZW35bSO55yMJywgICAn54aK5pys55yMJywgICAn5aSn5YiG55yMJyxcbiAgJ+WuruW0juecjCcsICAgJ+m5v+WFkOWztuecjCcsICfmspbnuITnnIwnXG5dO1xuXG5jb25zdCBQUk9QRVJUSUVTID0ge1xuICAwOiAncHJlZmVjdHVyZScsXG4gIDE6ICdjaXR5JyxcbiAgMjogJ2FyZWEnLFxuICAzOiAnc3RyZWV0J1xufTtcblxubGV0IHJlc3VsdCA9IHt9O1xuXG5PYmplY3Qua2V5cyhQUk9QRVJUSUVTKS5mb3JFYWNoKChrKSA9PiB7XG4gIHJlc3VsdFtrXSA9IG51bGw7XG59KTtcblxuY29uc3QgZW1wdHlSZXN1bHQgPSByZXN1bHQ7XG5cbmNvbnN0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpO1xuXG5leHBvcnQgY2xhc3MgUmVzb2x2ZWRSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwcmVmZWN0dXJlLCBjaXR5LCBhcmVhLCBzdHJlZXQgPSBudWxsKSB7XG4gICAgdGhpcy5wcmVmZWN0dXJlID0gcHJlZmVjdHVyZTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgdGhpcy5zdHJlZXQgPSBzdHJlZXQ7XG4gIH1cbiAgc3RhdGljIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBSZXNvbHZlZFJlc3VsdChcbiAgICAgIG9iamVjdC5wcmVmZWN0dXJlLFxuICAgICAgb2JqZWN0LmNpdHksXG4gICAgICBvYmplY3QuYXJlYSxcbiAgICAgIG9iamVjdC5zdHJlZXRcbiAgICApO1xuICB9XG4gIHN0YXRpYyBmcm9tQXJyYXkoYWRkcmVzc2VzKSB7XG4gICAgbGV0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoZW1wdHlSZXN1bHQpO1xuXG4gICAgYWRkcmVzc2VzLmZvckVhY2goKHZhbCwgaSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gUFJPUEVSVElFU1tpXTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBQUkVGRUNUVVJFX0RJQ1RbdmFsXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21PYmplY3QocmVzdWx0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSBuZXcgTWVtb3J5Q2FjaGVBZGFwdGVyKCkpIHtcbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG5ldyBDYWNoZU1hbmFnZXIoYWRhcHRlcik7XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeUNvZGUoY29kZSk7XG4gICAgfSkudGhlbihmdW5jdGlvbihwYXNzZWQpIHtcbiAgICAgIGlmICghcGFzc2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5UmVzdWx0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0J5Q29kZShjb2RlKTtcbiAgICB9KTtcbiAgfVxuICB2ZXJpZnlDb2RlKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gY29kZSB8fCAnJztcbiAgICBjb25zdCByZXN1bHQgPSAocG9zdGFsQ29kZS5sZW5ndGggPCA3KSA/IGZhbHNlIDogdHJ1ZTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gIH1cbiAgbG9hZEFkZHJlc3NCeUNvZGUocG9zdGFsQ29kZSkge1xuICAgIGNvbnN0IHByZWZpeCA9IHBvc3RhbENvZGUuc3Vic3RyKDAsIDMpO1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NEaWN0aW9uYXJ5KHByZWZpeCkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKCFkaWN0W3Bvc3RhbENvZGVdKSB7XG4gICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEVycm9yKCdBZGRyZXNzIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhZGRyZXNzZXMgPSBkaWN0W3Bvc3RhbENvZGVdO1xuICAgICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21BcnJheShhZGRyZXNzZXMpO1xuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeShwcmVmaXgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5iaW5kKHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCk7XG4gICAgfSkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKGRpY3QpIHtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tRmlsZShwcmVmaXgpO1xuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21DYWNoZShwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZU1hbmFnZXIuZmluZChwcmVmaXgpO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCkge1xuICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLy4uL2pzb24nLCAnemlwLScgKyBwcmVmaXggKyAnLmpzb24nKTtcblxuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gcmVhZEZpbGUoZmlsZSk7XG4gICAgfSkudGhlbigoY29udGVudCkgPT4ge1xuICAgICAgY29uc3QgZGljdCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICB0aGlzLmNhY2hlTWFuYWdlci5zdG9yZShwcmVmaXgsIGRpY3QpO1xuICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19