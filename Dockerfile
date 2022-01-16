#syntax=docker/dockerfile:1
FROM node:16.13.2-alpine3.15
WORKDIR /code
COPY package*.json ./
RUN npm install
COPY ./src .
EXPOSE 3000
CMD ["npm", "run", "start"]
