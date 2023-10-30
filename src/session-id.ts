import { customAlphabet } from 'nanoid';
import publicConfig from '@/config/public';

const generateSessionId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-', publicConfig.session.idLength);

class _SessionId {
  private _id?: string;

  get value() {
    return this._id;
  }

  initialize() {
    const sessionId = typeof window !== 'undefined' ? generateSessionId() : undefined;
    this._id = sessionId;
    return sessionId;
  }
}

const SessionId = new _SessionId();
export default SessionId;
