/* 过滤 */
var fs = require("fs")
var pathFn = require("path")


/* reg 测试 */
function reg_test(name,reg_list){
  for(let i = 0;i<reg_list.length;i++)
    if(reg_list[i].test(name)){
      pdebug("配置成功",name)
      return true;      //匹配成功
    }
  return false;
}

function _filter(yaml){
  var md_files = []
  var file_reg_list = [/^\./]
  var dir_reg_list = [/^\./]

  /* 处理不加入的文件夹 */
  for(let i =0;i<yaml.not_parse_dir_reg.length;i++){
    dir_reg_list.push( new RegExp(yaml.not_parse_dir_reg[i],'i'))
  }

  /* 处理不加入的文件 */
  for(let i =0;i<yaml.not_parse_file_reg.length;i++){
    file_reg_list.push( new RegExp(yaml.not_parse_file_reg[i],'i'))
  }


  function filter(_path_){
    let files = fs.readdirSync(_path_)
    for(let i =0;i < files.length;i++){
      let real_path = pathFn.join(_path_,files[i]);
      let stat = fs.statSync(real_path)

      if(stat.isDirectory() && !reg_test(files[i],dir_reg_list)) { //是文件夹
        filter(real_path)
      }
      else if(pathFn.extname(files[i])=='.md' && !reg_test(pathFn.basename(files[i],".md"),file_reg_list)){ //是文件
        md_files.push({
          path:_path_,
          name:files[i]
        })
      }
    }
  }

  filter(yaml.local_rep)

  return md_files
}


module.exports = _filter
