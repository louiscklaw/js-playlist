const { default: fetch, Headers } = require("node-fetch-cjs");

(async () => {
  await fetch("http://localhost:3000/socket.io/?EIO=3&transport=polling&t=Ob4AVBw&sid=T__qG9NF63MEbwglAAAA", {
    "credentials": "include",
    "headers": {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-type": "text/plain;charset=UTF-8",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "Pragma": "no-cache",
      "Cache-Control": "no-cache"
    },
    "referrer": "http://localhost:3000/images",
    "body": "34:42[\"pull\",\"fedora:latest\",868,448]",
    "method": "POST",
    "mode": "cors"
  }).then(res => {
    console.log(res);
  })
})()
