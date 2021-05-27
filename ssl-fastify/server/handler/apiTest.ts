import {FastifyInstance, FastifyRequest,FastifyReply} from 'fastify'
import {invalidRequest} from "../utils/errorResponses"


async function getApiTest(req:FastifyRequest,res:FastifyReply){
  return {
    message:"GET api request OK"
  }
}

async function postApiTest(req:FastifyRequest,res:FastifyReply){
  const data = req.body
  if (typeof data == "undefined") return invalidRequest(res,"Request body is requied")
  if (data === null) return invalidRequest(res,"Request body is required")
  // set 201 status
  res.status(201)
  // return payoad
  return {
    message: "Api server is OK",
    method: "POST",
    body: data
  }
}

export default function apiTest(fastify:FastifyInstance,options:Object,done:Function){
  // GET /api
  fastify.get("/api",getApiTest)
  // POST /api
  fastify.post("/api",postApiTest)
  // need to call done!!!
  // after routes are defined
  done()
}

