/* 进行 clone or pull */

var fse = require("fs-extra")

/* 本地路径存在*/
fse.ensureDirSync(C.log_path)

const git= require('simple-git/promise');


async function git_job(){

  /* 如果路径不存在,就clone 否则 pull*/
  if(!fse.pathExistsSync(C.local_rep)){
    fse.ensureDirSync(C.local_rep)
    await git().clone(C["article_git_rep"],C["local_rep"])
    console.log("clone 成功");
  }
  else{
    await git(C.local_rep).pull('origin','master')
    console.log("pull 成功");
  }
}

module.exports = git_job
