'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheableDictionaryLoader = exports.DictionaryLoader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var DictionaryLoader = exports.DictionaryLoader = function () {
  function DictionaryLoader() {
    _classCallCheck(this, DictionaryLoader);
  }

  _createClass(DictionaryLoader, [{
    key: 'loadFromPrefix',

    /**
     * Search the dictionary from the cache
     *
     * @param {string} prefix
     * @return Promise<Object>
     */
    value: function loadFromPrefix(prefix) {
      throw new Error('Please refer to the implementation to examine the cache.');
    }
  }]);

  return DictionaryLoader;
}();

var CacheableDictionaryLoader = exports.CacheableDictionaryLoader = function (_DictionaryLoader) {
  _inherits(CacheableDictionaryLoader, _DictionaryLoader);

  function CacheableDictionaryLoader(adapter) {
    _classCallCheck(this, CacheableDictionaryLoader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CacheableDictionaryLoader).call(this));

    _this.cacheManager = new _cache.CacheManager(adapter);
    return _this;
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */


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
        var dict = null;
        try {
          dict = JSON.parse(content);
        } catch (err) {
          return _bluebird.Promise.reject(err);
        }
        var returnValue = function returnValue() {
          return _bluebird.Promise.resolve(dict);
        };
        return _this3.cacheManager.store(prefix, dict).then(returnValue);
      });
    }
  }]);

  return CacheableDictionaryLoader;
}(DictionaryLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQU0sV0FBVyxrQkFBUSxTQUFSLENBQWtCLGFBQUcsUUFBSCxDQUE3Qjs7SUFFTzs7Ozs7Ozs7Ozs7Ozs7bUNBT0ksUUFBUTtBQUNyQixZQUFNLElBQUksS0FBSixDQUFVLDBEQUFWLENBQU4sQ0FEcUI7Ozs7U0FQWjs7O0lBWUE7OztBQUNYLFdBRFcseUJBQ1gsQ0FBWSxPQUFaLEVBQXFCOzBCQURWLDJCQUNVOzt1RUFEVix1Q0FDVTs7QUFFbkIsVUFBSyxZQUFMLEdBQW9CLHdCQUFpQixPQUFqQixDQUFwQixDQUZtQjs7R0FBckI7Ozs7Ozs7Ozs7ZUFEVzs7bUNBWUksUUFBUTs7O0FBQ3JCLGFBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBd0IsWUFBTTtBQUNuQyxlQUFPLE9BQUssOEJBQUwsQ0FBb0MsTUFBcEMsQ0FBUCxDQURtQztPQUFOLENBQXhCLENBRUosSUFGSSxDQUVDLFVBQUMsSUFBRCxFQUFVO0FBQ2hCLFlBQUksSUFBSixFQUFVO0FBQ1IsaUJBQU8sSUFBUCxDQURRO1NBQVY7QUFHQSxlQUFPLE9BQUssNkJBQUwsQ0FBbUMsTUFBbkMsQ0FBUCxDQUpnQjtPQUFWLENBRlIsQ0FEcUI7Ozs7bURBVVEsUUFBUTtBQUNyQyxhQUFPLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixNQUF2QixDQUFQLENBRHFDOzs7O2tEQUdULFFBQVE7OztBQUNwQyxVQUFNLE9BQU8sZUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixVQUFyQixFQUFpQyxTQUFTLE1BQVQsR0FBa0IsT0FBbEIsQ0FBeEMsQ0FEOEI7O0FBR3BDLGFBQU8sa0JBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBd0IsWUFBTTtBQUNuQyxlQUFPLFNBQVMsSUFBVCxDQUFQLENBRG1DO09BQU4sQ0FBeEIsQ0FFSixJQUZJLENBRUMsVUFBQyxPQUFELEVBQWE7QUFDbkIsWUFBSSxPQUFPLElBQVAsQ0FEZTtBQUVuQixZQUFJO0FBQ0YsaUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFQLENBREU7U0FBSixDQUVFLE9BQU8sR0FBUCxFQUFZO0FBQ1osaUJBQU8sa0JBQVEsTUFBUixDQUFlLEdBQWYsQ0FBUCxDQURZO1NBQVo7QUFHRixZQUFNLGNBQWMsU0FBZCxXQUFjO2lCQUFNLGtCQUFRLE9BQVIsQ0FBZ0IsSUFBaEI7U0FBTixDQVBEO0FBUW5CLGVBQU8sT0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQXdCLE1BQXhCLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDLENBQTJDLFdBQTNDLENBQVAsQ0FSbUI7T0FBYixDQUZSLENBSG9DOzs7O1NBekIzQjtFQUFrQyIsImZpbGUiOiJkaWN0aW9uYXJ5LWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBDYWNoZU1hbmFnZXIgfSBmcm9tICcuL2NhY2hlJztcblxuY29uc3QgcmVhZEZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSk7XG5cbmV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5TG9hZGVyIHtcbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgZGljdGlvbmFyeSBmcm9tIHRoZSBjYWNoZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XG4gICAqIEByZXR1cm4gUHJvbWlzZTxPYmplY3Q+XG4gICAqL1xuICBsb2FkRnJvbVByZWZpeChwcmVmaXgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSByZWZlciB0byB0aGUgaW1wbGVtZW50YXRpb24gdG8gZXhhbWluZSB0aGUgY2FjaGUuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhY2hlYWJsZURpY3Rpb25hcnlMb2FkZXIgZXh0ZW5kcyBEaWN0aW9uYXJ5TG9hZGVyIHtcbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmNhY2hlTWFuYWdlciA9IG5ldyBDYWNoZU1hbmFnZXIoYWRhcHRlcik7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIHRoZSBkaWN0aW9uYXJ5IGZyb20gdGhlIGNhY2hlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXhcbiAgICogQHJldHVybiBQcm9taXNlPE9iamVjdD5cbiAgICovXG4gIGxvYWRGcm9tUHJlZml4KHByZWZpeCkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQWRkcmVzc0RpY3Rpb25hcnlGcm9tQ2FjaGUocHJlZml4KTtcbiAgICB9KS50aGVuKChkaWN0KSA9PiB7XG4gICAgICBpZiAoZGljdCkge1xuICAgICAgICByZXR1cm4gZGljdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxvYWRBZGRyZXNzRGljdGlvbmFyeUZyb21GaWxlKHByZWZpeCk7XG4gICAgfSk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUNhY2hlKHByZWZpeCkge1xuICAgIHJldHVybiB0aGlzLmNhY2hlTWFuYWdlci5maW5kKHByZWZpeCk7XG4gIH1cbiAgbG9hZEFkZHJlc3NEaWN0aW9uYXJ5RnJvbUZpbGUocHJlZml4KSB7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvLi4vanNvbicsICd6aXAtJyArIHByZWZpeCArICcuanNvbicpO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYmluZCh0aGlzKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiByZWFkRmlsZShmaWxlKTtcbiAgICB9KS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICBsZXQgZGljdCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICBkaWN0ID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGRpY3QpO1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVNYW5hZ2VyLnN0b3JlKHByZWZpeCwgZGljdCkudGhlbihyZXR1cm5WYWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==