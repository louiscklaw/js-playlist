importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.loadModule('workbox-routing')
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-cacheable-response')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-recipes')

const cacheName = 'pages'
const matchCallback = ({ request }) => request.mode === 'navigate'
const networkTimeoutSeconds = 3

workbox.routing.registerRoute(
  matchCallback,
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds,
    cacheName,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)
