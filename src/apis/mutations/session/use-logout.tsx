import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOGOUT_API } from '@/constants/api-metadata/internal/session';
import { DefaultInternalFetcher } from '@/apis/fetcher-instance';
import { USE_GET_MY_SESSION_QUERY_KEY } from '@/apis/queries/session/use-get-my-session';
import AuthCredentials from '@/auth-credentials';

export default function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [LOGOUT_API],
    mutationFn: async () => {
      const credentials = AuthCredentials.get();
      const response = await DefaultInternalFetcher.fetch({
        method: LOGOUT_API.METHOD,
        path: LOGOUT_API.PATH,
        body: {
          refresh_token: credentials?.refreshToken,
        },
      });
      if (response.success) {
        AuthCredentials.remove();
        await queryClient.invalidateQueries({ queryKey: USE_GET_MY_SESSION_QUERY_KEY });
      }
      return response;
    },
  });
}
