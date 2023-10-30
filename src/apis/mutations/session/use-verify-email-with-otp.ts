import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VERIFY_OTP_FROM_EMAIL_API } from '@/constants/api-metadata/internal/session';
import { DefaultInternalFetcher } from '@/apis/fetcher-instance';
import { USE_GET_MY_SESSION_QUERY_KEY } from '@/apis/queries/session/use-get-my-session';

export default function useVerifyEmailWithOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [VERIFY_OTP_FROM_EMAIL_API],
    mutationFn: async (param: {
      email: string;
      otp_ref: string;
      otp_code: string;
    }) => {
      const response = await DefaultInternalFetcher.fetch({
        method: VERIFY_OTP_FROM_EMAIL_API.METHOD,
        path: VERIFY_OTP_FROM_EMAIL_API.PATH,
        body: {
          email: param.email,
          otp_ref: param.otp_ref,
          otp_code: param.otp_code,
        },
      });
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: USE_GET_MY_SESSION_QUERY_KEY });
      }
      return response;
    },
  });
}
