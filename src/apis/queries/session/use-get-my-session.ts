import { useQuery } from '@tanstack/react-query';
import { GET_MY_SESSION_API } from '@/constants/api-metadata/internal/session';
import { DefaultInternalFetcher } from '@/apis/fetcher-instance';
import { APIResponse } from '@/constants/api';
import { User } from '@/constants/user';
import { Permission } from '@/constants/role';
import AuthCredentials from '@/auth-credentials';
import { SessionData } from '@/constants/session';

export const USE_GET_MY_SESSION_QUERY_KEY = [GET_MY_SESSION_API];
export default function useGetMySession(param?: { enabled?: boolean }) {
  return useQuery<SessionData>({
    enabled: param?.enabled,
    queryKey: [GET_MY_SESSION_API],
    queryFn: async () => {
      const currentCredentials = AuthCredentials.get();
      if (!currentCredentials) {
        return {
          isLoggedIn: false,
        };
      }
      const response = await DefaultInternalFetcher.fetch<APIResponse<{ user: User; permissions: Permission[] }>>({
        method: GET_MY_SESSION_API.METHOD,
        path: GET_MY_SESSION_API.PATH,
      });
      if (!response.success) {
        throw response;
      }
      return {
        isLoggedIn: true,
        loginMethod: currentCredentials.loginMethod,
        user: response.user,
        permissions: response.permissions,
      };
    },
    retry: false,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
}
