const fetch = require('node-fetch');

console.log('hello teacher api test');

(async () => {
  fetch('http://localhost:3000/v1/teachers/helloworld')
    .then((res) => res.text())
    .then((text) => console.log(text));
})();
