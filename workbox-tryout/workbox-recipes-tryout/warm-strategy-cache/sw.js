importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

workbox.loadModule("workbox-routing");
workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-cacheable-response");
workbox.loadModule("workbox-expiration");
workbox.loadModule("workbox-recipes");

// This can be any strategy, CacheFirst used as an example.
const strategy = new workbox.strategies.CacheFirst();
const urls = ["offline.html"];

self.addEventListener("install", (event) => {
  // handleAll returns two promises, the second resolves after all items have been added to cache.
  const done = urls.map(
    (path) =>
      strategy.handleAll({
        event,
        request: new Request(path),
      })[1]
  );

  event.waitUntil(Promise.all(done));
});
