import {FastifyRequest,FastifyReply} from 'fastify'

export function logInfo(message="", service="ssl-api-fastify"){
  const log=`[INFO] ${Date.now()} ${service} ${message}\n`
  process.stdout.write(log)
}

export function logError(message="", service="ssl-api-fastify"){
  const err=`[ERROR] ${Date.now()} ${service} ${message}\n`
  process.stderr.write(err)
}

export function loggerMiddleware(req:FastifyRequest,res:FastifyReply,done:Function){
  const method = req.method
  const route = req.url
  const status = res.statusCode
  logInfo(`${status} ${method} ${route}`)
  done()
}