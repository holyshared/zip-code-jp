import { Promise } from 'bluebird';

export class CacheAdapter {
  constructor() {
  }
  find(code) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
  store(prefix, dict) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

export class MemoryCacheAdapter extends CacheAdapter {
  constructor() {
    super();
    this.dicts = {};
  }
  find(code) {
    return Promise.resolve(null);
  }
  store(prefix, dict) {
    this.dicts[prefix] = dict;
  }
}

export class CacheManager {
  constructor(adapter) {
    this.adapter = adapter;
  }
  find(code) {
    return this.adapter.find(code);
  }
  store(prefix, dict) {
    return this.adapter.store(prefix, dict);
  }
}
