class LocalStorage {
  protected _localStorageKey: string;

  constructor(localStorageKey: string) {
    this._localStorageKey = localStorageKey;
  }

  get(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this._localStorageKey);
    }
    return null;
  }

  set(v: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this._localStorageKey, v);
    }
  }

  remove() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this._localStorageKey);
    }
  }
}

export default LocalStorage;
