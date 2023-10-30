module.exports = {
  appName: 'oci-nextjs-template', // TODO: change this
  tracerName: 'oci-nextjs-tracer', // TODO: change this
  appPort: 3000,
  apiProtocol: 'https',
  apiDomain: 'CHANGE_THIS', // TODO: change this
  apiBasePath: '/api/v1',
  tracingApiProtocol: 'https',
  tracingApiDomain: 'CHANGE_THIS', // TODO: change this
  tracingApiBasePath: '/tracing/v1',
  nextApiBasePath: '/_api',
  tracingSpanProcessorConfiguration: {
    scheduledDelayMillis: 5000,
  },
  session: {
    idLength: 24,
  },
};
