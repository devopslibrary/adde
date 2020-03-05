# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 12 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
# 
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:13-alpine as builder

ENV NODE_ENV build

USER root

WORKDIR /home/node

COPY . /home/node

RUN yarn install \
  && yarn build

# ---

FROM node:13-alpine

RUN apk --update add git less openssh && \
  rm -rf /var/lib/apt/lists/* && \
  rm /var/cache/apk/*

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/node_modules/ /home/node/node_modules
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["node", "dist/src/main"]
