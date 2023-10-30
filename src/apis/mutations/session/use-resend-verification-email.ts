import { useMutation } from '@tanstack/react-query';
import { RESEND_OTP_TO_EMAIL_API } from '@/constants/api-metadata/internal/session';
import { DefaultInternalFetcher } from '@/apis/fetcher-instance';

export default function useResendVerificationEmail() {
  return useMutation({
    mutationKey: [RESEND_OTP_TO_EMAIL_API],
    mutationFn: async (param: {
      email: string;
    }) => {
      const response = await DefaultInternalFetcher.fetch({
        method: RESEND_OTP_TO_EMAIL_API.METHOD,
        path: RESEND_OTP_TO_EMAIL_API.PATH,
        body: {
          email: param.email,
        },
      });
      return response;
    },
  });
}
