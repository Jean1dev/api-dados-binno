FROM nikolaik/python-nodejs:latest

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

RUN npm run build
ENV PORT 8082
ENV URL DOCKER
ENV HOST_DB 192.168.2.100
EXPOSE $PORT
CMD [ "npm", "start" ]
