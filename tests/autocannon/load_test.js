const autocannon = require('autocannon')
const utils = require('./utils')

let abort=false
const noId={
  list:0,
  item:0
}
const created={
  list:0,
  item:0
}

let statusByRoute={}

const TEST = process.env.TEST
const options={
  title:"ssl-fastify",
  url:"https://localhost:8433"
}

if (TEST==='EXPRESS'){
  options.title="ssl-express"
}

console.log("ENV...TEST...", TEST)

function saveResults(err, result){
  if (abort===true) {
    console.log("Load test cancelled...")
    return
  }
  utils.saveToLowdb(err,{
    ...result,
    statusByRoute
  })
}

const loadTest = autocannon({
  ...utils.settings,
  ...options,
  requests:[{
      method:'GET',
      path:'/',
      onResponse:(status)=>{
        statusByRoute = utils.writeStatusByRoute(
          status,
          "GET/",
          statusByRoute
        )
      }
    },{
      method:'GET',
      path:'/test.html',
      onResponse:(status)=>{
        statusByRoute = utils.writeStatusByRoute(
          status,
          "GET/test.html",
          statusByRoute
        )
      }
    },{
      method:'GET',
      path:'/read/',
      onResponse:(status)=>{
        statusByRoute = utils.writeStatusByRoute(
          status,
          "GET/read/",
          statusByRoute
        )
      }
    },{
      method:'GET',
      path:'/api',
      onResponse:(status)=>{
        statusByRoute = utils.writeStatusByRoute(
          status,
          "GET/api",
          statusByRoute
        )
      }
    },{
      method:'POST',
      path:'/api',
      headers:{
        'content-type':'application/json',
        'autohorization':'Bearer FAKE_JWT_KEY'
      },
      body:JSON.stringify(utils.todoItem),
      onResponse:(status, body, context)=>{
        statusByRoute = utils.writeStatusByRoute(
          status,
          "POST/api",
          statusByRoute
        )
      }
    }
  ]
},saveResults)

process.once('SIGINT',()=>{
  abort = true
  loadTest.stop()
})

autocannon.track(loadTest)