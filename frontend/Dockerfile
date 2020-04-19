FROM node:13-alpine

ENV NODE_ENV build

USER node
WORKDIR /home/node

# Install node_modules first, so layer cache is faster unless they change
COPY package.json yarn.lock ./
RUN yarn install

# Now do the actual build
COPY . /home/node
RUN yarn build

CMD ["yarn", "serve"]
