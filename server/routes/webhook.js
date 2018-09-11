/* webhook */
var express = require('express');
var router = express.Router();
var parse = require("../parse_article/parse.js")

router.post("/",async function(req,res){
  if(req.body.password === C.webhook_password){
        console.log("开始更新文章!")
        let r = await parse({solo:false})
        debug(r.join('\n'))
        res.end(r.join('\n'))
  })
module.exports = router;
