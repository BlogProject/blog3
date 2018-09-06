/* 分析config */

var fs = require("fs-extra")
var os = require('os')
var jsyaml = require('js-yaml')


const config_list = ['/etc/rblog/config.yaml',`${os.homedir()}/.config/rblog/config.yaml`]

function analy_config(){

  for(let i = 0 ;i < config_list.length;i++){
    let path = config_list[i];
    if( fs.pathExistsSync(path) ){
      /* load */
      let yaml_contetn = fs.readFileSync(path,{encoding:"utf-8"})
      let config = jsyaml.load(yaml_contetn)
      return config
    }
  }
  
  console.log("没有找到配置文件,请在下在的路径里创建:")
  console.log(config_list)
  return false
}

module.exports = analy_config
