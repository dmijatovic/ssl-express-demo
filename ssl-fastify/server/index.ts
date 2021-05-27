import Fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import fastifyHelmet from 'fastify-helmet'
import fs from 'fs'

import getEnv from './utils/getEnv'
import {logInfo, loggerMiddleware} from './utils/log'
import apiTest from './handler/apiTest'

const HOST = getEnv("HOST","localhost")
const PORT = getEnv("PORT","8433")

const options={
  logger:false,
  https:{
    key: fs.readFileSync(`${__dirname}/.cert/key.pem`),
    cert: fs.readFileSync(`${__dirname}/.cert/cert.pem`)
  }
}

const app = Fastify(options)

// ---MIDDLEWARE---
app.register(fastifyHelmet)

// app.addHook('onRequest',loggerMiddleware)
app.addHook('onResponse',loggerMiddleware)
//  STATIC html content
app.register(fastifyStatic,{
  root:`${__dirname}/public`
})

app.register(apiTest)

// listen to container/process stop
process.on("SIGINT",()=>{
  // end mySQL connection pool
  logInfo("Server stopped (SIGINT)")
  process.exit(0)
})

process.on("SIGTERM",()=>{
  // end mySQL connection pool
  logInfo("Server terminated (SIGTERM)")
  process.exit(1)
})

// Run the server!
// For Docker we need to specify 0.0.0.0
app.listen(PORT,HOST)
  .then(()=>{
    logInfo(`Secure server on port ${PORT}`)
  })
