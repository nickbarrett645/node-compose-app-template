#syntax=docker/dockerfile:1
FROM node:16.13.2-alpine3.15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
EXPOSE $PORT
CMD ["npm", "run", "dev"]
