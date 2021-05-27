import express, {Request,Response} from 'express'
import https from 'https'
import helmet from 'helmet'
import fs from 'fs'

import getEnv from './utils/getEnv'
import {loggerMiddleware,logInfo} from './utils/log'
import apiTest from './handler/apiTest'

const PORT = getEnv("PORT","8433")

const app = express()

// const sslOptions = {
//   key: getEnv("SSL_API_KEY","SSL_API_KEY"),
//   cert: getEnv("SSL_API_CERT","SSL_API_CERT"),
// }
const sslOptions = {
  key: fs.readFileSync(`${__dirname}/.cert/key.pem`),
  cert: fs.readFileSync(`${__dirname}/.cert/cert.pem`)
}

// ---MIDDLEWARE---
// use HTTPS only
app.use(helmet())
// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware)

//  API routes
app.use("/api",apiTest)

//  STATIC html content
app.use(express.static(`${__dirname}/public`))

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

// HTTPS server
const sslServer = https.createServer(sslOptions,app)
sslServer.listen(PORT,()=>{
  logInfo(`SSL server on port ${PORT}`)
})