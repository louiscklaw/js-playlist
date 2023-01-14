importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.loadModule('workbox-strategies')

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 2 })],
  }),
)

// Enable navigation preload.
workbox.navigationPreload.enable()

// Swap in NetworkOnly, CacheFirst, or StaleWhileRevalidate as needed.
const strategy = new workbox.strategies.NetworkFirst({
  cacheName: 'cached-navigations',
  plugins: [
    // Any plugins, like workbox.expiration, etc.
  ],
})

const navigationRoute = new workbox.routing.NavigationRoute(strategy, {
  // Optionally, provide a allowlist/denylist of RegExps to determine
  // which paths will match this route.
  // allowlist: [],
  // denylist: [],
})

workbox.routing.registerRoute(navigationRoute)

workbox.core.skipWaiting()
workbox.core.clientsClaim()
