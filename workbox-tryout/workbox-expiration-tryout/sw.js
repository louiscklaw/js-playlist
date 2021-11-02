importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-expiration");

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst({
    cacheName: "image-cache",
    plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 2 })],
  })
);
