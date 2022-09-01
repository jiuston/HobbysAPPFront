FROM nginx:stable-alpine
COPY ./dist/personalhobbysapp /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf