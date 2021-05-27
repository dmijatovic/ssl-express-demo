#!/bin/bash

# Load test execution
loadtest(){
  # navigate to tests folder
  cd ../tests/
  # start load test
  npm run $1
}

take_a_break(){
  # wait for 30 sec
  echo "sleep...$1 sec"
  sleep $1
}

# ---------------------
# express load test
# start
cd ssl-express
docker-compose up -d
# wait
take_a_break 5
# run load test
loadtest test:express
# close docker
cd ../ssl-express
docker-compose down --volumes
# wait
take_a_break 5

# ---------------------
# fastify load test
# start
cd ssl-fastify
docker-compose up -d
# wait
take_a_break 5
# run load test
loadtest test:fastify
# close docker
cd ../ssl-fastify
docker-compose down --volumes
# wait
take_a_break 5