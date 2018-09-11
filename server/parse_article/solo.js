//单独执行
var parse = require("./parse.js")

async function main(config){
  let r =  await parse(config)
  console.log(r.join('\n'))
}

main({solo:true})
