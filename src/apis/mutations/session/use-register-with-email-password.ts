import { useMutation } from '@tanstack/react-query';
import { REGISTER_WITH_EMAIL_PASSWORD_API } from '@/constants/api-metadata/internal/session';
import { DefaultInternalFetcher } from '@/apis/fetcher-instance';
import { APIResponse } from '@/constants/api';

export default function useRegisterWithEmailPassword() {
  return useMutation({
    mutationKey: [REGISTER_WITH_EMAIL_PASSWORD_API],
    mutationFn: async (param: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      return DefaultInternalFetcher.fetch<APIResponse<{ otp_ref: string; expire_at: string }>>({
        method: REGISTER_WITH_EMAIL_PASSWORD_API.METHOD,
        path: REGISTER_WITH_EMAIL_PASSWORD_API.PATH,
        body: {
          email: param.email,
          password: param.password,
          first_name: param.firstName,
          last_name: param.lastName,
        },
      });
    },
  });
}
