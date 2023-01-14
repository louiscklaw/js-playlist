importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.setConfig({ debug: true })

// workbox.loadModule("workbox-strategies");
const { strategies } = workbox

// Note: Ignore the error that Glitch raises about workbox being undefined.

workbox.routing.registerRoute(/.*.png$/, new strategies.StaleWhileRevalidate())
