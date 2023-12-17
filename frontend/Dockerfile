FROM node:19-alpine

WORKDIR /app

COPY package*.json /app/package.json

RUN npm install

COPY public/ /app/public
COPY src/ /app/src
COPY .env /app/.env

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=0 /app/build .
COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
