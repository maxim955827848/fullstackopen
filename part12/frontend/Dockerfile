FROM node:20-alpine AS build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY . .
USER node
CMD ["node", "server.js"]
