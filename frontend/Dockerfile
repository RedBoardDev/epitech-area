FROM node:19-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY public/ /app/public
COPY src/ /app/src
COPY .env /app/.env

RUN npm install -g serve
CMD npm run build && npx serve -s build -l 80
