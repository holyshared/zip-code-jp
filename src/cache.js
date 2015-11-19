import { Promise } from 'bluebird';

export class CacheAdapter {
  constructor() {
  }
  find(code) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

export class MemoryCacheAdapter extends CacheAdapter {
  constructor() {
    super();
  }
  find(code) {
    return Promise.resolve(null);
  }
}

export class CacheManager {
  constructor(adapter) {
    this.adapter = adapter;
  }
  find(code) {
    return this.adapter.find(code);
  }
}
