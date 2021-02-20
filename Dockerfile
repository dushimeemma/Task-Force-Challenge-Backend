FROM node:10-slim

WORKDIR /app

COPY package.json yarn.lock*  ./

RUN yarn install && yarn global add sequelize-cli@5.2.0

COPY . .

EXPOSE 5000

CMD yarn run dev
