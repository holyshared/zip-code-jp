# postal-code-jp

[![Build Status](https://travis-ci.org/holyshared/postal-code-jp.svg?branch=master)](https://travis-ci.org/holyshared/postal-code-jp)
[![codecov.io](https://codecov.io/github/holyshared/postal-code-jp/coverage.svg?branch=master)](https://codecov.io/github/holyshared/postal-code-jp?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/564c68b14e32b6001e00036a/badge.svg?style=flat)](https://www.versioneye.com/user/projects/564c68b14e32b6001e00036a)

## Basic usage

郵便番号から、住所の情報を返します。

```js
import AddressResolver from 'postal-code-jp';

const resolver = new AddressResolver();

resolver.find('0010933').then((address) => {
  console.log(address.prefecture); // 都道府県
  console.log(address.city); // 市区町村名
  console.log(address.area); // 町域名
  console.log(address.street); // 番地
});

```

## Run the test

次のコマンドで、テストを実行できます。

	npm install
	npm run instrument
	npm test
