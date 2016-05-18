'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _dictionaryGenerator = require('./dictionary-generator');

var _dictionaryGenerator2 = _interopRequireDefault(_dictionaryGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.1.0').option('-o, --output [directory]', 'Output directory').parse(process.argv);

_dictionaryGenerator2.default.from(_commander2.default.output).run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxvQkFDRyxPQURILENBQ1csT0FEWCxFQUVHLE1BRkgsQ0FFVSwwQkFGVixFQUVzQyxrQkFGdEMsRUFHRyxLQUhILENBR1MsUUFBUSxJQUhqQjs7QUFLQSw4QkFBWSxJQUFaLENBQWlCLG9CQUFRLE1BQXpCLEVBQWlDLEdBQWpDIiwiZmlsZSI6ImNsaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9ncmFtIGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kaWN0aW9uYXJ5LWdlbmVyYXRvcic7XG5cbnByb2dyYW1cbiAgLnZlcnNpb24oJzAuMS4wJylcbiAgLm9wdGlvbignLW8sIC0tb3V0cHV0IFtkaXJlY3RvcnldJywgJ091dHB1dCBkaXJlY3RvcnknKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuQXBwbGljYXRpb24uZnJvbShwcm9ncmFtLm91dHB1dCkucnVuKCk7XG4iXX0=