import {Response} from "express"

export async function invalidRequest(res:Response,message:string="Bad request"){
  return res.status(400).json({error:message})
}

export async function notFound(res:Response,message:string="Not found"){
  return res.status(404).json({error:message})
}

export async function poolNotPresent(res:Response){
  return res.status(500).json({error:"mySQL pool not present"})
}

export async function serverError(res:Response,message:string){
  return res.status(500).json({error:message})
}