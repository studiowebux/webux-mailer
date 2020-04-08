# Install the node modules
FROM node:lts-stretch-slim AS backendbuilder

WORKDIR /usr/src/app
COPY ./package.json .

RUN npm install --production

# create the container to host the backend.
FROM node:lts-stretch-slim

WORKDIR /usr/src/app
RUN apt update && apt install -y curl --no-install-recommends && apt clean && apt autoclean

COPY --from=backendbuilder /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 3030
EXPOSE 2525
CMD [ "npm", "start" ]

