const fs = require('fs')
const ldb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./report/db.json')
const db = ldb(adapter)

module.exports = {
  saveToJsonFile: (err, result)=>{
    if (err) {
      console.error(err)
    }else{
      // basic stats
      const {IdNotRetuned, Created} = result
      console.log(`IdNotRetuned tot: ${(IdNotRetuned.list + IdNotRetuned.item)}, lists: ${IdNotRetuned.list}, items:${IdNotRetuned.item}`)
      console.log(`Created tot: ${(Created.list + Created.item)}, lists: ${Created.list}, items: ${Created.item}`)

      // console.log("Results received:", result)
      const fileName = `report/load_test_${Date.now()}.json`
      fs.writeFileSync(fileName, JSON.stringify(result))
      console.log("Saved to file:", fileName)
    }
  },
  saveToLowdb:(err, result)=>{
    if (err) {
      console.error(err)
    }else{
      // basic stats
      const {IdNotRetuned, Created} = result
      console.log(`IdNotRetuned tot: ${(IdNotRetuned.list + IdNotRetuned.item)}, lists: ${IdNotRetuned.list}, items:${IdNotRetuned.item}`)
      console.log(`Created tot: ${(Created.list + Created.item)}, lists: ${Created.list}, items: ${Created.item}`)
      // add to report
      db.get('report')
        .push(result)
        .write()

      console.log("Saved to lowdb json file")
    }
  },
  writeStatusByRoute:(status,route,statusByRoute)=>{
    if (statusByRoute[route]){
      if (statusByRoute[route][status]){
        // increase for one
        statusByRoute[route][status]+=1
      }else{
        statusByRoute[route][status]=1
      }
    }else{
      statusByRoute[route]={};
      statusByRoute[route][status]=1;
    }
    return statusByRoute
  },
  // settings
  settings:{
    connections:1,
    duration:3,
  },
  todoItem:{
    "title":"Todo item",
    "checked": false
  }
}