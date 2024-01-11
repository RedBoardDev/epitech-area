FROM node:19-alpine as build

WORKDIR /app

COPY package*.json /app

RUN npm install --silent

ARG REACT_APP_API_URL
ARG REACT_APP_GITHUB_CLIENT_ID
ARG REACT_APP_PUBLIC_URL

COPY public/ /app/public

COPY src/ /app/src

COPY nginx.conf /app/nginx.conf

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD cp /output/client.apk /usr/share/nginx/html && nginx -g "daemon off;"
