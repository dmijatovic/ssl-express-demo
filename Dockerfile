FROM node:12-alpine3.12 as build

WORKDIR /home/sslapi

COPY . .

RUN npm install

RUN npm run build

FROM node:12-alpine3.12 as app

WORKDIR /home/sslapi

COPY --from=build /home/sslapi/dist .
COPY ./public ./public

ENTRYPOINT [ "node","index.js" ]
