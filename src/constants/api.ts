// 1 Prefix
const GENERAL_ERROR_CODE = {
  _FRONTEND_UNKNOWN_ERROR: 10000,
  UNKNOWN_ERROR: 1000,
  REQUEST_BODY_VALIDATION_FAILED: 1001,
  DATABASE_CONNECTION_FAILED: 1002,
};

// 2 Prefix
const AUTH_ERROR_CODE = {
  _FRONTEND_OTP_NOT_FOUND: 20005,
  _FRONTEND_MOBILE_PHONE_OTP_REQUEST_IS_NOT_SUCCESS: 20006,
  UNMATCH_PASSWORD: 2000,
  DUPLICATE_EMAIL: 2001,
  FAIL_TO_HASH_PASSWORD: 2002,
  USER_ALREADY_VERIFIED: 2003,
  CANT_FIND_OTP_IN_SESSION: 2004,
  OTP_EXPIRED: 2005,
  UNMATCH_OTP: 2006,
  CANT_FIND_REFRESH_TOKEN_IN_SESSION: 2007,
  REFRESH_TOKEN_EXPIRED: 2008,
  UNAUTHORIZED: 2009,
  PERMISSIONS_NOT_ALLOWED: 2010,
  FAIL_TO_RESEND_OTP: 2011,
  AUTH_USER_NOT_FOUND: 2012,
  FAILED_TO_VERIFY_TOKEN: 2013,
  MISSING_AUTH_HEADER: 2014,
};

export const ERROR_CODE = {
  ...GENERAL_ERROR_CODE,
  ...AUTH_ERROR_CODE,
};

export type APISuccessResponse<T = { [key: string]: unknown }> = {
  success: true;
} & T;
export type APIErrorResponse = {
  success: false;
  error_code: number;
}
export type APIResponse<T = { [key: string]: unknown }> = APISuccessResponse<T> | APIErrorResponse

type ExternalAPISuccessResponse<T = unknown> = {
  success: true;
  data: T;
};
type ExternalAPIErrorResponse<T = unknown> = {
  success: false;
  error_text?: string;
  data: T;
};
export type ExternalAPIResponse<S = unknown, E = unknown> = ExternalAPISuccessResponse<S> | ExternalAPIErrorResponse<E>;

export const HeaderName = {
  X_REQUEST_ID: 'x-request-id',
};
