import {logInfo} from './log'

export default (key:string,defaultVal:string)=>{
  let value
  try{
    value = process.env[key]
    if (value){
      return value
    }
    logInfo(`${key} MISSING...using default...${defaultVal}`)
    return defaultVal
  }catch{
    logInfo(`${key} MISSING...using default...${defaultVal}`)
    return defaultVal
  }
}
