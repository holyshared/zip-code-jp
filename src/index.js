import fs from 'fs';
import path from 'path';
import { Promise } from 'bluebird';

export class NotFoundError extends Error {
  constructor() {
    super(arguments);
  }
}

export class CacheAdapter {
  constructor() {
  }
}

export class FileCacheAdapter extends CacheAdapter {
  constructor() {
    super();
  }
}

export class CacheManager {
  constructor(adapter) {
    this.adapter = adapter;
  }
}

const PREFECTURE_DICT = [
  null,       '北海道',   '青森県',   '岩手県',   '宮城県',
  '秋田県',   '山形県',   '福島県',   '茨城県',   '栃木県',
  '群馬県',   '埼玉県',   '千葉県',   '東京都',   '神奈川県',
  '新潟県',   '富山県',   '石川県',   '福井県',   '山梨県',
  '長野県',   '岐阜県',   '静岡県',   '愛知県',   '三重県',
  '滋賀県',   '京都府',   '大阪府',   '兵庫県',   '奈良県',
  '和歌山県', '鳥取県',   '島根県',   '岡山県',   '広島県',
  '山口県',   '徳島県',   '香川県',   '愛媛県',   '高知県',
  '福岡県',   '佐賀県',   '長崎県',   '熊本県',   '大分県',
  '宮崎県',   '鹿児島県', '沖縄県'
];

const PROPERTIES = {
  0: 'prefecture',
  1: 'city',
  2: 'area',
  3: 'street'
};

let result = {};

Object.keys(PROPERTIES).forEach((k) => {
  result[k] = null;
});

const emptyResult = result;

const readFile = Promise.promisify(fs.readFile);

class ResolvedResult {
  constructor(prefecture, city, area, street = null) {
    this.prefecture = prefecture;
    this.city = city;
    this.area = area;
    this.street = street;
  }
  static fromObject(object) {
    return new ResolvedResult(
      object.prefecture,
      object.city,
      object.area,
      object.street
    );
  }
  static fromArray(addresses) {
    let result = Object.create(emptyResult);

    addresses.forEach((val, i) => {
      const key = PROPERTIES[i];

      if (i === 0) {
        result[key] = PREFECTURE_DICT[val];
      } else {
        result[key] = val;
      }
    });

    return ResolvedResult.fromObject(result);
  }
}


export default class AddressResolver {
  constructor(adapter) {
    this.cacheManager = new CacheManager(adapter);
  }
  find(code) {
    const postalCode = code || '';

    if (postalCode.length < 7) {
      return Promise.resolve(null);
    }

    const prefix = postalCode.substr(0, 3);
    const file = path.join(__dirname, '/../json', 'zip-' + prefix + '.json');

    return readFile(file).then((content) => {
      const dict = JSON.parse(content);

      if (!dict[postalCode]) {
        throw new NotFoundError('Address could not be found');
      }

      const addresses = dict[postalCode];

      return ResolvedResult.fromArray(addresses);
    });
  }

  verifyCode(code) {
    const postalCode = code || '';

    if (postalCode.length < 7) {
      return Promise.resolve(null);
    }
    return Promise.resolve(postalCode);
  }

}
