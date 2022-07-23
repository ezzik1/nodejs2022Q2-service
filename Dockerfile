FROM node:16.16-alpine3.16

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]




