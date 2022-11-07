FROM node:16-alpine
WORKDIR /usr/gombank/app
COPY ./package.json ./
RUN apk update
RUN npm install
COPY ./ .
RUN npm run build
CMD npm run start
