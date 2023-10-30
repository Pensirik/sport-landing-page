import { FetcherType } from '@/constants/fetcher';
import Fetcher from '@/fetcher';

export const DefaultInternalFetcher = new Fetcher(FetcherType.INTERNAL, {
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});
