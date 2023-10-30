'use client';

import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { SpanStatusCode } from '@opentelemetry/api';
import FrontendTracing from '@/tracing';
import { SpanAttributeKey, SpanName } from '@/constants/tracing';
import SessionId from '@/session-id';

const AppTracing: React.FC<PropsWithChildren> = (props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitializedRef = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const onRouteChanged = useCallback(() => {
    FrontendTracing
      .startSpan({ name: SpanName.ROUTE_CHANGED })
      .setAttributes({
        [SpanAttributeKey.ROUTE_PATH]: pathname,
        [SpanAttributeKey.ROUTE_SEARCH_PARAMS]: [...searchParams.keys()].map(key => `${key}=${searchParams.get(key)}`).join(', '),
      })
      .setStatus({ code: SpanStatusCode.OK })
      .end();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    setIsInitialized(true);
    SessionId.initialize();
    FrontendTracing
      .initialize()
      .then(tracing => {
        tracing
          .startSpan({ name: SpanName.INITIALIZE_APP_TRACING })
          .end();
      });
  }, []);

  useEffect(() => {
    onRouteChanged();
  }, [pathname, searchParams]);

  if (!isInitialized) return null;

  return <>{props.children}</>;
};

export default AppTracing;
