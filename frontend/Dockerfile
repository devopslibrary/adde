FROM alpine:latest
LABEL org.opencontainers.image.source https://github.com/devopslibrary/adde

# Add nginx and nodejs
RUN apk add --update nginx nodejs nodejs-npm yarn bash gettext

# Create the directories we will need
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

# Copy the respective nginx configuration files
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# Install node_modules first, so layer cache is faster unless they change
WORKDIR /home/node
COPY package.json yarn.lock ./
RUN yarn install

# Now do the actual build
COPY . /home/node
ENV NODE_ENV production
RUN yarn build

# production environment
RUN cp -Rf /home/node/dist/* /var/www/html && chown nginx:nginx /var/www/html
COPY entrypoint.sh /
EXPOSE 80
CMD ["/entrypoint.sh"]
