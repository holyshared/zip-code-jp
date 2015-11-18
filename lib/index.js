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

var AddressResolver = (function () {
  function AddressResolver() {
    _classCallCheck(this, AddressResolver);
  }

  _createClass(AddressResolver, [{
    key: 'construct',
    value: function construct(adapter) {
      this.cacheManager = new CacheManager(adapter);
    }
  }, {
    key: 'find',
    value: function find(code) {
      var postalCode = code || '';

      if (postalCode.length < 7) {
        return _bluebird.Promise.resolve(null);
      }

      var prefix = postalCode.substr(0, 3);
      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return new _bluebird.Promise(function (resolve, reject) {
        _fs2.default.readFile(file, function (err, content) {
          if (err) {
            return reject(err);
          }

          var dict = JSON.parse(content);

          if (!dict[postalCode]) {
            throw new NotFoundError('Address could not be found');
          }

          var addresses = dict[postalCode];

          var result = Object.create(emptyResult);

          addresses.forEach(function (val, i) {
            var key = PROPERTIES[i];

            if (i === 0) {
              result[key] = PREFECTURE_DICT[val];
            } else {
              result[key] = val;
            }
          });
          resolve(result);
        });
      });
    }
  }]);

  return AddressResolver;
})();

exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,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TSxFQUFLO0FBQ3RDLHFCQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFLO0FBQ2xDLGNBQUksR0FBRyxFQUFFO0FBQ1AsbUJBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1dBQ3BCOztBQUVELGNBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRWpDLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDckIsa0JBQU0sSUFBSSxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQztXQUN2RDs7QUFFRCxjQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRW5DLGNBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXhDLG1CQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsRUFBSztBQUM1QixnQkFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUUxQixnQkFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1gsb0JBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEMsTUFBTTtBQUNMLG9CQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ25CO1dBQ0YsQ0FBQyxDQUFDO0FBQ0gsaUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQixDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7S0FDSjs7O1NBMUNrQixlQUFlOzs7a0JBQWYsZUFBZSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBjbGFzcyBOb3RGb3VuZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihhcmd1bWVudHMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmlsZUNhY2hlQWRhcHRlciBleHRlbmRzIENhY2hlQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhY2hlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICB0aGlzLmFkYXB0ZXIgPSBhZGFwdGVyO1xuICB9XG59XG5cbmNvbnN0IFBSRUZFQ1RVUkVfRElDVCA9IFtcbiAgbnVsbCwgICAgICAgJ+WMl+a1t+mBkycsICAgJ+mdkuajruecjCcsICAgJ+WyqeaJi+ecjCcsICAgJ+WuruWfjuecjCcsXG4gICfnp4vnlLDnnIwnLCAgICflsbHlvaLnnIwnLCAgICfnpo/ls7bnnIwnLCAgICfojKjln47nnIwnLCAgICfmoIPmnKjnnIwnLFxuICAn576k6aas55yMJywgICAn5Z+8546J55yMJywgICAn5Y2D6JGJ55yMJywgICAn5p2x5Lqs6YO9JywgICAn56We5aWI5bed55yMJyxcbiAgJ+aWsOa9n+ecjCcsICAgJ+WvjOWxseecjCcsICAgJ+efs+W3neecjCcsICAgJ+emj+S6leecjCcsICAgJ+WxseaiqOecjCcsXG4gICfplbfph47nnIwnLCAgICflspDpmJznnIwnLCAgICfpnZnlsqHnnIwnLCAgICfmhJvnn6XnnIwnLCAgICfkuInph43nnIwnLFxuICAn5ruL6LOA55yMJywgICAn5Lqs6YO95bqcJywgICAn5aSn6Ziq5bqcJywgICAn5YW15bqr55yMJywgICAn5aWI6Imv55yMJyxcbiAgJ+WSjOatjOWxseecjCcsICfps6Xlj5bnnIwnLCAgICfls7bmoLnnnIwnLCAgICflsqHlsbHnnIwnLCAgICfluoPls7bnnIwnLFxuICAn5bGx5Y+j55yMJywgICAn5b6z5bO255yMJywgICAn6aaZ5bed55yMJywgICAn5oSb5aqb55yMJywgICAn6auY55+l55yMJyxcbiAgJ+emj+WyoeecjCcsICAgJ+S9kOizgOecjCcsICAgJ+mVt+W0juecjCcsICAgJ+eGiuacrOecjCcsICAgJ+Wkp+WIhuecjCcsXG4gICflrq7ltI7nnIwnLCAgICfpub/lhZDls7bnnIwnLCAn5rKW57iE55yMJ1xuXTtcblxuY29uc3QgUFJPUEVSVElFUyA9IHtcbiAgMDogJ3ByZWZlY3R1cmUnLFxuICAxOiAnY2l0eScsXG4gIDI6ICdhcmVhJyxcbiAgMzogJ3N0cmVldCdcbn07XG5cbmxldCByZXN1bHQgPSB7fTtcblxuT2JqZWN0LmtleXMoUFJPUEVSVElFUykuZm9yRWFjaCgoaykgPT4ge1xuICByZXN1bHRba10gPSBudWxsO1xufSk7XG5cbmNvbnN0IGVtcHR5UmVzdWx0ID0gcmVzdWx0O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3QoYWRhcHRlcikge1xuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbmV3IENhY2hlTWFuYWdlcihhZGFwdGVyKTtcbiAgfVxuICBmaW5kKGNvZGUpIHtcbiAgICBjb25zdCBwb3N0YWxDb2RlID0gY29kZSB8fCAnJztcblxuICAgIGlmIChwb3N0YWxDb2RlLmxlbmd0aCA8IDcpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJlZml4ID0gcG9zdGFsQ29kZS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZzLnJlYWRGaWxlKGZpbGUsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpY3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuXG4gICAgICAgIGlmICghZGljdFtwb3N0YWxDb2RlXSkge1xuICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEVycm9yKCdBZGRyZXNzIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWRkcmVzc2VzID0gZGljdFtwb3N0YWxDb2RlXTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShlbXB0eVJlc3VsdCk7XG5cbiAgICAgICAgYWRkcmVzc2VzLmZvckVhY2goKHZhbCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IFBST1BFUlRJRVNbaV07XG5cbiAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBQUkVGRUNUVVJFX0RJQ1RbdmFsXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==