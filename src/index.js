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

const EmptyResult = {
  prefecture: null,
  city: null,
  area: null,
  street: null
};

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
  static emptyResult() {
    return Object.create(EmptyResult);
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
    return this.verifyCode(code).then((result) =>　{
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
      const address = dict[postalCode];
      return ResolvedResult.fromObject(address);
    });
  }
  emptyResult() {
    return Promise.resolve(null);
  }
}
