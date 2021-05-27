import {Request,Response, Router} from 'express'
import {invalidRequest} from '../utils/errorResponses'

async function getApiTest(req:Request,res:Response){
  res.json({
    message:"Api server is OK"
  })
}

async function postApiTest(req:Request,res:Response){
  const data = req.body
  console.log("postApiTest...", data)
  if (typeof data == "undefined") return invalidRequest(res,"Request body is required")
  res.json({
    message:"Api server is OK",
    method: "POST",
    body:data
  })
}

const routes = Router()

routes.get("/",getApiTest)
routes.post("/",postApiTest)

export default routes