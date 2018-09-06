/* 过滤 */
var fs = require("fs")
var pathFn = require("path")

var file_reg_list = [/^\./]
var dir_reg_list = [/^\./]

for(let i =0;i<C.not_parse_dir_reg.length;i++){
    dir_reg_list.push( new RegExp(C.not_parse_dir_reg[i],'i'))
}

for(let i =0;i<C.not_parse_file_reg.length;i++){
    file_reg_list.push( new RegExp(C.not_parse_file_reg[i],'i'))
}

console.log(C.not_parse_file_reg)
console.log(file_reg_list)
/* reg 测试 */
function reg_test(name,reg_list){
  for(let i = 0;i<reg_list.length;i++)
    if(reg_list[i].test(name)){
      debug("配置成功",name)
      return true;      //匹配成功
    }
  return false;
}



global.md_files =[]

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


module.exports = filter
