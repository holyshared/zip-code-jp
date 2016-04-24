'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _dictionaryGenerator = require('./dictionary-generator');

var _dictionaryGenerator2 = _interopRequireDefault(_dictionaryGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.1.0').option('-o, --output [directory]', 'Output directory').parse(process.argv);

_dictionaryGenerator2.default.from(_commander2.default.output).run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxvQkFDRyxPQURILENBQ1csT0FEWCxFQUVHLE1BRkgsQ0FFVSwwQkFGVixFQUVzQyxrQkFGdEMsRUFHRyxLQUhILENBR1MsUUFBUSxJQUhqQjs7QUFLQSw4QkFBb0IsSUFBcEIsQ0FBeUIsb0JBQVEsTUFBakMsRUFBeUMsR0FBekMiLCJmaWxlIjoiY2xpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCBEaWN0aW9uYXJ5R2VuZXJhdG9yIGZyb20gJy4vZGljdGlvbmFyeS1nZW5lcmF0b3InO1xuXG5wcm9ncmFtXG4gIC52ZXJzaW9uKCcwLjEuMCcpXG4gIC5vcHRpb24oJy1vLCAtLW91dHB1dCBbZGlyZWN0b3J5XScsICdPdXRwdXQgZGlyZWN0b3J5JylcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbkRpY3Rpb25hcnlHZW5lcmF0b3IuZnJvbShwcm9ncmFtLm91dHB1dCkucnVuKCk7XG4iXX0=