FROM node:13-alpine as builder

ENV NODE_ENV build

USER root
WORKDIR /home/node

COPY . /home/node

RUN yarn install \
  && yarn build

# ---

FROM node:13-alpine as development

ENV NODE_ENV development

USER node
WORKDIR /home/node

COPY --from=builder /home/node /home/node

CMD ["yarn", "serve"]
