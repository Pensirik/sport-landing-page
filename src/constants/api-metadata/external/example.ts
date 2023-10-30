// TODO: remove this file
import { FetcherType } from '@/constants/fetcher';
import { ApiRequestMetadata } from '../type';

export const CHUNK_NORRIS_GET_JOKES_API: ApiRequestMetadata = {
  TYPE: FetcherType.EXTERNAL,
  METHOD: 'GET',
  BASE_URL: 'https://api.chucknorris.io',
  PATH: '/jokes/random',
};
