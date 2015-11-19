'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundError = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

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
      var _this2 = this;

      return _bluebird.Promise.bind(this).then(function () {
        return _this2.verifyCode(code);
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
          throw new NotFoundError('Address could not be found');
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
//# sourceMappingURL=data:application/json;base64,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TUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDOztBQUV6RSxhQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDdEMsWUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFakMsWUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNyQixnQkFBTSxJQUFJLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ3ZEOztBQUVELFlBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxlQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7T0FDNUMsQ0FBQyxDQUFDO0tBQ0o7OztrQ0FDYTtBQUNaLGFBQU8sVUE5R0YsT0FBTyxDQThHRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7OztTQXZDa0IsZUFBZTs7O2tCQUFmLGVBQWUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyIH0gZnJvbSAnLi9jYWNoZSc7XG5cbmV4cG9ydCBjbGFzcyBOb3RGb3VuZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihhcmd1bWVudHMpO1xuICB9XG59XG5cbmNvbnN0IFBSRUZFQ1RVUkVfRElDVCA9IFtcbiAgbnVsbCwgICAgICAgJ+WMl+a1t+mBkycsICAgJ+mdkuajruecjCcsICAgJ+WyqeaJi+ecjCcsICAgJ+WuruWfjuecjCcsXG4gICfnp4vnlLDnnIwnLCAgICflsbHlvaLnnIwnLCAgICfnpo/ls7bnnIwnLCAgICfojKjln47nnIwnLCAgICfmoIPmnKjnnIwnLFxuICAn576k6aas55yMJywgICAn5Z+8546J55yMJywgICAn5Y2D6JGJ55yMJywgICAn5p2x5Lqs6YO9JywgICAn56We5aWI5bed55yMJyxcbiAgJ+aWsOa9n+ecjCcsICAgJ+WvjOWxseecjCcsICAgJ+efs+W3neecjCcsICAgJ+emj+S6leecjCcsICAgJ+WxseaiqOecjCcsXG4gICfplbfph47nnIwnLCAgICflspDpmJznnIwnLCAgICfpnZnlsqHnnIwnLCAgICfmhJvnn6XnnIwnLCAgICfkuInph43nnIwnLFxuICAn5ruL6LOA55yMJywgICAn5Lqs6YO95bqcJywgICAn5aSn6Ziq5bqcJywgICAn5YW15bqr55yMJywgICAn5aWI6Imv55yMJyxcbiAgJ+WSjOatjOWxseecjCcsICfps6Xlj5bnnIwnLCAgICfls7bmoLnnnIwnLCAgICflsqHlsbHnnIwnLCAgICfluoPls7bnnIwnLFxuICAn5bGx5Y+j55yMJywgICAn5b6z5bO255yMJywgICAn6aaZ5bed55yMJywgICAn5oSb5aqb55yMJywgICAn6auY55+l55yMJyxcbiAgJ+emj+WyoeecjCcsICAgJ+S9kOizgOecjCcsICAgJ+mVt+W0juecjCcsICAgJ+eGiuacrOecjCcsICAgJ+Wkp+WIhuecjCcsXG4gICflrq7ltI7nnIwnLCAgICfpub/lhZDls7bnnIwnLCAn5rKW57iE55yMJ1xuXTtcblxuY29uc3QgUFJPUEVSVElFUyA9IHtcbiAgMDogJ3ByZWZlY3R1cmUnLFxuICAxOiAnY2l0eScsXG4gIDI6ICdhcmVhJyxcbiAgMzogJ3N0cmVldCdcbn07XG5cbmxldCByZXN1bHQgPSB7fTtcblxuT2JqZWN0LmtleXMoUFJPUEVSVElFUykuZm9yRWFjaCgoaykgPT4ge1xuICByZXN1bHRba10gPSBudWxsO1xufSk7XG5cbmNvbnN0IGVtcHR5UmVzdWx0ID0gcmVzdWx0O1xuXG5jb25zdCByZWFkRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLnJlYWRGaWxlKTtcblxuY2xhc3MgUmVzb2x2ZWRSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwcmVmZWN0dXJlLCBjaXR5LCBhcmVhLCBzdHJlZXQgPSBudWxsKSB7XG4gICAgdGhpcy5wcmVmZWN0dXJlID0gcHJlZmVjdHVyZTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgdGhpcy5zdHJlZXQgPSBzdHJlZXQ7XG4gIH1cbiAgc3RhdGljIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBSZXNvbHZlZFJlc3VsdChcbiAgICAgIG9iamVjdC5wcmVmZWN0dXJlLFxuICAgICAgb2JqZWN0LmNpdHksXG4gICAgICBvYmplY3QuYXJlYSxcbiAgICAgIG9iamVjdC5zdHJlZXRcbiAgICApO1xuICB9XG4gIHN0YXRpYyBmcm9tQXJyYXkoYWRkcmVzc2VzKSB7XG4gICAgbGV0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoZW1wdHlSZXN1bHQpO1xuXG4gICAgYWRkcmVzc2VzLmZvckVhY2goKHZhbCwgaSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gUFJPUEVSVElFU1tpXTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSBQUkVGRUNUVVJFX0RJQ1RbdmFsXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJlc29sdmVkUmVzdWx0LmZyb21PYmplY3QocmVzdWx0KTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG5ldyBDYWNoZU1hbmFnZXIoYWRhcHRlcik7XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnZlcmlmeUNvZGUoY29kZSk7XG4gICAgfSkudGhlbihmdW5jdGlvbihwb3N0YWxDb2RlKSB7XG4gICAgICBpZiAoIXBvc3RhbENvZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlSZXN1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzQnlDb2RlKHBvc3RhbENvZGUpO1xuICAgIH0pO1xuICB9XG4gIHZlcmlmeUNvZGUoY29kZSkge1xuICAgIGNvbnN0IHBvc3RhbENvZGUgPSBjb2RlIHx8ICcnO1xuXG4gICAgaWYgKHBvc3RhbENvZGUubGVuZ3RoIDwgNykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwb3N0YWxDb2RlKTtcbiAgfVxuICBsb2FkQWRkcmVzc0J5Q29kZShwb3N0YWxDb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcG9zdGFsQ29kZS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGUpLnRoZW4oKGNvbnRlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRpY3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuXG4gICAgICBpZiAoIWRpY3RbcG9zdGFsQ29kZV0pIHtcbiAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kRXJyb3IoJ0FkZHJlc3MgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFkZHJlc3NlcyA9IGRpY3RbcG9zdGFsQ29kZV07XG4gICAgICByZXR1cm4gUmVzb2x2ZWRSZXN1bHQuZnJvbUFycmF5KGFkZHJlc3Nlcyk7XG4gICAgfSk7XG4gIH1cbiAgZW1wdHlSZXN1bHQoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxufVxuIl19