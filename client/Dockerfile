# configure node and setup working dir
FROM node:8 as react-build
WORKDIR /
COPY . ./
RUN yarn
RUN yarn build

# serve build through nginx
FROM nginx:alpine
COPY /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html
EXPOSE 80
CMD /usr/sbin/nginx -g "daemon off;"
