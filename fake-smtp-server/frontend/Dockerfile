# Compile the frontend react app
FROM node:latest AS frontendbuilder

WORKDIR /home/node/app
COPY ./app/package.json .

## Need the development tools too.
RUN npm install
RUN npm install -g @vue/cli

COPY ./app .

# In production the .env.production will apply and the console.log will be removed.
ENV NODE_ENV=production

RUN npm run build

# Create the frontend container with Nginx
FROM nginx:stable-alpine

# To do health check
RUN apk add --update netcat-openbsd && rm -rf /var/cache/apk/*

COPY --from=frontendbuilder /home/node/app/dist /usr/share/nginx/html/
COPY ./nginx/nginx.template /etc/nginx/conf.d/nginx.template
COPY ./nginx/certs/* /etc/nginx/certs/

EXPOSE 80
EXPOSE 443

CMD envsubst '${SERVER_NAME}' < /etc/nginx/conf.d/nginx.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
