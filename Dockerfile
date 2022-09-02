FROM node:14.15.0-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install --legacy-peer-deps

COPY . /app

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build-step /app/dist/personalhobbysapp /usr/share/nginx/html
