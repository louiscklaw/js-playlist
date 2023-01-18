# CREDIT: https://github.com/shren207/nextjs-docker-compose
# Dockerfile
FROM node:14-buster

RUN apt update -qyy && \
  apt install -qyy entr wget curl

RUN mkdir -p /app/node_modules
RUN chown node:node -R /app

WORKDIR /app
