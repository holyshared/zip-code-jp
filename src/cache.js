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
