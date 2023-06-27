#!/usr/bin/env bash

set -ex

# docker compose kill documentation
# docker compose rm -f documentation
# docker compose up -d --build documentation

# docker compose exec -it documentation sh
# docker ps -a

docker compose logs -f documentation
