# HTTPS with Fastify

This demo is for creating HTTPS server with fastify. Node has https module we will use.

For creating self-signed certificate see [this document](../docs/CERT.md)

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
npm i -s fastify fastify-static fastify-helmet
# install dev dependencies
npm i -D typescript ts-node-dev @types/node @vercel/ncc
# create default typescript definitions tsconfig.json
npx tsc --init
```

## Helmet

This module takes care about the HTTPS traffic. It forces all traffic to HTTPS.

## Docker

```bash
# create docker image using default Dockerfile
docker build -t dv4all/ssl-api-fastify:0.0.1 .

# build using docker compose
docker-compose build

# run using docker compose
docker-compose up -d

# close
docker-compose down

```
