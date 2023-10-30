import { SemanticAttributes } from '@opentelemetry/semantic-conventions';

// eslint-disable-next-line no-shadow
export enum SpanName {
  INITIALIZE_APP_TRACING = 'INITIALIZE_APP_TRACING',
  ROUTE_CHANGED = 'ROUTE_CHANGED',
  CATCH_ERROR = 'CATCH_ERROR',
  FETCH_INTERNAL_API = 'FETCH_INTERNAL_API',
  FETCH_EXTERNAL_API = 'FETCH_EXTERNAL_API'
}

export const SpanAttributeKey = {
  SESSION_ID: 'custom.session_id',
  ERROR_INFO: 'custom.error_info',
  ROUTE_PATH: 'custom.route.path',
  ROUTE_SEARCH_PARAMS: 'custom.route.search_params',
  ROUTE_SHALLOW: 'custom.route.shallow',
  ROUTE_ERROR_INFO: 'custom.route.error_info',
  ERROR_CODE: 'custom.error_code',
  HTTP_REQUEST_HEADER_CONTENT_TYPE: 'http.request.header.content_type',
  HTTP_RESPONSE_HEADER_CONTENT_TYPE: 'http.response.header.content_type',
  ...SemanticAttributes,
};

export const SpanEventName = {
  FETCH_API: {
    INIT: 'INIT',
    RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
    RESPONSE_ERROR: 'RESPONSE_ERROR',
  },
  REFRESH_TOKEN: {
    INIT: 'INIT',
    RESPONSE_SUCCESS: 'RESPONSE_SUCCESS',
    RESPONSE_ERROR: 'RESPONSE_ERROR',
  },
};
