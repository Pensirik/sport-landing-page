/* eslint-disable class-methods-use-this */
import { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';
import { detectResourcesSync, Resource } from '@opentelemetry/resources';
import {
  context, trace, Context, Span, SpanOptions, propagation,
} from '@opentelemetry/api';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import {
  ConsoleSpanExporter,
  AlwaysOnSampler,
  WebTracerProvider,
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-web';
import { browserDetector } from '@opentelemetry/opentelemetry-browser-detector';

import publicConfig from '@/config/public';
import { SpanAttributeKey, SpanName } from '@/constants/tracing';
import SessionId from '@/session-id';

// Disable the ZoneContextManager for now due to unexpected issues.

class _FrontendTracing {
  private _resource?: Resource;

  private _isInitialized: boolean;

  private _sessionId?: string;

  constructor() {
    this._isInitialized = false;
  }

  get isClient() {
    return typeof window !== 'undefined';
  }

  get isInitialized() {
    return this._isInitialized;
  }

  get tracer() {
    return trace.getTracer(publicConfig.tracerName);
  }

  get trace() {
    return trace;
  }

  get context() {
    return context;
  }

  get propagation() {
    return propagation;
  }

  /**
   * Gets the detected and merged resources for tracing.
   *
   * @returns The resource associated with this tracer provider, or `undefined` if tracing has not yet been initialized.
   */
  get resource() {
    return this._resource;
  }

  async initialize() {
    if (this._isInitialized || !this.isClient) return this;
    this._isInitialized = true;
    // const { ZoneContextManager } = await import('@opentelemetry/context-zone');
    const detectedResources = detectResourcesSync({
      detectors: [
        browserDetector,
        // you can add more detector here below
      ],
    });
    const resource = Resource.default()
      .merge(detectedResources)
      .merge(
        new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: publicConfig.appName,
        }),
      );
    const provider = new WebTracerProvider({
      resource,
      sampler: new AlwaysOnSampler(),
    });

    const exporter = publicConfig.env === 'local'
      ? new ConsoleSpanExporter()
      : new OTLPTraceExporter({
        url: `${publicConfig.tracingApiProtocol}://${publicConfig.tracingApiDomain}${publicConfig.tracingApiBasePath}/traces`,
      });
    provider.addSpanProcessor(
      new BatchSpanProcessor(
        exporter,
        publicConfig.tracingSpanProcessorConfiguration,
      ),
    );
    provider.register({
      // contextManager: new ZoneContextManager(),
      propagator: new CompositePropagator({
        propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
      }),
    });
    this._resource = resource;
    this._sessionId = SessionId.value;
    return this;
  }

  // eslint-disable-next-line space-before-function-paren
  startActiveSpan<T extends ((span: Span) => unknown)>(params: {
    name: SpanName;
    options?: SpanOptions;
    context?: Context,
    callback: T,
  }) {
    return this.tracer.startActiveSpan(
      params.name,
      params.options ?? {},
      ...(params.context ? [params.context] : []) as [Context],
      (span) => {
        if (this._resource) span.setAttributes(this._resource.attributes);
        if (this._sessionId) span.setAttribute(SpanAttributeKey.SESSION_ID, this._sessionId);
        return params.callback(span) as ReturnType<T>;
      },
    );
  }

  startSpan(params: { name: SpanName; options?: SpanOptions; context?: Context }) {
    const span = this.tracer.startSpan(
      params.name,
      params.options ?? {},
      ...(params.context ? [params.context] : []) as [Context],
    );
    if (this._resource) span.setAttributes(this._resource.attributes);
    if (this._sessionId) span.setAttribute(SpanAttributeKey.SESSION_ID, this._sessionId);
    return span;
  }
}

const FrontendTracing = new _FrontendTracing();
export default FrontendTracing;
