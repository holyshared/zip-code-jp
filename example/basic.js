'use strict';

var AddpressResolver = require('../lib').default;
var resolver = new AddpressResolver();

resolver.find('0010933').then(function(res) {
  console.log(res);
});
