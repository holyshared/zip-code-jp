import fs from 'fs';
import path from 'path';
import { Promise } from 'bluebird';
import { CacheManager, MemoryCacheAdapter, CacheAdapter } from './cache';
import { CacheableDictionaryLoader, DictionaryLoader } from './dictionary-loader';

export const cache = {
  CacheManager: CacheManager,
  CacheAdapter: CacheAdapter,
  MemoryCacheAdapter: MemoryCacheAdapter
};

export const dict = {
  DictionaryLoader: DictionaryLoader,
  CacheableDictionaryLoader: CacheableDictionaryLoader
};

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
  const key = PROPERTIES[k];
  result[key] = null;
});

const emptyResult = result;

const readFile = Promise.promisify(fs.readFile);

export class ResolvedResult {
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
    let result = ResolvedResult.emptyResult();

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
  static emptyResult() {
    return Object.create(emptyResult);
  }
}

export default class AddressResolver {
  constructor(adapter = new MemoryCacheAdapter()) {
    this.dictLoader = new CacheableDictionaryLoader(adapter);
  }

  /**
   * Find the address from the postal code
   *
   * @param {string} code
   * @return Promise<Object>
   * @throws {AddressNotFoundError} Thrown if the address is not found
   */
  find(code) {
    return Promise.bind(this).then(() => {
      return this.verifyCode(code);
    }).then(function(result) {
      if (!result.passed) {
        return this.emptyResult();
      }
      return this.loadAddressByCode(result.postalCode);
    });
  }
  verifyCode(code) {
    const postalCode = (code || '').replace(/-/, '');
    const result = (postalCode.length < 7) ? false : true;

    return Promise.resolve({
      passed: result,
      postalCode: postalCode
    });
  }
  loadAddressByCode(postalCode) {
    const prefix = postalCode.substr(0, 3);

    return this.dictLoader.loadFromPrefix(prefix).then((dict) => {
      if (!dict[postalCode]) {
        return this.emptyResult();
      }
      const addresses = dict[postalCode];
      return ResolvedResult.fromArray(addresses);
    });
  }
  emptyResult() {
    return Promise.resolve(null);
  }
}
