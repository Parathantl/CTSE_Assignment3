FROM node:16-alpine

WORKDIR /usr/src/app

COPY checkout/package.json .
RUN npm install 
COPY checkout/ .

EXPOSE 3001

CMD ["node", "server.js"]
