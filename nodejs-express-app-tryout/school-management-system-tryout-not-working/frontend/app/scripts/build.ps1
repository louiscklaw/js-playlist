yarn build-export

pushd out
  npx http-server -p 8080 .