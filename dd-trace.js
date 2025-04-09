import tracer from 'dd-trace';

// Enable Datadog tracing
tracer.init({
  logInjection: true, // optionally log trace IDs
  runtimeMetrics: true,
  analytics: true, // optional: enable automatic span analytics
  service: 'beatrice-cherono-foundation-ngo', // your service name in Datadog
});

export default tracer;
