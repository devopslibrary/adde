#!/bin/sh

# Replace env vars in JavaScript files
echo "Replacing env vars in JS"
for file in /var/www/html/js/app.*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst '$VUE_APP_CLIENT_ID,$VUE_APP_REDIRECT_URI,$VUE_APP_BACKEND_HOST' < $file.tmpl.js > $file
done

echo "Starting Nginx"
nginx -g 'daemon off;'
