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
global.pdebug = require("debug")("parse")

async function parse(config){
  if( config.solo){
    global.M = []
    global.content_id = 'content_id'
  }
  var last_err = []     //最后的错误

  /* 1: 解析配置 */
  pdebug("1.读取配置!!")
  var yaml_config
  var db_connect
  try{
    yaml_config = require("./analyConfig.js")()
    if( config.solo)
      global.C = yaml_config
  }
  catch(e){
    last_err.push(e)
    return last_err;
  }

  if( config.solo)
      db_connect = require("../models/except/index.js")
  else
      db_connect = db


  /* 删除库,重新创建 */
  if(config.dropDatabse){
    pdebug("删除整个库!!")
    await db_connect.dropDatabase()
  }

  /* git clone or pull */
  /* 3.git clone or pull */
  pdebug("3.git clone or pull!!")
  await require("./git.js")(yaml_config)

  pdebug("4.过滤文件!!")
  var md_files = require("./filter.js")(yaml_config)

  /* 5.解析文章,上传数据库*/
  pdebug("5.解析文章,上传数据库!!")
  await require("./article.js")(md_files)

  if(config.solo)
    /* 退出:  */
    db_connect.close()

  return last_err

}

module.exports = parse
