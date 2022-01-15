#syntax=docker/dockerfile:1
FROM node:16.13.2-alpine3.15
WORKDIR /code
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
