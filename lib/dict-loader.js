'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DictionaryLoader = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _cache = require('./cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var readFile = _bluebird.Promise.promisify(_fs2.default.readFile);

var DictionaryLoader = exports.DictionaryLoader = (function () {
  function DictionaryLoader(adapter) {
    _classCallCheck(this, DictionaryLoader);

    this.cacheManager = new _cache.CacheManager(adapter);
  }

  _createClass(DictionaryLoader, [{
    key: 'loadFromCode',
    value: function loadFromCode(prefix) {
      var _this = this;

      return _bluebird.Promise.bind(this).then(function () {
        return _this.loadAddressDictionaryFromCache(prefix);
      }).then(function (dict) {
        if (dict) {
          return dict;
        }
        return _this.loadAddressDictionaryFromFile(prefix);
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
      var _this2 = this;

      var file = _path2.default.join(__dirname, '/../json', 'zip-' + prefix + '.json');

      return _bluebird.Promise.bind(this).then(function () {
        return readFile(file);
      }).then(function (content) {
        var dict = JSON.parse(content);
        _this2.cacheManager.store(prefix, dict);
        return dict;
      });
    }
  }]);

  return DictionaryLoader;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBTSxRQUFRLEdBQUcsVUFIUixPQUFPLENBR1MsU0FBUyxDQUFDLGFBQUcsUUFBUSxDQUFDLENBQUM7O0lBRW5DLGdCQUFnQixXQUFoQixnQkFBZ0I7QUFDM0IsV0FEVyxnQkFBZ0IsQ0FDZixPQUFPLEVBQUU7MEJBRFYsZ0JBQWdCOztBQUV6QixRQUFJLENBQUMsWUFBWSxHQUFHLFdBTmYsWUFBWSxDQU1vQixPQUFPLENBQUMsQ0FBQztHQUMvQzs7ZUFIVSxnQkFBZ0I7O2lDQUlkLE1BQU0sRUFBRTs7O0FBQ25CLGFBQU8sVUFWRixPQUFPLENBVUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ25DLGVBQU8sTUFBSyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFLO0FBQ2hCLFlBQUksSUFBSSxFQUFFO0FBQ1IsaUJBQU8sSUFBSSxDQUFDO1NBQ2I7QUFDRCxlQUFPLE1BQUssNkJBQTZCLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDbkQsQ0FBQyxDQUFDO0tBQ0o7OzttREFDOEIsTUFBTSxFQUFFO0FBQ3JDLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdkM7OztrREFDNkIsTUFBTSxFQUFFOzs7QUFDcEMsVUFBTSxJQUFJLEdBQUcsZUFBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDOztBQUV6RSxhQUFPLFVBekJGLE9BQU8sQ0F5QkcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ25DLGVBQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPLEVBQUs7QUFDbkIsWUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQyxlQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLGVBQU8sSUFBSSxDQUFDO09BQ2IsQ0FBQyxDQUFDO0tBQ0o7OztTQTNCVSxnQkFBZ0IiLCJmaWxlIjoiZGljdC1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgQ2FjaGVNYW5hZ2VyIH0gZnJvbSAnLi9jYWNoZSc7XG5cbmNvbnN0IHJlYWRGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpO1xuXG5leHBvcnQgY2xhc3MgRGljdGlvbmFyeUxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG5ldyBDYWNoZU1hbmFnZXIoYWRhcHRlcik7XG4gIH1cbiAgbG9hZEZyb21Db2RlKHByZWZpeCkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tQ2FjaGUocHJlZml4KTtcbiAgICB9KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoZGljdCkge1xuICAgICAgICByZXR1cm4gZGljdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCk7XG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlTWFuYWdlci5maW5kKHByZWZpeCk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUZpbGUocHJlZml4KSB7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiByZWFkRmlsZShmaWxlKTtcbiAgICB9KS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICBjb25zdCBkaWN0ID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgIHRoaXMuY2FjaGVNYW5hZ2VyLnN0b3JlKHByZWZpeCwgZGljdCk7XG4gICAgICByZXR1cm4gZGljdDtcbiAgICB9KTtcbiAgfVxufVxuIl19