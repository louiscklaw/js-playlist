importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

console.log('Hello from service-worker.js');

workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-routing');
workbox.loadModule('workbox-cacheable-response');
workbox.loadModule('workbox-range-requests');

// In your service worker:
// It's up to you to either precache, use warmRuntimeCache, or
// explicitly call cache.add() to populate the cache with media assets.
// If you choose to cache media assets up front, do so with care,
// as they can be quite large and exceed storage quotas.
//
// This route will go to the network if there isn't a cache match,
// but it won't populate the cache at runtime because the response for
// the media asset will be a partial 206 response. If there is a cache
// match, then it will properly serve partial responses.
workbox.routing.registerRoute(
  ({ request }) => {
    const { destination } = request;

    return destination === 'video' || destination === 'audio';
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'your-cache-name-here',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.rangeRequests.RangeRequestsPlugin(),
    ],
  })
);
