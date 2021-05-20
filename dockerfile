# base node image
FROM node:lts-alpine

# create app directory
WORKDIR /usr/src/app

ENV PORT=8080
ENV HOST=0.0.0.0

# copy application dependency manifests to the container image
COPY package*.json ./

# install production dependencies
RUN npm ci --only=production

# copy local code to the container image
COPY . ./

# make the container port accessible externally
EXPOSE 8080

# run the web service on container startup
CMD [ "node", "index.js" ]