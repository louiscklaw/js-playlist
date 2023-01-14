importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.loadModule('workbox-routing')
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-cacheable-response')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-recipes')
workbox.loadModule('workbox-expiration')

const cacheName = 'images'
const matchCallback = ({ request }) => request.destination === 'image'
const maxAgeSeconds = 30 * 24 * 60 * 60
const maxEntries = 60

workbox.routing.registerRoute(
  matchCallback,
  new workbox.strategies.CacheFirst({
    cacheName,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries,
        maxAgeSeconds,
      }),
    ],
  }),
)
