'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _zipCodeJpStream = require('zip-code-jp-stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addresses = new Map();
var writeFile = _bluebird.Promise.promisify(_fs2.default.writeFile);
var stream = (0, _zipCodeJpStream.createFromZipFile)('ken_all.zip');

stream.on('data', function (record) {
  var prefix = record.zip_code.substr(0, 3);
  var area = /^以下に掲載がない場合/.test(record.area) ? '' : record.area;

  var data = {
    prefecture: record.prefecture,
    city: record.city,
    area: area
  };

  var prefixAddresses = addresses.get(prefix) || new Map();
  prefixAddresses.set(record.zip_code, data);
  addresses.set(prefix, prefixAddresses);
});

stream.on('end', function () {
  var chain = _bluebird.Promise.resolve();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = addresses.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var prefix = _step$value[0];
      var values = _step$value[1];

      chain.then(output(prefix, values));
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
    console.log('end');
  });
});

function output(prefix, values) {
  var json = {};
  values.forEach(function (value, key) {
    return json[key] = value;
  });
  var content = JSON.stringify(json);

  return writeFile('output/zip-' + prefix + '.json', content);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaWN0aW9uYXJ5LWdlbmVyYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU0sWUFBWSxJQUFJLEdBQUosRUFBbEI7QUFDQSxJQUFNLFlBQVksa0JBQVEsU0FBUixDQUFrQixhQUFHLFNBQXJCLENBQWxCO0FBQ0EsSUFBTSxTQUFTLHdDQUFrQixhQUFsQixDQUFmOztBQUVBLE9BQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBQyxNQUFELEVBQVk7QUFDNUIsTUFBTSxTQUFTLE9BQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixDQUF2QixFQUEwQixDQUExQixDQUFmO0FBQ0EsTUFBTSxPQUFRLGNBQWMsSUFBZCxDQUFtQixPQUFPLElBQTFCLENBQUQsR0FBb0MsRUFBcEMsR0FBeUMsT0FBTyxJQUE3RDs7QUFFQSxNQUFNLE9BQU87QUFDWCxnQkFBWSxPQUFPLFVBRFI7QUFFWCxVQUFNLE9BQU8sSUFGRjtBQUdYLFVBQU07QUFISyxHQUFiOztBQU1BLE1BQU0sa0JBQWtCLFVBQVUsR0FBVixDQUFjLE1BQWQsS0FBeUIsSUFBSSxHQUFKLEVBQWpEO0FBQ0Esa0JBQWdCLEdBQWhCLENBQW9CLE9BQU8sUUFBM0IsRUFBcUMsSUFBckM7QUFDQSxZQUFVLEdBQVYsQ0FBYyxNQUFkLEVBQXNCLGVBQXRCO0FBQ0QsQ0FiRDs7QUFlQSxPQUFPLEVBQVAsQ0FBVSxLQUFWLEVBQWlCLFlBQU07QUFDckIsTUFBSSxRQUFRLGtCQUFRLE9BQVIsRUFBWjs7QUFEcUI7QUFBQTtBQUFBOztBQUFBO0FBR3JCLHlCQUErQixVQUFVLE9BQVYsRUFBL0IsOEhBQW9EO0FBQUE7O0FBQUEsVUFBekMsTUFBeUM7QUFBQSxVQUFqQyxNQUFpQzs7QUFDbEQsWUFBTSxJQUFOLENBQVcsT0FBTyxNQUFQLEVBQWUsTUFBZixDQUFYO0FBQ0Q7QUFMb0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFNckIsUUFBTSxJQUFOLENBQVcsWUFBTTtBQUNmLFlBQVEsR0FBUixDQUFZLEtBQVo7QUFDRCxHQUZEO0FBR0QsQ0FURDs7QUFXQSxTQUFTLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBd0IsTUFBeEIsRUFBZ0M7QUFDOUIsTUFBTSxPQUFPLEVBQWI7QUFDQSxTQUFPLE9BQVAsQ0FBZSxVQUFDLEtBQUQsRUFBUSxHQUFSO0FBQUEsV0FBZ0IsS0FBSyxHQUFMLElBQVksS0FBNUI7QUFBQSxHQUFmO0FBQ0EsTUFBTSxVQUFVLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBaEI7O0FBRUEsU0FBTyxVQUFVLGdCQUFnQixNQUFoQixHQUF5QixPQUFuQyxFQUE0QyxPQUE1QyxDQUFQO0FBQ0QiLCJmaWxlIjoiZGljdGlvbmFyeS1nZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGNyZWF0ZUZyb21aaXBGaWxlIH0gZnJvbSAnemlwLWNvZGUtanAtc3RyZWFtJztcblxuY29uc3QgYWRkcmVzc2VzID0gbmV3IE1hcCgpO1xuY29uc3Qgd3JpdGVGaWxlID0gUHJvbWlzZS5wcm9taXNpZnkoZnMud3JpdGVGaWxlKTtcbmNvbnN0IHN0cmVhbSA9IGNyZWF0ZUZyb21aaXBGaWxlKCdrZW5fYWxsLnppcCcpO1xuXG5zdHJlYW0ub24oJ2RhdGEnLCAocmVjb3JkKSA9PiB7XG4gIGNvbnN0IHByZWZpeCA9IHJlY29yZC56aXBfY29kZS5zdWJzdHIoMCwgMyk7XG4gIGNvbnN0IGFyZWEgPSAoL17ku6XkuIvjgavmjrLovInjgYzjgarjgYTloLTlkIgvLnRlc3QocmVjb3JkLmFyZWEpKSA/ICcnIDogcmVjb3JkLmFyZWE7XG5cbiAgY29uc3QgZGF0YSA9IHtcbiAgICBwcmVmZWN0dXJlOiByZWNvcmQucHJlZmVjdHVyZSxcbiAgICBjaXR5OiByZWNvcmQuY2l0eSxcbiAgICBhcmVhOiBhcmVhLFxuICB9O1xuXG4gIGNvbnN0IHByZWZpeEFkZHJlc3NlcyA9IGFkZHJlc3Nlcy5nZXQocHJlZml4KSB8fCBuZXcgTWFwKCk7XG4gIHByZWZpeEFkZHJlc3Nlcy5zZXQocmVjb3JkLnppcF9jb2RlLCBkYXRhKTtcbiAgYWRkcmVzc2VzLnNldChwcmVmaXgsIHByZWZpeEFkZHJlc3Nlcyk7XG59KTtcblxuc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiB7XG4gIGxldCBjaGFpbiA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gIGZvciAobGV0IFsgcHJlZml4LCB2YWx1ZXMgXSBvZiBhZGRyZXNzZXMuZW50cmllcygpKSB7XG4gICAgY2hhaW4udGhlbihvdXRwdXQocHJlZml4LCB2YWx1ZXMpKTtcbiAgfVxuICBjaGFpbi50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnZW5kJyk7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIG91dHB1dChwcmVmaXgsIHZhbHVlcykge1xuICBjb25zdCBqc29uID0ge307XG4gIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiBqc29uW2tleV0gPSB2YWx1ZSk7XG4gIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICByZXR1cm4gd3JpdGVGaWxlKCdvdXRwdXQvemlwLScgKyBwcmVmaXggKyAnLmpzb24nLCBjb250ZW50KTtcbn1cbiJdfQ==