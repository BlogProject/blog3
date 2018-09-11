/* 进行 clone or pull */

var fse = require("fs-extra")


const git= require('simple-git/promise');


async function git_job(yaml){

  /* 本地路径存在*/
  fse.ensureDirSync(yaml.log_path)

  /* 如果路径不存在,就clone 否则 pull*/
  if(!fse.pathExistsSync(yaml.local_rep)){
    fse.ensureDirSync(yaml.local_rep)
    await git().clone(yaml["article_git_rep"],yaml["local_rep"])
    pdebug("clone 成功");
  }
  else{
    await git(yaml.local_rep).pull('origin','master')
    pdebug("pull 成功");
  }
}

module.exports = git_job
