FROM node:13-alpine AS build
WORKDIR /home/node

# Install node_modules first, so layer cache is faster unless they change
COPY package.json yarn.lock ./
RUN yarn install

# Now do the actual build
COPY . /home/node
ENV NODE_ENV production
RUN yarn build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /home/node/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]