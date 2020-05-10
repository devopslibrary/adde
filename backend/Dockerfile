FROM alpine:latest
ENV NODE_ENV build

RUN apk --update add git less openssh nodejs nodejs-npm bash yarn && \
  rm -rf /var/lib/apt/lists/* && \
  rm /var/cache/apk/*

WORKDIR /home/node

# Install node_modules first, so layer cache is faster unless they change
COPY package.json yarn.lock ./
RUN yarn install

# Set Git Config
RUN git config --global user.email bot@adde.to && git config --global user.name "ADDE"

# Now do the actual build
COPY . /home/node
RUN yarn build

ENV NODE_ENV production

CMD ["node", "dist/main"]
