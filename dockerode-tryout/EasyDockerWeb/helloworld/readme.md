# README

### prepare custom docker image
```bash
$ cd test_docker_image

$ docker build . -t custom_image
```


### develop
```bash

$ sudo chmod o+w /var/run/docker.sock

$ cd src

# dev.sh
$ docker run -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $PWD:/app \
  -w /app \
  -u 1000:1000 \
  -p 3000:3000 \
  --rm \
  node:lts bash

# in the docker
$ yarn
$ yarn start

# browse localhost:3000
```

### test REST
```bash
$ cd test_client

$ node ./createContainerByJson.js
```


### production
```bash
$ docker run -it -d \
  -p 3000:3000 \
  -e EDW_USERNAME='admin' \
  -e EDW_PASSWORD='admin' \
  -v /var/run/docker.sock:/var/run/docker.sock \
  qfdk/easydockerweb
```