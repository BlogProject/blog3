/* webhook */
var express = require('express');
var router = express.Router();
var process = require("child_process")

router.post("/",function(req,res){
  if(req.body.password === C.webhook_password){
    console.log("webhook 成功")
    process.exec(`node ${__dirname}/../parse_article/parse.js solo ${req.drop}`,(err,stdo,stde)=>{
      console.log(stdo)
    })
  }
  res.end()
})
module.exports = router;
