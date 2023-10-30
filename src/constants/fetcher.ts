import { APIResponse, ExternalAPIResponse } from './api';

interface BaseMethodParams {
  path: string;
  headers?: Record<'contentType' | string, string>;
  credentials?: RequestCredentials;
}
interface GetMethodParams extends BaseMethodParams {
  method: 'GET';
}
interface PostMethodParams extends BaseMethodParams {
  method: 'POST';
  body?: Record<string, unknown>;
}
interface PutMethodParams extends BaseMethodParams {
  method: 'PUT';
  body?: Record<string, unknown>;
}
interface PatchMethodParams extends BaseMethodParams {
  method: 'PATCH';
  body?: Record<string, unknown>;
}
interface DeleteMethodParams extends BaseMethodParams {
  method: 'DELETE';
  body?: Record<string, unknown>;
}
export type FetchParams = GetMethodParams | PostMethodParams | PutMethodParams | PatchMethodParams | DeleteMethodParams;
// eslint-disable-next-line no-shadow
export enum FetcherType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}
export type FetcherOptions = {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  prefixPath?: string;
};
export type FetcherAPIResponse<Type extends FetcherType> = Type extends FetcherType.INTERNAL ? APIResponse : ExternalAPIResponse;
