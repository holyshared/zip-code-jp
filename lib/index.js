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
      var prefix = code.substr(0, 3);
      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return new _bluebird.Promise(function (resolve, reject) {
        _fs2.default.readFile(file, function (err, content) {
          if (err) {
            return reject(err);
          }

          var dict = JSON.parse(content);

          if (!dict[code]) {
            throw new NotFoundError('Address could not be found');
          }

          var addresses = dict[code];

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
//# sourceMappingURL=data:application/json;base64,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LEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFakMsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNmLGtCQUFNLElBQUksYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7V0FDdkQ7O0FBRUQsY0FBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUU3QixjQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUV4QyxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUs7QUFDNUIsZ0JBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFMUIsZ0JBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNYLG9CQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BDLE1BQU07QUFDTCxvQkFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUNuQjtXQUNGLENBQUMsQ0FBQztBQUNILGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakIsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0o7OztTQXBDa0IsZUFBZTs7O2tCQUFmLGVBQWUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgY2xhc3MgTm90Rm91bmRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoYXJndW1lbnRzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVDYWNoZUFkYXB0ZXIgZXh0ZW5kcyBDYWNoZUFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZU1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlcjtcbiAgfVxufVxuXG5jb25zdCBQUkVGRUNUVVJFX0RJQ1QgPSBbXG4gIG51bGwsICAgICAgICfljJfmtbfpgZMnLCAgICfpnZLmo67nnIwnLCAgICflsqnmiYvnnIwnLCAgICflrq7ln47nnIwnLFxuICAn56eL55Sw55yMJywgICAn5bGx5b2i55yMJywgICAn56aP5bO255yMJywgICAn6Iyo5Z+O55yMJywgICAn5qCD5pyo55yMJyxcbiAgJ+e+pOmmrOecjCcsICAgJ+WfvOeOieecjCcsICAgJ+WNg+iRieecjCcsICAgJ+adseS6rOmDvScsICAgJ+elnuWliOW3neecjCcsXG4gICfmlrDmvZ/nnIwnLCAgICflr4zlsbHnnIwnLCAgICfnn7Plt53nnIwnLCAgICfnpo/kupXnnIwnLCAgICflsbHmoqjnnIwnLFxuICAn6ZW36YeO55yMJywgICAn5bKQ6Zic55yMJywgICAn6Z2Z5bKh55yMJywgICAn5oSb55+l55yMJywgICAn5LiJ6YeN55yMJyxcbiAgJ+a7i+izgOecjCcsICAgJ+S6rOmDveW6nCcsICAgJ+Wkp+mYquW6nCcsICAgJ+WFteW6q+ecjCcsICAgJ+WliOiJr+ecjCcsXG4gICflkozmrYzlsbHnnIwnLCAn6bOl5Y+W55yMJywgICAn5bO25qC555yMJywgICAn5bKh5bGx55yMJywgICAn5bqD5bO255yMJyxcbiAgJ+WxseWPo+ecjCcsICAgJ+W+s+WztuecjCcsICAgJ+mmmeW3neecjCcsICAgJ+aEm+Wqm+ecjCcsICAgJ+mrmOefpeecjCcsXG4gICfnpo/lsqHnnIwnLCAgICfkvZDos4DnnIwnLCAgICfplbfltI7nnIwnLCAgICfnhormnKznnIwnLCAgICflpKfliIbnnIwnLFxuICAn5a6u5bSO55yMJywgICAn6bm/5YWQ5bO255yMJywgJ+aylue4hOecjCdcbl07XG5cbmNvbnN0IFBST1BFUlRJRVMgPSB7XG4gIDA6ICdwcmVmZWN0dXJlJyxcbiAgMTogJ2NpdHknLFxuICAyOiAnYXJlYScsXG4gIDM6ICdzdHJlZXQnXG59O1xuXG5sZXQgcmVzdWx0ID0ge307XG5cbk9iamVjdC5rZXlzKFBST1BFUlRJRVMpLmZvckVhY2goKGspID0+IHtcbiAgcmVzdWx0W2tdID0gbnVsbDtcbn0pO1xuXG5jb25zdCBlbXB0eVJlc3VsdCA9IHJlc3VsdDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzc1Jlc29sdmVyIHtcbiAgY29uc3RydWN0KGFkYXB0ZXIpIHtcbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG5ldyBDYWNoZU1hbmFnZXIoYWRhcHRlcik7XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gY29kZS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZzLnJlYWRGaWxlKGZpbGUsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpY3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuXG4gICAgICAgIGlmICghZGljdFtjb2RlXSkge1xuICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEVycm9yKCdBZGRyZXNzIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWRkcmVzc2VzID0gZGljdFtjb2RlXTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShlbXB0eVJlc3VsdCk7XG5cbiAgICAgICAgYWRkcmVzc2VzLmZvckVhY2goKHZhbCwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IFBST1BFUlRJRVNbaV07XG5cbiAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBQUkVGRUNUVVJFX0RJQ1RbdmFsXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==