FROM node:19-alpine as build

WORKDIR /app

COPY package*.json /app

RUN npm install --silent

COPY public/ /app/public

COPY src/ /app/src

COPY nginx.conf /app/nginx.conf

COPY .env /app/.env

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD nginx -g "daemon off;"
