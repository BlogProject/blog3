/*  执行流程:
 *      解析config.yaml
 *  +---连接数据库/加载model
 *  |   |
 *  |   clone/pull
 *  |   |
 *  l   过滤文件,给出所有的文件
 *  o   {
 *  g       file:name
 *  |       path:
 *  |   }
 *  |   |
 *  |   解析文件-与数据库对比-更新
 *  |   |
 *  +---结束
 *
 * */
var jsyaml = require('js-yaml')

global.debug = require("debug")("debug")
global.content_id = 'content_id'
//打开db

async function main(dropDatabase){
  /* 1: 解析配置 */
  debug("1.读取配置!!")
  var config = require("./analyConfig.js")()
if( config == false){
    process.exit(1)
    debug("读取配置失败")
  } else {
    global.C = config
    debug("读取配置成功:",C)
    global.M = []
  }

  /* 2.连接数据库 */
  debug("2.连接数据库!!")
  var db = require("../models/except/index.js")
  
  if( dropDatabase){
    debug("删除整个库!!")
    await db.dropDatabase()
  }

  /* 3.git clone or pull */
  debug("3.git clone or pull!!")
  await require("./git.js")()

  /* 4.过滤文件 */
  debug("4.过滤文件!!")
  require("./filter.js")(C.local_rep)

  /* 5.解析文章,上传数据库*/
  debug("5.解析文章,上传数据库!!")
  await require("./article.js")(md_files)

  /* 退出:  */
  db.close()
}

//main()
if( process.argv[2] == "solo"){
    main(process.argv[3] == 'drop')
}
module.exports = main
