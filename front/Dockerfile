FROM node:alpine as build-step

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN yarn install

COPY . ./

RUN yarn run build


FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]