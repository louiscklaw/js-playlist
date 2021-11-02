importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

workbox.setConfig({
  debug: true,
});

workbox.loadModule("workbox-strategies");
// Note: Ignore the error that Glitch raises about workbox being undefined.

workbox.routing.registerRoute(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HelloWorld.svg/2560px-HelloWorld.svg.png",
  new workbox.strategies.StaleWhileRevalidate()
);
