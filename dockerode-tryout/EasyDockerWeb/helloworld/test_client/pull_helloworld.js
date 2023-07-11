const { default: fetch, Headers } = require("node-fetch-cjs");

const data = {
  imageName: 'fedora',
};


(async () => {
  await fetch("http://localhost:3000/images/helloworld", {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    method: "POST",
    mode: "cors"
  })
    .then(res => {
      console.log(res);
    })
})()
