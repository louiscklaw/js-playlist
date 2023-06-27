# FROM node:alpine
FROM node:20-bullseye-slim

RUN apt update && \
  apt install -qyy curl wget git &&\
  apt clean

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
