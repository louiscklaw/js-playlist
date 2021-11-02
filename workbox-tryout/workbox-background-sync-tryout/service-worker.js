importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

workbox.setConfig({ debug: true });

workbox.loadModule("workbox-strategies");
workbox.loadModule("workbox-background-sync");

console.log("workbox", workbox);

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
  "myQueueName"
);

workbox.routing.registerRoute(
  /.*.png$/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  })
);

workbox.core.skipWaiting();
workbox.core.clientsClaim();
