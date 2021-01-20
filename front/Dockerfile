FROM node:alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . ./

RUN yarn build


FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]