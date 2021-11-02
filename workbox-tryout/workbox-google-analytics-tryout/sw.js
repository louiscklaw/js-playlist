importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

workbox.loadModule("workbox-strategies");

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "image-cache",
    plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 2 })],
  })
);

workbox.googleAnalytics.initialize({
  hitFilter: (params) => {
    const queueTimeInSeconds = Math.round(params.get("qt") / 1000);
    params.set("cm1", queueTimeInSeconds);
  },
});
