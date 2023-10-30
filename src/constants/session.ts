import { Permission } from './role';
import { User } from './user';

export enum LoginMethod {
  EmailPassword = 'EmailPassword',
  MobilePhone = 'MobilePhone',
}

export type SessionData = { isLoggedIn: false }
  | { isLoggedIn: true; loginMethod: LoginMethod; user: User; permissions: Permission[] };
