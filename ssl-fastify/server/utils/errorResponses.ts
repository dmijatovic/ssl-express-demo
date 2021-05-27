import {FastifyReply} from 'fastify'

export async function invalidRequest(res:FastifyReply,message:string="Bad request"){
  return res.code(400).send({error:message})
}

export async function notFound(res:FastifyReply,message:string="Not found"){
  return res.code(404).send({error:message})
}

export async function serverError(res:FastifyReply,message:string){
  return res.code(500).send({error:message})
}