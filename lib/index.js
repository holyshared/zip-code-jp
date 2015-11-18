'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManager = exports.FileCacheAdapter = exports.CacheAdapter = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
          var addresses = dict[code];

          var result = {};

          addresses.forEach(function (val, i) {
            var key = properties[i];

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
//# sourceMappingURL=data:application/json;base64,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QUMsQ0FBQzthQUNwQyxNQUFNO0FBQ0wsb0JBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDbkI7V0FDRixDQUFDLENBQUM7QUFDSCxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztPQUNKLENBQUMsQ0FBQztLQUNKOzs7U0EvQmtCLGVBQWU7OztrQkFBZixlQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGNsYXNzIENhY2hlQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWxlQ2FjaGVBZGFwdGVyIGV4dGVuZHMgQ2FjaGVBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHRoaXMuYWRhcHRlciA9IGFkYXB0ZXI7XG4gIH1cbn1cblxuY29uc3QgUFJFRkVDVFVSRV9ESUNUID0gW1xuICBudWxsLCAgICAgICAn5YyX5rW36YGTJywgICAn6Z2S5qOu55yMJywgICAn5bKp5omL55yMJywgICAn5a6u5Z+O55yMJyxcbiAgJ+eni+eUsOecjCcsICAgJ+WxseW9ouecjCcsICAgJ+emj+WztuecjCcsICAgJ+iMqOWfjuecjCcsICAgJ+agg+acqOecjCcsXG4gICfnvqTppqznnIwnLCAgICfln7znjonnnIwnLCAgICfljYPokYnnnIwnLCAgICfmnbHkuqzpg70nLCAgICfnpZ7lpYjlt53nnIwnLFxuICAn5paw5r2f55yMJywgICAn5a+M5bGx55yMJywgICAn55+z5bed55yMJywgICAn56aP5LqV55yMJywgICAn5bGx5qKo55yMJyxcbiAgJ+mVt+mHjuecjCcsICAgJ+WykOmYnOecjCcsICAgJ+mdmeWyoeecjCcsICAgJ+aEm+efpeecjCcsICAgJ+S4iemHjeecjCcsXG4gICfmu4vos4DnnIwnLCAgICfkuqzpg73lupwnLCAgICflpKfpmKrlupwnLCAgICflhbXluqvnnIwnLCAgICflpYjoia/nnIwnLFxuICAn5ZKM5q2M5bGx55yMJywgJ+mzpeWPluecjCcsICAgJ+WztuagueecjCcsICAgJ+WyoeWxseecjCcsICAgJ+W6g+WztuecjCcsXG4gICflsbHlj6PnnIwnLCAgICflvrPls7bnnIwnLCAgICfpppnlt53nnIwnLCAgICfmhJvlqpvnnIwnLCAgICfpq5jnn6XnnIwnLFxuICAn56aP5bKh55yMJywgICAn5L2Q6LOA55yMJywgICAn6ZW35bSO55yMJywgICAn54aK5pys55yMJywgICAn5aSn5YiG55yMJyxcbiAgJ+WuruW0juecjCcsICAgJ+m5v+WFkOWztuecjCcsICfmspbnuITnnIwnXG5dO1xuXG5jb25zdCBQUk9QRVJUSUVTID0ge1xuICAwOiAncHJlZmVjdHVyZScsXG4gIDE6ICdjaXR5JyxcbiAgMjogJ2FyZWEnLFxuICAzOiAnc3RyZWV0J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzc1Jlc29sdmVyIHtcbiAgY29uc3RydWN0KGFkYXB0ZXIpIHtcbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG5ldyBDYWNoZU1hbmFnZXIoYWRhcHRlcik7XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gICAgY29uc3QgcHJlZml4ID0gY29kZS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZzLnJlYWRGaWxlKGZpbGUsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpY3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICBjb25zdCBhZGRyZXNzZXMgPSBkaWN0W2NvZGVdO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcblxuICAgICAgICBhZGRyZXNzZXMuZm9yRWFjaCgodmFsLCBpKSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gcHJvcGVydGllc1tpXTtcblxuICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IFBSRUZFQ1RVUkVfRElDVFt2YWxdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19