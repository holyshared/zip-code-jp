import fs from 'fs';
import path from 'path';
import { Promise } from 'bluebird';
import { CacheManager } from './cache';

const readFile = Promise.promisify(fs.readFile);

export class DictionaryLoader {
  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  loadFromPrefix(prefix) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

export class CacheableDictionaryLoader extends DictionaryLoader {
  constructor(adapter) {
    super()
    this.cacheManager = new CacheManager(adapter);
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  loadFromPrefix(prefix) {
    return this.loadAddressDictionaryFromCache(prefix).then((dict) => {
      if (dict) {
        return dict;
      }
      return this.loadAddressDictionaryFromFile(prefix);
    });
  }
  loadAddressDictionaryFromCache(prefix) {
    return this.cacheManager.find(prefix);
  }
  loadAddressDictionaryFromFile(prefix) {
    const file = path.join(__dirname, '/../json', 'zip-' + prefix + '.json');

    return readFile(file).then((content) => {
      let dict = null;
      try {
        dict = JSON.parse(content);
      } catch (err) {
        return Promise.reject(err);
      }
      const returnValue = () => Promise.resolve(dict);
      return this.cacheManager.store(prefix, dict).then(returnValue);
    });
  }
}
