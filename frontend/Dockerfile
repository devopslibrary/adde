FROM node:13-alpine AS build
ENV NODE_ENV production
WORKDIR /home/node

# Install node_modules first, so layer cache is faster unless they change
COPY package.json yarn.lock ./
RUN yarn install
RUN npm install -g @vue/cli

# Now do the actual build
COPY . /home/node
RUN yarn build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /home/node/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]