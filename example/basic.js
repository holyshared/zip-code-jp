'use strict';

var AddressResolver = require('../lib').default;
var resolver = new AddressResolver();

resolver.find('001-0933').then(function(res) {
  console.log(res);
});
