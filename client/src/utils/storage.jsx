export class LocalStorage {
  cache = {};

  config

  get(key) {
    const { cache } = this;
    return cache[key];
  }

  set(key, value) {
    const { cache } = this;
    cache[key] = value;
  }

  clear() {
    if (this.config) {
      Object.keys(this.config).forEach((key) => {
        this.cache[key] = null;
      });
    }
  }

  constructor(config) {
    this.config = config;
    const { cache } = this;
    Object.keys(config).forEach((key) => {
      Object.defineProperty(cache, key, {
        set(value) {
          localStorage.setItem(key, JSON.stringify(value));
        },
        get() {
          const serizalized = localStorage.getItem(key);
          return serizalized ? JSON.parse(serizalized) : null;
        },
      });
    });
  }
}