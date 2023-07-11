// NOTE: createContainerByJson
// same as createContainer by json format in content

const { default: fetch, Headers } = require("node-fetch-cjs");

// NOTE: create new container when user request
// NOTE:
// 1. web site receive call (demo page)
// 2. web site check if sub-domain-name requested is exist already
//  if exist -> reject request
//  if not exist -> move on
// 3. web site forward request with sub-domain-name
//    to docker endpoint (EasyDockerWeb -> createNewClient)

// NOTE:
// currently the things below should be called by
// web site (my web server, trusted, not user web browser)
// the body part means the configuration of the docker container

// REFERENCES:
// /js-playlist/dockerode-tryout/helloworld-traefik-tryout/src/create_container.js

(async () => {
  await fetch("http://localhost:3000/containers/createNewClient", {
    "headers": { "Content-Type": "application/json", },
    "referrer": "http://localhost:3000/containers",
    "body": JSON.stringify({
      "containerName": "user-requested-subdomain-name-app-1",
    }),
    "method": "POST",
    "mode": "cors"
  }).then(res => res.json())
    .then(res_json => console.log(res_json))
})()
