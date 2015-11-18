'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CacheManager = (function () {
  function CacheManager() {
    _classCallCheck(this, CacheManager);
  }

  _createClass(CacheManager, [{
    key: 'construct',
    value: function construct() {}
  }]);

  return CacheManager;
})();

var AddressResolver = (function () {
  function AddressResolver() {
    _classCallCheck(this, AddressResolver);
  }

  _createClass(AddressResolver, [{
    key: 'construct',
    value: function construct(cacheManager) {
      this.cacheManager = cacheManager;
    }
  }, {
    key: 'find',
    value: function find(code) {}
  }]);

  return AddressResolver;
})();

exports.default = AddressResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBRU0sWUFBWTtXQUFaLFlBQVk7MEJBQVosWUFBWTs7O2VBQVosWUFBWTs7Z0NBQ0osRUFDWDs7O1NBRkcsWUFBWTs7O0lBS0csZUFBZTtXQUFmLGVBQWU7MEJBQWYsZUFBZTs7O2VBQWYsZUFBZTs7OEJBQ3hCLFlBQVksRUFBRTtBQUN0QixVQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztLQUNsQzs7O3lCQUNJLElBQUksRUFBRSxFQUNWOzs7U0FMa0IsZUFBZTs7O2tCQUFmLGVBQWUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmNsYXNzIENhY2hlTWFuYWdlciB7XG4gIGNvbnN0cnVjdCgpIHtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3QoY2FjaGVNYW5hZ2VyKSB7XG4gICAgdGhpcy5jYWNoZU1hbmFnZXIgPSBjYWNoZU1hbmFnZXI7XG4gIH1cbiAgZmluZChjb2RlKSB7XG4gIH1cbn1cbiJdfQ==