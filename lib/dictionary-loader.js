'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheableDictionaryLoader = exports.DictionaryLoader = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

var DictionaryLoader = exports.DictionaryLoader = (function () {
  function DictionaryLoader() {
    _classCallCheck(this, DictionaryLoader);
  }

  _createClass(DictionaryLoader, [{
    key: 'loadFromPrefix',
    value: function loadFromPrefix(prefix) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }
  }]);

  return DictionaryLoader;
})();

var CacheableDictionaryLoader = exports.CacheableDictionaryLoader = (function (_DictionaryLoader) {
  _inherits(CacheableDictionaryLoader, _DictionaryLoader);

  function CacheableDictionaryLoader(adapter) {
    _classCallCheck(this, CacheableDictionaryLoader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CacheableDictionaryLoader).call(this));

    _this.cacheManager = new _cache.CacheManager(adapter);
    return _this;
  }

  _createClass(CacheableDictionaryLoader, [{
    key: 'loadFromPrefix',
    value: function loadFromPrefix(prefix) {
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
  }]);

  return CacheableDictionaryLoader;
})(DictionaryLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQU0sUUFBUSxHQUFHLFVBSFIsT0FBTyxDQUdTLFNBQVMsQ0FBQyxhQUFHLFFBQVEsQ0FBQyxDQUFDOztJQUVuQyxnQkFBZ0IsV0FBaEIsZ0JBQWdCO1dBQWhCLGdCQUFnQjswQkFBaEIsZ0JBQWdCOzs7ZUFBaEIsZ0JBQWdCOzttQ0FDWixNQUFNLEVBQUU7QUFDckIsWUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0tBQzdFOzs7U0FIVSxnQkFBZ0I7OztJQU1oQix5QkFBeUIsV0FBekIseUJBQXlCO1lBQXpCLHlCQUF5Qjs7QUFDcEMsV0FEVyx5QkFBeUIsQ0FDeEIsT0FBTyxFQUFFOzBCQURWLHlCQUF5Qjs7dUVBQXpCLHlCQUF5Qjs7QUFHbEMsVUFBSyxZQUFZLEdBQUcsV0FiZixZQUFZLENBYW9CLE9BQU8sQ0FBQyxDQUFDOztHQUMvQzs7ZUFKVSx5QkFBeUI7O21DQUtyQixNQUFNLEVBQUU7OztBQUNyQixhQUFPLFVBakJGLE9BQU8sQ0FpQkcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ25DLGVBQU8sT0FBSyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2hCLFlBQUksSUFBSSxFQUFFO0FBQ1IsaUJBQU8sSUFBSSxDQUFDO1NBQ2I7QUFDRCxlQUFPLE9BQUssNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDbkQsQ0FBQyxDQUFDO0tBQ0o7OzttREFDOEIsTUFBTSxFQUFFO0FBQ3JDLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdkM7OztrREFDNkIsTUFBTSxFQUFFOzs7QUFDcEMsVUFBTSxJQUFJLEdBQUcsZUFBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDOztBQUV6RSxhQUFPLFVBaENGLE9BQU8sQ0FnQ0csSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ25DLGVBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDbkIsWUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQyxlQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLGVBQU8sSUFBSSxDQUFDO09BQ2IsQ0FBQyxDQUFDO0tBQ0o7OztTQTVCVSx5QkFBeUI7R0FBUyxnQkFBZ0IiLCJmaWxlIjoiZGljdGlvbmFyeS1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyIH0gZnJvbSAnLi9jYWNoZSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpO1xuXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeUxvYWRlciB7XG4gIGxvYWRGcm9tUHJlZml4KHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHJlZmVyIHRvIHRoZSBpbXBsZW1lbnRhdGlvbiB0byBleGFtaW5lIHRoZSBjYWNoZS4nKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FjaGVhYmxlRGljdGlvbmFyeUxvYWRlciBleHRlbmRzIERpY3Rpb25hcnlMb2FkZXIge1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbmV3IENhY2hlTWFuYWdlcihhZGFwdGVyKTtcbiAgfVxuICBsb2FkRnJvbVByZWZpeChwcmVmaXgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5iaW5kKHRoaXMpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCk7XG4gICAgfSkudGhlbigoZGljdCkgPT4ge1xuICAgICAgaWYgKGRpY3QpIHtcbiAgICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tRmlsZShwcmVmaXgpO1xuICAgIH0pO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21DYWNoZShwcmVmaXgpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZU1hbmFnZXIuZmluZChwcmVmaXgpO1xuICB9XG4gIGxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCkge1xuICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLy4uL2pzb24nLCAnemlwLScgKyBwcmVmaXggKyAnLmpzb24nKTtcblxuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gcmVhZEZpbGUoZmlsZSk7XG4gICAgfSkudGhlbigoY29udGVudCkgPT4ge1xuICAgICAgY29uc3QgZGljdCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICB0aGlzLmNhY2hlTWFuYWdlci5zdG9yZShwcmVmaXgsIGRpY3QpO1xuICAgICAgcmV0dXJuIGRpY3Q7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==