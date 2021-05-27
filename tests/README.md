# Load test with autocannon

This section keeps load tests. We compare express and fastify as SSL servers

```bash

npm i -s autocannon lowdb

```

## Endpoints tested

- `GET /` home route which served from static folder
- `GET /test.html` test.html file which is served from static folder
- `GET /read/` static html file served from read route
- `GET /api` json api returns simple message
- `POST /api` json api returns 201 with posted body and OK message
