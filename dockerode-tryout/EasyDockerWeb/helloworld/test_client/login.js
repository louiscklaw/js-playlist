const { default: fetch, Headers } = require("node-fetch-cjs");

(async () => {
  await fetch("http://localhost:3000/", {
    "credentials": "include",
    "headers": {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Pragma": "no-cache",
      "Cache-Control": "no-cache"
    },
    "referrer": "http://localhost:3000/",
    "body": "username=admin&password=admin",
    "method": "POST",
    "mode": "cors"
  }).then(res => {
    console.log(res)
  })

})()