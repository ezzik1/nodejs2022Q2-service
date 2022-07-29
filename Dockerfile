FROM node:16.16-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]




