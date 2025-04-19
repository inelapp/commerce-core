FROM node:18-alpine as dependecies

WORKDIR /app

RUN apk add --no-cache tzdata
ENV TZ=America/Lima
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

ENV PORT=3002

EXPOSE $PORT

CMD ["yarn", "start:prod"]