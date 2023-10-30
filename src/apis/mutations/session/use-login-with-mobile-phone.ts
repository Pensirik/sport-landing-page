import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REQUEST_OTP_VIA_MOBILE_PHONE, VERIFY_OTP_FROM_MOBILE_PHONE } from '@/constants/api-metadata/internal/session';
import { DefaultInternalFetcher } from '@/apis/fetcher-instance';
import { APIErrorResponse, APIResponse, ERROR_CODE } from '@/constants/api';
import { LoginMethod } from '@/constants/session';
import AuthCredentials from '@/auth-credentials';
import { USE_GET_MY_SESSION_QUERY_KEY } from '@/apis/queries/session/use-get-my-session';

export default function useLoginWithMobilePhone() {
  const mobilePhoneRef = useRef<string>();
  const queryClient = useQueryClient();
  const requestOtpMutation = useMutation({
    mutationKey: [REQUEST_OTP_VIA_MOBILE_PHONE],
    mutationFn: async (param: {
      mobilePhone: string;
    }) => {
      const response = await DefaultInternalFetcher.fetch<APIResponse<{
        already_has_user: boolean;
        otp_ref: string;
        expire_at: string;
      }>>({
        method: REQUEST_OTP_VIA_MOBILE_PHONE.METHOD,
        path: REQUEST_OTP_VIA_MOBILE_PHONE.PATH,
        body: {
          mobile_number: param.mobilePhone,
        },
      });
      if (response.success) {
        mobilePhoneRef.current = param.mobilePhone;
      }
      return response;
    },
  });
  const verifyOtpMutation = useMutation({
    mutationKey: [VERIFY_OTP_FROM_MOBILE_PHONE],
    mutationFn: async (param: {
      otpCode: string;
    }) => {
      if (
        requestOtpMutation.status !== 'success'
        || !requestOtpMutation.data.success
        || !mobilePhoneRef.current
      ) {
        const apiErrorResponseData: APIErrorResponse = {
          success: false,
          error_code: ERROR_CODE._FRONTEND_MOBILE_PHONE_OTP_REQUEST_IS_NOT_SUCCESS,
        };
        return apiErrorResponseData;
      }
      const response = await DefaultInternalFetcher.fetch<APIResponse<{
        user_id: string,
        login_method: LoginMethod,
        access_token: string,
        refresh_token: string,
      }>>({
        method: VERIFY_OTP_FROM_MOBILE_PHONE.METHOD,
        path: VERIFY_OTP_FROM_MOBILE_PHONE.PATH,
        body: {
          mobile_number: mobilePhoneRef.current,
          otp_ref: requestOtpMutation.data.otp_ref,
          otp_code: param.otpCode,
        },
      });
      if (response.success) {
        AuthCredentials.set({
          loginMethod: response.login_method,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          userId: response.user_id,
        });
        await queryClient.invalidateQueries({ queryKey: USE_GET_MY_SESSION_QUERY_KEY });
      }
      return response;
    },
  });
  return { requestOtpMutation, verifyOtpMutation };
}
