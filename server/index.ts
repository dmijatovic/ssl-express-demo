import express, {Request,Response} from 'express'
import https from 'https'
import helmet from 'helmet'
import fs from 'fs'
import getEnv from './utils/getEnv'
import {loggerMiddleware,logInfo} from './utils/log'

const PORT = getEnv("PORT","8080")

const app = express()

// const sslOptions = {
//   key: getEnv("SSL_API_KEY","SSL_API_KEY"),
//   cert: getEnv("SSL_API_CERT","SSL_API_CERT"),
// }

const sslOptions = {
  key: fs.readFileSync(`${__dirname}/.cert/key.pem`),
  cert: fs.readFileSync(`${__dirname}/.cert/cert.pem`)
}

// use HTTPS only
app.use(helmet())

app.use(loggerMiddleware)

app.use(express.static("public"))

app.get("/api",(req:Request,res:Response)=>{
  res.json({
    message:"Api server is OK"
  })
})

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

const sslServer = https.createServer(sslOptions,app)
sslServer.listen(PORT,()=>{
  logInfo(`SSL server on port ${PORT}`)
})