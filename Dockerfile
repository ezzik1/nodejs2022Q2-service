FROM node:16.16-alpine

WORKDIR /api

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . ./

RUN npx prisma generate

RUN npm run build

CMD [ "node", "dist/main" ]




