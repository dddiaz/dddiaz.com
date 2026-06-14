// Report real-user Core Web Vitals (LCP, CLS, INP) to GA4.
// Loaded production-only alongside the gtag snippet; bails out safely otherwise.
(function () {
  if (typeof webVitals === 'undefined' || typeof window.gtag !== 'function') return;

  function send(metric) {
    window.gtag('event', metric.name, {
      // GA4 event values are integers; CLS is unitless so scale by 1000.
      value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: metric.rating, // good | needs-improvement | poor
      non_interaction: true,
    });
  }

  webVitals.onCLS(send);
  webVitals.onINP(send);
  webVitals.onLCP(send);
})();
