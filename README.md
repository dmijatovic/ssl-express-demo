# HTTPS with express

This demo is for creating HTTPS server with express. Node has https module we will use.
It is loosly based on [this article](https://sitepoint.com/how-to-use-ssltls-with-node-js/).

For creating self-signed certificate see [this document](docs/CERT.md)

## Development

- npm install all dependencies

- create hidden folder under the server folder

```bash
mkdir server/.cert
```

- create self signed keys using [these steps](docs/CERT.md)

- run in dev mode `npm run dev`

## Dependencies

```bash
# install dependencies
npm i -s express helmet
# install dev dependencies
npm i -D typescript ts-node-dev @types/node @types/express
# create default typescript definitions tsconfig.json
npx tsc --init
```

## Helmet

This module takes care about the HTTPS traffic. It forces all traffic to HTTPS.

## Docker

```bash
# create docker image using default Dockerfile
docker build -t dv4all/sslapi:0.0.1 .

# build using docker compose
docker-compose build

# run using docker compose
docker-compose up -d

# close
docker-compose down

```
