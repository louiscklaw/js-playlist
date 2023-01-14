importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.loadModule('workbox-routing')
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-cacheable-response')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-recipes')

const cacheName = 'static-resources'
const matchCallback = ({ request }) =>
  // image
  request.destination === 'image' ||
  // CSS
  request.destination === 'style' ||
  // JavaScript
  request.destination === 'script' ||
  // Web Workers
  request.destination === 'worker'

workbox.routing.registerRoute(
  matchCallback,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)
