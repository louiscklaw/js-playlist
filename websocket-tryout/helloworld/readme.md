# README

### test setup for ws (websocket)

```bash
$ docker build . -t custom_image

# start docker container
$ docker run -it --rm \
  -p 3000:3000 \
  custom_image bash

# inside container
$ npm run start


# on host,
npx wscat -c ws://localhost:3000
```
