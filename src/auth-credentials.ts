import { LoginMethod } from '@/constants/session';
import { AUTH_CREDENTIALS_LOCAL_STORAGE_KEY } from '@/constants/local-storage';
import LocalStorage from '@/local-storage';

class _AuthCredentials {
  private _storage: LocalStorage;

  // private _accessToken: LocalStorage;

  // private _refreshToken: LocalStorage;

  // private _userId: string | null;

  constructor() {
    this._storage = new LocalStorage(AUTH_CREDENTIALS_LOCAL_STORAGE_KEY);
    // this._accessToken = new LocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    // this._refreshToken = new LocalStorage(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
    // this._userId = null;
  }

  get(): ({
    accessToken: string;
    refreshToken: string;
    userId: string;
    loginMethod: LoginMethod;
  } | null) {
    if (typeof window === 'undefined') {
      return null;
    }
    const rawValue = this._storage.get();
    if (!rawValue) {
      return null;
    }
    const { accessToken, refreshToken, userId, loginMethod } = JSON.parse(rawValue);
    return {
      accessToken,
      refreshToken,
      userId,
      loginMethod,
    };
  }

  set(param: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    loginMethod: LoginMethod;
  }) {
    if (typeof window === 'undefined') return;
    this._storage.set(JSON.stringify(param));
  }

  remove() {
    if (typeof window === 'undefined') return;
    this._storage.remove();
  }
}

const AuthCredentials = new _AuthCredentials();

export default AuthCredentials;
