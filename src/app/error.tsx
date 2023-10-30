'use client';

import { useEffect } from 'react';
import { SpanStatusCode } from '@opentelemetry/api';
import FrontendTracing from '@/tracing';
import { SpanAttributeKey, SpanName } from '@/constants/tracing';
import { safeJsonStringify } from '@/utils/json-stringify';

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    const span = FrontendTracing.startSpan({ name: SpanName.CATCH_ERROR });
    span.recordException(error);
    span.setAttribute(SpanAttributeKey.ERROR_INFO, safeJsonStringify(error) ?? 'No error info');
    span.setStatus({ code: SpanStatusCode.ERROR });
    span.end();
  }, [error]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <h2>Something went wrong!</h2>
      <button
        type="button"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
