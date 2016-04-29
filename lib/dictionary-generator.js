'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _zipCodeJpStream = require('zip-code-jp-stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var writeFile = _bluebird.Promise.promisify(_fs2.default.writeFile);

var DictionaryGenerator = function () {
  function DictionaryGenerator(output) {
    _classCallCheck(this, DictionaryGenerator);

    this.output = output || 'output';
    this.addresses = new Map();
    this.logger = console;
  }

  _createClass(DictionaryGenerator, [{
    key: 'indexing',
    value: function indexing(record) {
      var prefix = record.zip_code.substr(0, 3);
      var area = /^以下に掲載がない場合/.test(record.area) ? '' : record.area;

      var data = {
        prefecture: record.prefecture,
        city: record.city,
        area: area
      };

      var prefixAddresses = this.addresses.get(prefix) || new Map();
      prefixAddresses.set(record.zip_code, data);
      this.addresses.set(prefix, prefixAddresses);
    }
  }, {
    key: 'generate',
    value: function generate() {
      var _this = this;

      var chain = _bluebird.Promise.resolve();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.addresses.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var prefix = _step$value[0];
          var values = _step$value[1];

          chain.then(this.outputDictionary(prefix, values));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      chain.then(function () {
        return _this.end();
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this2 = this;

      this.logger.info('generating dictionary');
      var stream = (0, _zipCodeJpStream.createFromZipFile)('ken_all.zip');
      stream.on('data', function (record) {
        return _this2.indexing(record);
      });
      stream.on('end', function () {
        return _this2.generate();
      });
    }
  }, {
    key: 'end',
    value: function end() {
      this.logger.info('dictionary is generated');
    }
  }, {
    key: 'outputDictionary',
    value: function outputDictionary(prefix, values) {
      var json = {};
      values.forEach(function (value, key) {
        return json[key] = value;
      });
      var content = JSON.stringify(json);

      return writeFile(this.output + '/zip-' + prefix + '.json', content);
    }
  }], [{
    key: 'from',
    value: function from(output) {
      return new DictionaryGenerator(output);
    }
  }]);

  return DictionaryGenerator;
}();

exports.default = DictionaryGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxZQUFZLGtCQUFRLFNBQVIsQ0FBa0IsYUFBRyxTQUFyQixDQUFsQjs7SUFFcUIsbUI7QUFDbkIsV0FEbUIsbUJBQ25CLENBQVksTUFBWixFQUFvQjtBQUFBLDBCQURELG1CQUNDOztBQUNsQixTQUFLLE1BQUwsR0FBYyxVQUFVLFFBQXhCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLElBQUksR0FBSixFQUFqQjtBQUNBLFNBQUssTUFBTCxHQUFjLE9BQWQ7QUFDRDs7ZUFMa0IsbUI7OzZCQU1WLE0sRUFBUTtBQUNmLFVBQU0sU0FBUyxPQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBZjtBQUNBLFVBQU0sT0FBUSxjQUFjLElBQWQsQ0FBbUIsT0FBTyxJQUExQixDQUFELEdBQW9DLEVBQXBDLEdBQXlDLE9BQU8sSUFBN0Q7O0FBRUEsVUFBTSxPQUFPO0FBQ1gsb0JBQVksT0FBTyxVQURSO0FBRVgsY0FBTSxPQUFPLElBRkY7QUFHWCxjQUFNO0FBSEssT0FBYjs7QUFNQSxVQUFNLGtCQUFrQixLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLE1BQW5CLEtBQThCLElBQUksR0FBSixFQUF0RDtBQUNBLHNCQUFnQixHQUFoQixDQUFvQixPQUFPLFFBQTNCLEVBQXFDLElBQXJDO0FBQ0EsV0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixNQUFuQixFQUEyQixlQUEzQjtBQUNEOzs7K0JBQ1U7QUFBQTs7QUFDVCxVQUFJLFFBQVEsa0JBQVEsT0FBUixFQUFaO0FBRFM7QUFBQTtBQUFBOztBQUFBO0FBRVQsNkJBQStCLEtBQUssU0FBTCxDQUFlLE9BQWYsRUFBL0IsOEhBQXlEO0FBQUE7O0FBQUEsY0FBOUMsTUFBOEM7QUFBQSxjQUF0QyxNQUFzQzs7QUFDdkQsZ0JBQU0sSUFBTixDQUFXLEtBQUssZ0JBQUwsQ0FBc0IsTUFBdEIsRUFBOEIsTUFBOUIsQ0FBWDtBQUNEO0FBSlE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLVCxZQUFNLElBQU4sQ0FBVztBQUFBLGVBQU0sTUFBSyxHQUFMLEVBQU47QUFBQSxPQUFYO0FBQ0Q7OzswQkFDSztBQUFBOztBQUNKLFdBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsdUJBQWpCO0FBQ0EsVUFBTSxTQUFTLHdDQUFrQixhQUFsQixDQUFmO0FBQ0EsYUFBTyxFQUFQLENBQVUsTUFBVixFQUFrQixVQUFDLE1BQUQ7QUFBQSxlQUFZLE9BQUssUUFBTCxDQUFjLE1BQWQsQ0FBWjtBQUFBLE9BQWxCO0FBQ0EsYUFBTyxFQUFQLENBQVUsS0FBVixFQUFpQjtBQUFBLGVBQU0sT0FBSyxRQUFMLEVBQU47QUFBQSxPQUFqQjtBQUNEOzs7MEJBQ0s7QUFDSixXQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLHlCQUFqQjtBQUNEOzs7cUNBQ2dCLE0sRUFBUSxNLEVBQVE7QUFDL0IsVUFBTSxPQUFPLEVBQWI7QUFDQSxhQUFPLE9BQVAsQ0FBZSxVQUFDLEtBQUQsRUFBUSxHQUFSO0FBQUEsZUFBZ0IsS0FBSyxHQUFMLElBQVksS0FBNUI7QUFBQSxPQUFmO0FBQ0EsVUFBTSxVQUFVLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBaEI7O0FBRUEsYUFBTyxVQUFVLEtBQUssTUFBTCxHQUFjLE9BQWQsR0FBd0IsTUFBeEIsR0FBaUMsT0FBM0MsRUFBb0QsT0FBcEQsQ0FBUDtBQUNEOzs7eUJBQ1csTSxFQUFRO0FBQ2xCLGFBQU8sSUFBSSxtQkFBSixDQUF3QixNQUF4QixDQUFQO0FBQ0Q7OztTQTdDa0IsbUI7OztrQkFBQSxtQiIsImZpbGUiOiJkaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgY3JlYXRlRnJvbVppcEZpbGUgfSBmcm9tICd6aXAtY29kZS1qcC1zdHJlYW0nO1xuXG5jb25zdCB3cml0ZUZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy53cml0ZUZpbGUpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWN0aW9uYXJ5R2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3Iob3V0cHV0KSB7XG4gICAgdGhpcy5vdXRwdXQgPSBvdXRwdXQgfHwgJ291dHB1dCc7XG4gICAgdGhpcy5hZGRyZXNzZXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5sb2dnZXIgPSBjb25zb2xlO1xuICB9XG4gIGluZGV4aW5nKHJlY29yZCkge1xuICAgIGNvbnN0IHByZWZpeCA9IHJlY29yZC56aXBfY29kZS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3QgYXJlYSA9ICgvXuS7peS4i+OBq+aOsui8ieOBjOOBquOBhOWgtOWQiC8udGVzdChyZWNvcmQuYXJlYSkpID8gJycgOiByZWNvcmQuYXJlYTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBwcmVmZWN0dXJlOiByZWNvcmQucHJlZmVjdHVyZSxcbiAgICAgIGNpdHk6IHJlY29yZC5jaXR5LFxuICAgICAgYXJlYTogYXJlYSxcbiAgICB9O1xuXG4gICAgY29uc3QgcHJlZml4QWRkcmVzc2VzID0gdGhpcy5hZGRyZXNzZXMuZ2V0KHByZWZpeCkgfHwgbmV3IE1hcCgpO1xuICAgIHByZWZpeEFkZHJlc3Nlcy5zZXQocmVjb3JkLnppcF9jb2RlLCBkYXRhKTtcbiAgICB0aGlzLmFkZHJlc3Nlcy5zZXQocHJlZml4LCBwcmVmaXhBZGRyZXNzZXMpO1xuICB9XG4gIGdlbmVyYXRlKCkge1xuICAgIGxldCBjaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGZvciAobGV0IFsgcHJlZml4LCB2YWx1ZXMgXSBvZiB0aGlzLmFkZHJlc3Nlcy5lbnRyaWVzKCkpIHtcbiAgICAgIGNoYWluLnRoZW4odGhpcy5vdXRwdXREaWN0aW9uYXJ5KHByZWZpeCwgdmFsdWVzKSk7XG4gICAgfVxuICAgIGNoYWluLnRoZW4oKCkgPT4gdGhpcy5lbmQoKSk7XG4gIH1cbiAgcnVuKCkge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ2dlbmVyYXRpbmcgZGljdGlvbmFyeScpO1xuICAgIGNvbnN0IHN0cmVhbSA9IGNyZWF0ZUZyb21aaXBGaWxlKCdrZW5fYWxsLnppcCcpO1xuICAgIHN0cmVhbS5vbignZGF0YScsIChyZWNvcmQpID0+IHRoaXMuaW5kZXhpbmcocmVjb3JkKSk7XG4gICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiB0aGlzLmdlbmVyYXRlKCkpO1xuICB9XG4gIGVuZCgpIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdkaWN0aW9uYXJ5IGlzIGdlbmVyYXRlZCcpO1xuICB9XG4gIG91dHB1dERpY3Rpb25hcnkocHJlZml4LCB2YWx1ZXMpIHtcbiAgICBjb25zdCBqc29uID0ge307XG4gICAgdmFsdWVzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IGpzb25ba2V5XSA9IHZhbHVlKTtcbiAgICBjb25zdCBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG5cbiAgICByZXR1cm4gd3JpdGVGaWxlKHRoaXMub3V0cHV0ICsgJy96aXAtJyArIHByZWZpeCArICcuanNvbicsIGNvbnRlbnQpO1xuICB9XG4gIHN0YXRpYyBmcm9tKG91dHB1dCkge1xuICAgIHJldHVybiBuZXcgRGljdGlvbmFyeUdlbmVyYXRvcihvdXRwdXQpO1xuICB9XG59XG4iXX0=