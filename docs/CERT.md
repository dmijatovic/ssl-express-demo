# SSL keys

This folder holds the keys needed to create HTTPS (SSL) protected web server.
It uses openssl to generate self-signed certificates. These are not for the production.
In production certificates need to be signed by external/recognised authority. Free solution is lets encrypt.

## Self signed keys

```bash

# check if you have openssl
# it will show various options
openssl help

# 1. create private key as key.pem file
openssl genrsa -out key.pem

# 2. create certificate signing request
# params: new request, key: private key file, output file
# and then provide information about the requester
# it will create csr.pem file
openssl req -new -key key.pem -out csr.pem

# 3. create public certificate (self signed)
# provide params -> output is cert.pem file
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

```

## Lets encrypt

This is very popular service that issues signed certificates wich are free for 3 months. To sign the certificate you will need to run cerbot application on the server you want to created certificate for.
