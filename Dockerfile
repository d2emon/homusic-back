FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ts*.json ./
COPY config ./config
COPY src ./src

RUN mkdir ./data
RUN mkdir ./data/artists
RUN mkdir ./data/wiki

COPY data/artists ./data/artists
COPY data/db ./data/db

ENV NODE_PATH ./src
ENV DEBUG home-server

EXPOSE 3000

CMD ["npm", "start"]
