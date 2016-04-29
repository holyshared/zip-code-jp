'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    for (let [prefix, values] of this.addresses.entries()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxZQUFZLGtCQUFRLFNBQVIsQ0FBa0IsYUFBRyxTQUFyQixDQUFsQjs7QUFFZSxNQUFNLG1CQUFOLENBQTBCO0FBQ3ZDLGNBQVksTUFBWixFQUFvQjtBQUNsQixTQUFLLE1BQUwsR0FBYyxVQUFVLFFBQXhCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLElBQUksR0FBSixFQUFqQjtBQUNBLFNBQUssTUFBTCxHQUFjLE9BQWQ7QUFDRDtBQUNELFdBQVMsTUFBVCxFQUFpQjtBQUNmLFVBQU0sU0FBUyxPQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBZjtBQUNBLFVBQU0sT0FBUSxjQUFjLElBQWQsQ0FBbUIsT0FBTyxJQUExQixDQUFELEdBQW9DLEVBQXBDLEdBQXlDLE9BQU8sSUFBN0Q7O0FBRUEsVUFBTSxPQUFPO0FBQ1gsa0JBQVksT0FBTyxVQURSO0FBRVgsWUFBTSxPQUFPLElBRkY7QUFHWCxZQUFNO0FBSEssS0FBYjs7QUFNQSxVQUFNLGtCQUFrQixLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLE1BQW5CLEtBQThCLElBQUksR0FBSixFQUF0RDtBQUNBLG9CQUFnQixHQUFoQixDQUFvQixPQUFPLFFBQTNCLEVBQXFDLElBQXJDO0FBQ0EsU0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixNQUFuQixFQUEyQixlQUEzQjtBQUNEO0FBQ0QsYUFBVztBQUNULFFBQUksUUFBUSxrQkFBUSxPQUFSLEVBQVo7QUFDQSxTQUFLLElBQUksQ0FBRSxNQUFGLEVBQVUsTUFBVixDQUFULElBQStCLEtBQUssU0FBTCxDQUFlLE9BQWYsRUFBL0IsRUFBeUQ7QUFDdkQsWUFBTSxJQUFOLENBQVcsS0FBSyxnQkFBTCxDQUFzQixNQUF0QixFQUE4QixNQUE5QixDQUFYO0FBQ0Q7QUFDRCxVQUFNLElBQU4sQ0FBVyxNQUFNLEtBQUssR0FBTCxFQUFqQjtBQUNEO0FBQ0QsUUFBTTtBQUNKLFNBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsdUJBQWpCO0FBQ0EsVUFBTSxTQUFTLHdDQUFrQixhQUFsQixDQUFmO0FBQ0EsV0FBTyxFQUFQLENBQVUsTUFBVixFQUFtQixNQUFELElBQVksS0FBSyxRQUFMLENBQWMsTUFBZCxDQUE5QjtBQUNBLFdBQU8sRUFBUCxDQUFVLEtBQVYsRUFBaUIsTUFBTSxLQUFLLFFBQUwsRUFBdkI7QUFDRDtBQUNELFFBQU07QUFDSixTQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLHlCQUFqQjtBQUNEO0FBQ0QsbUJBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQy9CLFVBQU0sT0FBTyxFQUFiO0FBQ0EsV0FBTyxPQUFQLENBQWUsQ0FBQyxLQUFELEVBQVEsR0FBUixLQUFnQixLQUFLLEdBQUwsSUFBWSxLQUEzQztBQUNBLFVBQU0sVUFBVSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQWhCOztBQUVBLFdBQU8sVUFBVSxLQUFLLE1BQUwsR0FBYyxPQUFkLEdBQXdCLE1BQXhCLEdBQWlDLE9BQTNDLEVBQW9ELE9BQXBELENBQVA7QUFDRDtBQUNELFNBQU8sSUFBUCxDQUFZLE1BQVosRUFBb0I7QUFDbEIsV0FBTyxJQUFJLG1CQUFKLENBQXdCLE1BQXhCLENBQVA7QUFDRDtBQTdDc0M7a0JBQXBCLG1CIiwiZmlsZSI6ImRpY3Rpb25hcnktZ2VuZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBjcmVhdGVGcm9tWmlwRmlsZSB9IGZyb20gJ3ppcC1jb2RlLWpwLXN0cmVhbSc7XG5cbmNvbnN0IHdyaXRlRmlsZSA9IFByb21pc2UucHJvbWlzaWZ5KGZzLndyaXRlRmlsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpY3Rpb25hcnlHZW5lcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihvdXRwdXQpIHtcbiAgICB0aGlzLm91dHB1dCA9IG91dHB1dCB8fCAnb3V0cHV0JztcbiAgICB0aGlzLmFkZHJlc3NlcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmxvZ2dlciA9IGNvbnNvbGU7XG4gIH1cbiAgaW5kZXhpbmcocmVjb3JkKSB7XG4gICAgY29uc3QgcHJlZml4ID0gcmVjb3JkLnppcF9jb2RlLnN1YnN0cigwLCAzKTtcbiAgICBjb25zdCBhcmVhID0gKC9e5Lul5LiL44Gr5o6y6LyJ44GM44Gq44GE5aC05ZCILy50ZXN0KHJlY29yZC5hcmVhKSkgPyAnJyA6IHJlY29yZC5hcmVhO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHByZWZlY3R1cmU6IHJlY29yZC5wcmVmZWN0dXJlLFxuICAgICAgY2l0eTogcmVjb3JkLmNpdHksXG4gICAgICBhcmVhOiBhcmVhLFxuICAgIH07XG5cbiAgICBjb25zdCBwcmVmaXhBZGRyZXNzZXMgPSB0aGlzLmFkZHJlc3Nlcy5nZXQocHJlZml4KSB8fCBuZXcgTWFwKCk7XG4gICAgcHJlZml4QWRkcmVzc2VzLnNldChyZWNvcmQuemlwX2NvZGUsIGRhdGEpO1xuICAgIHRoaXMuYWRkcmVzc2VzLnNldChwcmVmaXgsIHByZWZpeEFkZHJlc3Nlcyk7XG4gIH1cbiAgZ2VuZXJhdGUoKSB7XG4gICAgbGV0IGNoYWluID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgZm9yIChsZXQgWyBwcmVmaXgsIHZhbHVlcyBdIG9mIHRoaXMuYWRkcmVzc2VzLmVudHJpZXMoKSkge1xuICAgICAgY2hhaW4udGhlbih0aGlzLm91dHB1dERpY3Rpb25hcnkocHJlZml4LCB2YWx1ZXMpKTtcbiAgICB9XG4gICAgY2hhaW4udGhlbigoKSA9PiB0aGlzLmVuZCgpKTtcbiAgfVxuICBydW4oKSB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnZ2VuZXJhdGluZyBkaWN0aW9uYXJ5Jyk7XG4gICAgY29uc3Qgc3RyZWFtID0gY3JlYXRlRnJvbVppcEZpbGUoJ2tlbl9hbGwuemlwJyk7XG4gICAgc3RyZWFtLm9uKCdkYXRhJywgKHJlY29yZCkgPT4gdGhpcy5pbmRleGluZyhyZWNvcmQpKTtcbiAgICBzdHJlYW0ub24oJ2VuZCcsICgpID0+IHRoaXMuZ2VuZXJhdGUoKSk7XG4gIH1cbiAgZW5kKCkge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oJ2RpY3Rpb25hcnkgaXMgZ2VuZXJhdGVkJyk7XG4gIH1cbiAgb3V0cHV0RGljdGlvbmFyeShwcmVmaXgsIHZhbHVlcykge1xuICAgIGNvbnN0IGpzb24gPSB7fTtcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ganNvbltrZXldID0gdmFsdWUpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICAgIHJldHVybiB3cml0ZUZpbGUodGhpcy5vdXRwdXQgKyAnL3ppcC0nICsgcHJlZml4ICsgJy5qc29uJywgY29udGVudCk7XG4gIH1cbiAgc3RhdGljIGZyb20ob3V0cHV0KSB7XG4gICAgcmV0dXJuIG5ldyBEaWN0aW9uYXJ5R2VuZXJhdG9yKG91dHB1dCk7XG4gIH1cbn1cbiJdfQ==