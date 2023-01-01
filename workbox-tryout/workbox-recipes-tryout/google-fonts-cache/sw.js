importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-routing');
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-cacheable-response');
workbox.loadModule('workbox-expiration');
workbox.loadModule('workbox-recipes');

const sheetCacheName = 'google-fonts-stylesheets';
const fontCacheName = 'google-fonts-webfonts';
const maxAgeSeconds = 60 * 60 * 24 * 365;
const maxEntries = 30;

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: sheetCacheName,
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new workbox.strategies.CacheFirst({
    cacheName: fontCacheName,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds,
        maxEntries,
      }),
    ],
  })
);
