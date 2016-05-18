'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _zipCodeJpStream = require('zip-code-jp-stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const writeFile = _bluebird.Promise.promisify(_fs2.default.writeFile);

class DictionaryGenerator {
  constructor(output) {
    this.output = output || 'output';
    this.addresses = new Map();
    this.logger = console;
  }
  indexing(record) {
    const prefix = record.zip_code.substr(0, 3);
    const area = /^以下に掲載がない場合/.test(record.area) ? '' : record.area;

    const data = {
      prefecture: record.prefecture,
      city: record.city,
      area: area
    };

    const prefixAddresses = this.addresses.get(prefix) || new Map();
    prefixAddresses.set(record.zip_code, data);
    this.addresses.set(prefix, prefixAddresses);
  }
  generate() {
    let chain = _bluebird.Promise.resolve();
    for (let _ref of this.addresses.entries()) {
      var _ref2 = _slicedToArray(_ref, 2);

      let prefix = _ref2[0];
      let values = _ref2[1];

      chain.then(this.outputDictionary(prefix, values));
    }
    chain.then(() => this.end());
  }
  run() {
    this.logger.info('generating dictionary');
    const stream = (0, _zipCodeJpStream.createFromZipFile)('ken_all.zip');
    stream.on('data', record => this.indexing(record));
    stream.on('end', () => this.generate());
  }
  end() {
    this.logger.info('dictionary is generated');
  }
  outputDictionary(prefix, values) {
    const json = {};
    values.forEach((value, key) => json[key] = value);
    const content = JSON.stringify(json);

    return writeFile(this.output + '/zip-' + prefix + '.json', content);
  }
  static from(output) {
    return new DictionaryGenerator(output);
  }
}
exports.default = DictionaryGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLFlBQVksa0JBQVEsU0FBUixDQUFrQixhQUFHLFNBQUgsQ0FBOUI7O0FBRVMsTUFBTSxtQkFBTixDQUEwQjtBQUN2QyxjQUFZLE1BQVosRUFBb0I7QUFDbEIsU0FBSyxNQUFMLEdBQWMsVUFBVSxRQUFWLENBREk7QUFFbEIsU0FBSyxTQUFMLEdBQWlCLElBQUksR0FBSixFQUFqQixDQUZrQjtBQUdsQixTQUFLLE1BQUwsR0FBYyxPQUFkLENBSGtCO0dBQXBCO0FBS0EsV0FBUyxNQUFULEVBQWlCO0FBQ2YsVUFBTSxTQUFTLE9BQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixDQUF2QixFQUEwQixDQUExQixDQUFULENBRFM7QUFFZixVQUFNLE9BQU8sYUFBQyxDQUFjLElBQWQsQ0FBbUIsT0FBTyxJQUFQLENBQXBCLEdBQW9DLEVBQXBDLEdBQXlDLE9BQU8sSUFBUCxDQUZ2Qzs7QUFJZixVQUFNLE9BQU87QUFDWCxrQkFBWSxPQUFPLFVBQVA7QUFDWixZQUFNLE9BQU8sSUFBUDtBQUNOLFlBQU0sSUFBTjtLQUhJLENBSlM7O0FBVWYsVUFBTSxrQkFBa0IsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixNQUFuQixLQUE4QixJQUFJLEdBQUosRUFBOUIsQ0FWVDtBQVdmLG9CQUFnQixHQUFoQixDQUFvQixPQUFPLFFBQVAsRUFBaUIsSUFBckMsRUFYZTtBQVlmLFNBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsTUFBbkIsRUFBMkIsZUFBM0IsRUFaZTtHQUFqQjtBQWNBLGFBQVc7QUFDVCxRQUFJLFFBQVEsa0JBQVEsT0FBUixFQUFSLENBREs7QUFFVCxxQkFBK0IsS0FBSyxTQUFMLENBQWUsT0FBZixFQUEvQixFQUF5RDs7O1VBQTlDLGtCQUE4QztVQUF0QyxrQkFBc0M7O0FBQ3ZELFlBQU0sSUFBTixDQUFXLEtBQUssZ0JBQUwsQ0FBc0IsTUFBdEIsRUFBOEIsTUFBOUIsQ0FBWCxFQUR1RDtLQUF6RDtBQUdBLFVBQU0sSUFBTixDQUFXLE1BQU0sS0FBSyxHQUFMLEVBQU4sQ0FBWCxDQUxTO0dBQVg7QUFPQSxRQUFNO0FBQ0osU0FBSyxNQUFMLENBQVksSUFBWixDQUFpQix1QkFBakIsRUFESTtBQUVKLFVBQU0sU0FBUyx3Q0FBa0IsYUFBbEIsQ0FBVCxDQUZGO0FBR0osV0FBTyxFQUFQLENBQVUsTUFBVixFQUFrQixVQUFZLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBWixDQUFsQixDQUhJO0FBSUosV0FBTyxFQUFQLENBQVUsS0FBVixFQUFpQixNQUFNLEtBQUssUUFBTCxFQUFOLENBQWpCLENBSkk7R0FBTjtBQU1BLFFBQU07QUFDSixTQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLHlCQUFqQixFQURJO0dBQU47QUFHQSxtQkFBaUIsTUFBakIsRUFBeUIsTUFBekIsRUFBaUM7QUFDL0IsVUFBTSxPQUFPLEVBQVAsQ0FEeUI7QUFFL0IsV0FBTyxPQUFQLENBQWUsQ0FBQyxLQUFELEVBQVEsR0FBUixLQUFnQixLQUFLLEdBQUwsSUFBWSxLQUFaLENBQS9CLENBRitCO0FBRy9CLFVBQU0sVUFBVSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVYsQ0FIeUI7O0FBSy9CLFdBQU8sVUFBVSxLQUFLLE1BQUwsR0FBYyxPQUFkLEdBQXdCLE1BQXhCLEdBQWlDLE9BQWpDLEVBQTBDLE9BQXBELENBQVAsQ0FMK0I7R0FBakM7QUFPQSxTQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CO0FBQ2xCLFdBQU8sSUFBSSxtQkFBSixDQUF3QixNQUF4QixDQUFQLENBRGtCO0dBQXBCO0NBM0NhO2tCQUFNIiwiZmlsZSI6ImRpY3Rpb25hcnktZ2VuZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBjcmVhdGVGcm9tWmlwRmlsZSB9IGZyb20gJ3ppcC1jb2RlLWpwLXN0cmVhbSc7XG5cbmNvbnN0IHdyaXRlRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLndyaXRlRmlsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihvdXRwdXQpIHtcbiAgICB0aGlzLm91dHB1dCA9IG91dHB1dCB8fCAnb3V0cHV0JztcbiAgICB0aGlzLmFkZHJlc3NlcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmxvZ2dlciA9IGNvbnNvbGU7XG4gIH1cbiAgaW5kZXhpbmcocmVjb3JkKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcmVjb3JkLnppcF9jb2RlLnN1YnN0cigwLCAzKTtcbiAgICBjb25zdCBhcmVhID0gKC9e5Lul5LiL44Gr5o6y6LyJ44GM44Gq44GE5aC05ZCILy50ZXN0KHJlY29yZC5hcmVhKSkgPyAnJyA6IHJlY29yZC5hcmVhO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHByZWZlY3R1cmU6IHJlY29yZC5wcmVmZWN0dXJlLFxuICAgICAgY2l0eTogcmVjb3JkLmNpdHksXG4gICAgICBhcmVhOiBhcmVhLFxuICAgIH07XG5cbiAgICBjb25zdCBwcmVmaXhBZGRyZXNzZXMgPSB0aGlzLmFkZHJlc3Nlcy5nZXQocHJlZml4KSB8fCBuZXcgTWFwKCk7XG4gICAgcHJlZml4QWRkcmVzc2VzLnNldChyZWNvcmQuemlwX2NvZGUsIGRhdGEpO1xuICAgIHRoaXMuYWRkcmVzc2VzLnNldChwcmVmaXgsIHByZWZpeEFkZHJlc3Nlcyk7XG4gIH1cbiAgZ2VuZXJhdGUoKSB7XG4gICAgbGV0IGNoYWluID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgZm9yIChsZXQgWyBwcmVmaXgsIHZhbHVlcyBdIG9mIHRoaXMuYWRkcmVzc2VzLmVudHJpZXMoKSkge1xuICAgICAgY2hhaW4udGhlbih0aGlzLm91dHB1dERpY3Rpb25hcnkocHJlZml4LCB2YWx1ZXMpKTtcbiAgICB9XG4gICAgY2hhaW4udGhlbigoKSA9PiB0aGlzLmVuZCgpKTtcbiAgfVxuICBydW4oKSB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnZ2VuZXJhdGluZyBkaWN0aW9uYXJ5Jyk7XG4gICAgY29uc3Qgc3RyZWFtID0gY3JlYXRlRnJvbVppcEZpbGUoJ2tlbl9hbGwuemlwJyk7XG4gICAgc3RyZWFtLm9uKCdkYXRhJywgKHJlY29yZCkgPT4gdGhpcy5pbmRleGluZyhyZWNvcmQpKTtcbiAgICBzdHJlYW0ub24oJ2VuZCcsICgpID0+IHRoaXMuZ2VuZXJhdGUoKSk7XG4gIH1cbiAgZW5kKCkge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ2RpY3Rpb25hcnkgaXMgZ2VuZXJhdGVkJyk7XG4gIH1cbiAgb3V0cHV0RGljdGlvbmFyeShwcmVmaXgsIHZhbHVlcykge1xuICAgIGNvbnN0IGpzb24gPSB7fTtcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ganNvbltrZXldID0gdmFsdWUpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICAgIHJldHVybiB3cml0ZUZpbGUodGhpcy5vdXRwdXQgKyAnL3ppcC0nICsgcHJlZml4ICsgJy5qc29uJywgY29udGVudCk7XG4gIH1cbiAgc3RhdGljIGZyb20ob3V0cHV0KSB7XG4gICAgcmV0dXJuIG5ldyBEaWN0aW9uYXJ5R2VuZXJhdG9yKG91dHB1dCk7XG4gIH1cbn1cbiJdfQ==