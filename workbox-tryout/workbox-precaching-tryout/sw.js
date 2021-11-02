importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

workbox.loadModule("workbox-strategies");

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1" },
  { url: "test-file.txt", revision: "1" },
  "hello-world.1234.txt",
  "image/HelloWorld.svg",
]);
