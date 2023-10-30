'use client';

'use client';

import { useEffect } from 'react';
import { SpanStatusCode } from '@opentelemetry/api';
import FrontendTracing from '@/tracing';
import { SpanAttributeKey, SpanName } from '@/constants/tracing';
import { safeJsonStringify } from '@/utils/json-stringify';

export default function GlobalError({
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
    <html lang="en">
      <body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0, padding: 0 }}>
        <h2>Something went wrong!</h2>
        <button
          type="button"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
