FROM node:16-alpine

WORKDIR /usr/src/app

COPY review/package.json .
RUN npm install 
COPY review/ .

EXPOSE 3002

CMD ["node", "server.js"]