FROM node:16-alpine

WORKDIR /usr/src/app

COPY products/package.json .
RUN npm install 
COPY products/ .

EXPOSE 3000

CMD ["node", "index.js"]
