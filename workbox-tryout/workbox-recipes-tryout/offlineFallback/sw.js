importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.loadModule('workbox-routing')
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-cacheable-response')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-recipes')

const pageFallback = 'offline.html'
const imageFallback = false
const fontFallback = false

workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly())

self.addEventListener('install', event => {
  const files = [pageFallback]
  if (imageFallback) {
    files.push(imageFallback)
  }
  if (fontFallback) {
    files.push(fontFallback)
  }

  event.waitUntil(self.caches.open('workbox-offline-fallbacks').then(cache => cache.addAll(files)))
})

const handler = async options => {
  const dest = options.request.destination
  const cache = await self.caches.open('workbox-offline-fallbacks')

  if (dest === 'document') {
    return (await cache.match(pageFallback)) || Response.error()
  }

  if (dest === 'image' && imageFallback !== false) {
    return (await cache.match(imageFallback)) || Response.error()
  }

  if (dest === 'font' && fontFallback !== false) {
    return (await cache.match(fontFallback)) || Response.error()
  }

  return Response.error()
}

workbox.routing.setCatchHandler(handler)
