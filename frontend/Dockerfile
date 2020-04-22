FROM nginx:1.17.10-alpine
WORKDIR /home/node
RUN apk add --update nodejs nodejs-npm yarn bash

# Install node_modules first, so layer cache is faster unless they change
COPY package.json yarn.lock ./
RUN yarn install

# Now do the actual build
COPY . /home/node
ENV NODE_ENV production
RUN yarn build

# production environment
RUN ls /home/node/dist
RUN cp -Rf /home/node/dist/* /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]