import { FetcherType } from '@/constants/fetcher';

export type ApiRequestMetadata = ({
  TYPE: FetcherType.INTERNAL;
} | {
  TYPE: FetcherType.EXTERNAL;
  BASE_URL: string;
}) & {
  METHOD: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  PATH: string;
};
