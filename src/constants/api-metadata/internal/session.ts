import { FetcherType } from '@/constants/fetcher';
import { APIResponse } from '@/constants/api';
import { LoginMethod } from '@/constants/session';
import { ApiRequestMetadata } from '../type';

export const GET_MY_SESSION_API: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'GET',
  PATH: '/protected/sessions/me',
};

export const LOGIN_WITH_EMAIL_PASSWORD_API: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'POST',
  PATH: '/public/sessions/email/login',
};

export const REQUEST_OTP_VIA_MOBILE_PHONE: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'POST',
  PATH: '/public/sessions/mobile/request-otp',
};

export const VERIFY_OTP_FROM_MOBILE_PHONE: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'POST',
  PATH: '/public/sessions/mobile/verify-otp',
};

export const REGISTER_WITH_EMAIL_PASSWORD_API: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'POST',
  PATH: '/public/sessions/email/register',
};

export const RESEND_OTP_TO_EMAIL_API: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'POST',
  PATH: '/public/sessions/email/resend-otp',
};

export const VERIFY_OTP_FROM_EMAIL_API: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'POST',
  PATH: '/public/sessions/email/verify-otp',
};

export type RefreshTokenAPIResponse = APIResponse<{ user_id: string; login_method: LoginMethod; access_token: string; refresh_token: string; }>
export const REFRESH_TOKEN_API: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'PUT',
  PATH: '/public/sessions/access-token/refresh',
};

export const LOGOUT_API: ApiRequestMetadata = {
  TYPE: FetcherType.INTERNAL,
  METHOD: 'DELETE',
  PATH: '/public/sessions/access-token/logout',
};
