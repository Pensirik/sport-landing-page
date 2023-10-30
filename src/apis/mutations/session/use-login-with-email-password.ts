import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOGIN_WITH_EMAIL_PASSWORD_API } from '@/constants/api-metadata/internal/session';
import { DefaultInternalFetcher } from '@/apis/fetcher-instance';
import { USE_GET_MY_SESSION_QUERY_KEY } from '@/apis/queries/session/use-get-my-session';
import AuthCredentials from '@/auth-credentials';
import { APIResponse } from '@/constants/api';
import { LoginMethod } from '@/constants/session';

export default function useLoginWithEmailPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [LOGIN_WITH_EMAIL_PASSWORD_API],
    mutationFn: async (param: {
      email: string;
      password: string;
    }) => {
      const response = await DefaultInternalFetcher.fetch<APIResponse<{
        user_id: string;
        login_method: LoginMethod;
        access_token: string;
        refresh_token: string;
      }>>({
        method: LOGIN_WITH_EMAIL_PASSWORD_API.METHOD,
        path: LOGIN_WITH_EMAIL_PASSWORD_API.PATH,
        body: {
          email: param.email,
          password: param.password,
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
}
