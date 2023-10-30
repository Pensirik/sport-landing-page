/* eslint-disable class-methods-use-this */
import { Span, SpanStatusCode } from '@opentelemetry/api';
import publicConfig from '@/config/public';
import serverOnlyConfig from '@/config/server-only';
import SessionId from '@/session-id';
import FrontendTracing from '@/tracing';
import AuthCredentials from '@/auth-credentials';
import { REFRESH_TOKEN_API, RefreshTokenAPIResponse } from '@/constants/api-metadata/internal/session';
import { ERROR_CODE, HeaderName } from '@/constants/api';
import { FetcherAPIResponse, FetcherOptions, FetcherType, FetchParams } from '@/constants/fetcher';
import { SpanAttributeKey, SpanEventName, SpanName } from '@/constants/tracing';

class Fetcher<Type extends FetcherType> {
  readonly type: Type;

  readonly options?: FetcherOptions;

  constructor(type: Type, options?: FetcherOptions) {
    this.type = type;
    this.options = options;
  }

  get isClient() {
    return typeof window !== 'undefined';
  }

  get baseUrl() {
    const apiProtocol = this.isClient ? publicConfig.apiProtocol : serverOnlyConfig.apiProtocol;
    const apiDomain = this.isClient ? publicConfig.apiDomain : serverOnlyConfig.apiDomain;
    const defaultBaseUrl = publicConfig.env === 'local'
      ? `${publicConfig.apiBasePath}` // It will be matched with redirection rule in next.config.js
      : `${apiProtocol}://${apiDomain}${publicConfig.apiBasePath}`;
    return `${this.options?.baseUrl ?? defaultBaseUrl}${this.options?.prefixPath ?? ''}`;
  }

  fetch<R extends FetcherAPIResponse<Type>>(params: FetchParams) {
    const result = FrontendTracing.startActiveSpan({
      name: {
        [FetcherType.INTERNAL]: SpanName.FETCH_INTERNAL_API,
        [FetcherType.EXTERNAL]: SpanName.FETCH_EXTERNAL_API,
      }[this.type],
      callback: async (span) => {
        span.setAttributes({
          [SpanAttributeKey.HTTP_METHOD]: params.method,
          ...(this.isClient
            ? { [SpanAttributeKey.HTTP_USER_AGENT]: window.navigator.userAgent }
            : {}),
          ...(params.headers?.contentType
            ? { [SpanAttributeKey.HTTP_REQUEST_HEADER_CONTENT_TYPE]: params.headers.contentType }
            : {}),
        });
        let initialHeaders: Record<string, string> = {
          ...this.options?.defaultHeaders,
        };
        let defaultRequestCredentials: RequestCredentials | undefined;
        if (this.type === FetcherType.INTERNAL) {
          const propagatedData: { traceparent?: string; tracestate?: string } = {};
          FrontendTracing.propagation.inject(FrontendTracing.context.active(), propagatedData);
          const authCreds = AuthCredentials.get();
          initialHeaders = {
            ...initialHeaders,
            ...propagatedData,
            ...(authCreds?.accessToken ? { Authorization: `Bearer ${authCreds.accessToken}` } : {}),
            ...(SessionId.value ? { [HeaderName.X_REQUEST_ID]: SessionId.value } : {}),
          };
          defaultRequestCredentials = 'include';
          if (authCreds) {
            span.setAttribute(SpanAttributeKey.ENDUSER_ID, authCreds.userId);
          }
        }
        span.addEvent(SpanEventName.FETCH_API.INIT);
        const nativeFetchParams: Parameters<typeof fetch> = [
          `${this.baseUrl}${params.path}`,
          {
            method: params.method,
            headers: {
              ...initialHeaders,
              ...params.headers,
            },
            credentials: params.credentials ?? defaultRequestCredentials,
            ...((params.method !== 'GET' && params.body) ? { body: JSON.stringify(params.body) } : {}),
          },
        ];
        const response = await fetch(...nativeFetchParams);
        const aggregatedResponse = await this.interceptor<R>({ response, span, nativeFetchParams });
        span.setStatus({ code: aggregatedResponse.success ? SpanStatusCode.OK : SpanStatusCode.ERROR });
        span.end();
        return aggregatedResponse;
      },
    });
    return result;
  }

  private async interceptor<R extends FetcherAPIResponse<Type>>(params: {
    response: Response;
    span: Span;
    nativeFetchParams: Parameters<typeof fetch>;
  }): Promise<R> {
    try {
      switch (this.type) {
        case FetcherType.INTERNAL: {
          let isError: boolean;
          let { response } = params;

          if (params.response.ok) {
            isError = false;
          } else if (params.response.status === 401) {
            // refresh token handling
            const authCreds = AuthCredentials.get();
            if (!authCreds) {
              isError = true;
            } else {
              params.span.addEvent(SpanEventName.REFRESH_TOKEN.INIT);
              const propagatedData: { traceparent?: string; tracestate?: string } = {};
              FrontendTracing.propagation.inject(FrontendTracing.context.active(), propagatedData);
              const refreshTokenResponse = await fetch(
                `${this.baseUrl}${REFRESH_TOKEN_API.PATH}`,
                {
                  method: REFRESH_TOKEN_API.METHOD,
                  headers: {
                    ...propagatedData,
                    ...(SessionId.value ? { [HeaderName.X_REQUEST_ID]: SessionId.value } : {}),
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    refresh_token: authCreds.refreshToken,
                  }),
                },
              );
              const refreshTokenResponseJson = await refreshTokenResponse.json() as RefreshTokenAPIResponse;
              if (!refreshTokenResponse.ok || !refreshTokenResponseJson.success) {
                isError = true;
                params.span.addEvent(SpanEventName.REFRESH_TOKEN.RESPONSE_ERROR, {
                  [SpanAttributeKey.ERROR_CODE]: !refreshTokenResponseJson.success ? refreshTokenResponseJson.error_code : ERROR_CODE._FRONTEND_UNKNOWN_ERROR,
                  [SpanAttributeKey.ERROR_INFO]: refreshTokenResponse.statusText,
                });
                if (!refreshTokenResponseJson.success && refreshTokenResponseJson.error_code === ERROR_CODE.FAILED_TO_VERIFY_TOKEN) AuthCredentials.remove();
              } else {
                AuthCredentials.set({
                  loginMethod: refreshTokenResponseJson.login_method,
                  userId: refreshTokenResponseJson.user_id,
                  accessToken: refreshTokenResponseJson.access_token,
                  refreshToken: refreshTokenResponseJson.refresh_token,
                });

                params.span.addEvent(SpanEventName.REFRESH_TOKEN.RESPONSE_SUCCESS);
                params.span.addEvent(SpanEventName.FETCH_API.INIT);
                response = await fetch(
                  params.nativeFetchParams[0],
                  {
                    ...(params.nativeFetchParams[1] ?? {}),
                    headers: {
                      ...params.nativeFetchParams[1]?.headers,
                      Authorization: `Bearer ${refreshTokenResponseJson.access_token}`,
                    },
                  },
                );
                isError = !response.ok;
              }
            }
          } else {
            isError = true;
          }

          const contentType = response.headers.get('content-type');

          params.span.setAttributes({
            [SpanAttributeKey.HTTP_URL]: params.response.url,
            [SpanAttributeKey.HTTP_STATUS_CODE]: response.status,
            ...(contentType ? { [SpanAttributeKey.HTTP_RESPONSE_HEADER_CONTENT_TYPE]: contentType } : {}),
          });

          // error cases handling
          if (isError) {
            const errorRes: FetcherAPIResponse<FetcherType.INTERNAL> = { success: false, error_code: ERROR_CODE._FRONTEND_UNKNOWN_ERROR };
            if (contentType?.includes('application/json')) {
              const resJson = await response.json();
              if (resJson.error_code) {
                errorRes.error_code = resJson.error_code ?? errorRes.error_code;
              }
            }
            params.span.addEvent(SpanEventName.FETCH_API.RESPONSE_ERROR, {
              [SpanAttributeKey.ERROR_CODE]: errorRes.error_code,
              [SpanAttributeKey.ERROR_INFO]: response.statusText,
            });
            return errorRes as R;
          }
          // success cases handling
          params.span.addEvent(SpanEventName.FETCH_API.RESPONSE_SUCCESS);
          if (contentType?.includes('application/json')) {
            const resJson = await response.json();
            return resJson as R;
          }
          return { success: true } as R;
        }
        case FetcherType.EXTERNAL: {
          const contentType = params.response.headers.get('content-type');

          params.span.setAttributes({
            [SpanAttributeKey.HTTP_URL]: params.response.url,
            [SpanAttributeKey.HTTP_STATUS_CODE]: params.response.status,
            ...(contentType ? { [SpanAttributeKey.HTTP_RESPONSE_HEADER_CONTENT_TYPE]: contentType } : {}),
          });

          // error cases handling
          if (!params.response.ok) {
            const errorRes: FetcherAPIResponse<FetcherType.EXTERNAL> = { success: false, error_text: params.response.statusText, data: undefined };
            if (contentType?.includes('application/json')) {
              const resJson = await params.response.json();
              errorRes.data = resJson;
            }
            params.span.addEvent(SpanEventName.FETCH_API.RESPONSE_ERROR, {
              [SpanAttributeKey.ERROR_INFO]: params.response.statusText,
            });
            return errorRes as R;
          }
          // success cases handling
          params.span.addEvent(SpanEventName.FETCH_API.RESPONSE_SUCCESS);
          if (contentType?.includes('application/json')) {
            const resJson = await params.response.json();
            return { success: true, data: resJson } as R;
          }
          return { success: true } as R;
        }
        default: throw new Error('Wrong fetcher type');
      }
    } catch (e: unknown) {
      // unknown error cases handling
      switch (this.type) {
        case FetcherType.INTERNAL: {
          params.span.addEvent(SpanEventName.FETCH_API.RESPONSE_ERROR, {
            [SpanAttributeKey.ERROR_CODE]: ERROR_CODE._FRONTEND_UNKNOWN_ERROR,
            [SpanAttributeKey.ERROR_INFO]: (e && typeof e === 'object') ? e.toString() : 'Unknown error',
          });
          return {
            success: false,
            error_code: ERROR_CODE._FRONTEND_UNKNOWN_ERROR,
          } as R;
        }
        case FetcherType.EXTERNAL: {
          params.span.addEvent(SpanEventName.FETCH_API.RESPONSE_ERROR, {
            [SpanAttributeKey.ERROR_INFO]: (e && typeof e === 'object') ? e.toString() : 'Unknown error',
          });
          return {
            success: false,
            error_text: 'Unknown error',
          } as R;
        }
        default: throw new Error('Unexpected error');
      }
    }
  }
}

export default Fetcher;
