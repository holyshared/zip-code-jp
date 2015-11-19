import { Promise } from 'bluebird';

export class CacheAdapter {
  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }

  /**
   * Cache the dictionary
   *
   * @param {string} prefix
   * @param {Object} dict
   * @return Promise<void>
   */
  store(prefix, dict) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

export class MemoryCacheAdapter extends CacheAdapter {
  constructor() {
    super();
    this.dicts = {};
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
    return Promise.resolve(null);
  }

  /**
   * Cache the dictionary
   *
   * @param {string} prefix
   * @param {Object} dict
   * @return Promise<void>
   */
  store(prefix, dict) {
    this.dicts[prefix] = dict;
    return Promise.resolve();
  }
}

export class CacheManager {
  constructor(adapter) {
    this.adapter = adapter;
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
    return this.adapter.find(prefix);
  }

  /**
   * Cache the dictionary
   *
   * @param {string} prefix
   * @param {Object} dict
   * @return Promise<void>
   */
  store(prefix, dict) {
    return this.adapter.store(prefix, dict);
  }
}
