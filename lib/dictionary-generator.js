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

    const group = this.addresses.get(prefix) || new Map();
    const addresses = group.get(record.zip_code) || [];
    addresses.push(data);

    group.set(record.zip_code, addresses);
    this.addresses.set(prefix, group);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLFlBQVksa0JBQVEsU0FBUixDQUFrQixhQUFHLFNBQUgsQ0FBOUI7O0FBRVMsTUFBTSxtQkFBTixDQUEwQjtBQUN2QyxjQUFZLE1BQVosRUFBb0I7QUFDbEIsU0FBSyxNQUFMLEdBQWMsVUFBVSxRQUFWLENBREk7QUFFbEIsU0FBSyxTQUFMLEdBQWlCLElBQUksR0FBSixFQUFqQixDQUZrQjtBQUdsQixTQUFLLE1BQUwsR0FBYyxPQUFkLENBSGtCO0dBQXBCO0FBS0EsV0FBUyxNQUFULEVBQWlCO0FBQ2YsVUFBTSxTQUFTLE9BQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixDQUF2QixFQUEwQixDQUExQixDQUFULENBRFM7QUFFZixVQUFNLE9BQU8sYUFBQyxDQUFjLElBQWQsQ0FBbUIsT0FBTyxJQUFQLENBQXBCLEdBQW9DLEVBQXBDLEdBQXlDLE9BQU8sSUFBUCxDQUZ2Qzs7QUFJZixVQUFNLE9BQU87QUFDWCxrQkFBWSxPQUFPLFVBQVA7QUFDWixZQUFNLE9BQU8sSUFBUDtBQUNOLFlBQU0sSUFBTjtLQUhJLENBSlM7O0FBVWYsVUFBTSxRQUFRLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsTUFBbkIsS0FBOEIsSUFBSSxHQUFKLEVBQTlCLENBVkM7QUFXZixVQUFNLFlBQVksTUFBTSxHQUFOLENBQVUsT0FBTyxRQUFQLENBQVYsSUFBOEIsRUFBOUIsQ0FYSDtBQVlmLGNBQVUsSUFBVixDQUFlLElBQWYsRUFaZTs7QUFjZixVQUFNLEdBQU4sQ0FBVSxPQUFPLFFBQVAsRUFBaUIsU0FBM0IsRUFkZTtBQWVmLFNBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsTUFBbkIsRUFBMkIsS0FBM0IsRUFmZTtHQUFqQjtBQWlCQSxhQUFXO0FBQ1QsUUFBSSxRQUFRLGtCQUFRLE9BQVIsRUFBUixDQURLO0FBRVQscUJBQStCLEtBQUssU0FBTCxDQUFlLE9BQWYsRUFBL0IsRUFBeUQ7OztVQUE5QyxrQkFBOEM7VUFBdEMsa0JBQXNDOztBQUN2RCxZQUFNLElBQU4sQ0FBVyxLQUFLLGdCQUFMLENBQXNCLE1BQXRCLEVBQThCLE1BQTlCLENBQVgsRUFEdUQ7S0FBekQ7QUFHQSxVQUFNLElBQU4sQ0FBVyxNQUFNLEtBQUssR0FBTCxFQUFOLENBQVgsQ0FMUztHQUFYO0FBT0EsUUFBTTtBQUNKLFNBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsdUJBQWpCLEVBREk7QUFFSixVQUFNLFNBQVMsd0NBQWtCLGFBQWxCLENBQVQsQ0FGRjtBQUdKLFdBQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBWSxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQVosQ0FBbEIsQ0FISTtBQUlKLFdBQU8sRUFBUCxDQUFVLEtBQVYsRUFBaUIsTUFBTSxLQUFLLFFBQUwsRUFBTixDQUFqQixDQUpJO0dBQU47QUFNQSxRQUFNO0FBQ0osU0FBSyxNQUFMLENBQVksSUFBWixDQUFpQix5QkFBakIsRUFESTtHQUFOO0FBR0EsbUJBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQy9CLFVBQU0sT0FBTyxFQUFQLENBRHlCO0FBRS9CLFdBQU8sT0FBUCxDQUFlLENBQUMsS0FBRCxFQUFRLEdBQVIsS0FBZ0IsS0FBSyxHQUFMLElBQVksS0FBWixDQUEvQixDQUYrQjtBQUcvQixVQUFNLFVBQVUsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFWLENBSHlCOztBQUsvQixXQUFPLFVBQVUsS0FBSyxNQUFMLEdBQWMsT0FBZCxHQUF3QixNQUF4QixHQUFpQyxPQUFqQyxFQUEwQyxPQUFwRCxDQUFQLENBTCtCO0dBQWpDO0FBT0EsU0FBTyxJQUFQLENBQVksTUFBWixFQUFvQjtBQUNsQixXQUFPLElBQUksbUJBQUosQ0FBd0IsTUFBeEIsQ0FBUCxDQURrQjtHQUFwQjtDQTlDYTtrQkFBTSIsImZpbGUiOiJkaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgY3JlYXRlRnJvbVppcEZpbGUgfSBmcm9tICd6aXAtY29kZS1qcC1zdHJlYW0nO1xuXG5jb25zdCB3cml0ZUZpbGUgPSBQcm9taXNlLnByb21pc2lmeShmcy53cml0ZUZpbGUpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWN0aW9uYXJ5R2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3Iob3V0cHV0KSB7XG4gICAgdGhpcy5vdXRwdXQgPSBvdXRwdXQgfHwgJ291dHB1dCc7XG4gICAgdGhpcy5hZGRyZXNzZXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5sb2dnZXIgPSBjb25zb2xlO1xuICB9XG4gIGluZGV4aW5nKHJlY29yZCkge1xuICAgIGNvbnN0IHByZWZpeCA9IHJlY29yZC56aXBfY29kZS5zdWJzdHIoMCwgMyk7XG4gICAgY29uc3QgYXJlYSA9ICgvXuS7peS4i+OBq+aOsui8ieOBjOOBquOBhOWgtOWQiC8udGVzdChyZWNvcmQuYXJlYSkpID8gJycgOiByZWNvcmQuYXJlYTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBwcmVmZWN0dXJlOiByZWNvcmQucHJlZmVjdHVyZSxcbiAgICAgIGNpdHk6IHJlY29yZC5jaXR5LFxuICAgICAgYXJlYTogYXJlYSxcbiAgICB9O1xuXG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmFkZHJlc3Nlcy5nZXQocHJlZml4KSB8fCBuZXcgTWFwKCk7XG4gICAgY29uc3QgYWRkcmVzc2VzID0gZ3JvdXAuZ2V0KHJlY29yZC56aXBfY29kZSkgfHwgW107XG4gICAgYWRkcmVzc2VzLnB1c2goZGF0YSk7XG5cbiAgICBncm91cC5zZXQocmVjb3JkLnppcF9jb2RlLCBhZGRyZXNzZXMpO1xuICAgIHRoaXMuYWRkcmVzc2VzLnNldChwcmVmaXgsIGdyb3VwKTtcbiAgfVxuICBnZW5lcmF0ZSgpIHtcbiAgICBsZXQgY2hhaW4gPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBmb3IgKGxldCBbIHByZWZpeCwgdmFsdWVzIF0gb2YgdGhpcy5hZGRyZXNzZXMuZW50cmllcygpKSB7XG4gICAgICBjaGFpbi50aGVuKHRoaXMub3V0cHV0RGljdGlvbmFyeShwcmVmaXgsIHZhbHVlcykpO1xuICAgIH1cbiAgICBjaGFpbi50aGVuKCgpID0+IHRoaXMuZW5kKCkpO1xuICB9XG4gIHJ1bigpIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdnZW5lcmF0aW5nIGRpY3Rpb25hcnknKTtcbiAgICBjb25zdCBzdHJlYW0gPSBjcmVhdGVGcm9tWmlwRmlsZSgna2VuX2FsbC56aXAnKTtcbiAgICBzdHJlYW0ub24oJ2RhdGEnLCAocmVjb3JkKSA9PiB0aGlzLmluZGV4aW5nKHJlY29yZCkpO1xuICAgIHN0cmVhbS5vbignZW5kJywgKCkgPT4gdGhpcy5nZW5lcmF0ZSgpKTtcbiAgfVxuICBlbmQoKSB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnZGljdGlvbmFyeSBpcyBnZW5lcmF0ZWQnKTtcbiAgfVxuICBvdXRwdXREaWN0aW9uYXJ5KHByZWZpeCwgdmFsdWVzKSB7XG4gICAgY29uc3QganNvbiA9IHt9O1xuICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiBqc29uW2tleV0gPSB2YWx1ZSk7XG4gICAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gICAgcmV0dXJuIHdyaXRlRmlsZSh0aGlzLm91dHB1dCArICcvemlwLScgKyBwcmVmaXggKyAnLmpzb24nLCBjb250ZW50KTtcbiAgfVxuICBzdGF0aWMgZnJvbShvdXRwdXQpIHtcbiAgICByZXR1cm4gbmV3IERpY3Rpb25hcnlHZW5lcmF0b3Iob3V0cHV0KTtcbiAgfVxufVxuIl19