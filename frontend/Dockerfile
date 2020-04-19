FROM node:13-alpine as builder

ENV NODE_ENV build

USER root
WORKDIR /home/node

# Install node_modules first, so cache is faster
COPY package.json .
RUN yarn install

# Now do the actual biuld
COPY . /home/node
RUN yarn build

# ---

FROM node:13-alpine as development

ENV NODE_ENV development

USER node
WORKDIR /home/node

COPY --from=builder /home/node /home/node

CMD ["yarn", "serve"]
