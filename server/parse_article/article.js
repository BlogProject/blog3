/* 解析 */
var mdparse = require("mdArticleParse")
var pathFn = require("path")
var U = require("../utils/index.js")

async function Article(mds){
  /* file */
  for(let i =0 ; i < mds.length;i++){
    let real_path = pathFn.join(mds[i].path,mds[i].name)
    let res = mdparse(real_path)

    if( res.noheader == undefined) { //存在文件头
      let doc = await M['article'].findOne({_id:res._id})

      if( doc == null || doc.md5 !== res.md5){
        pdebug("更新文章",res.title,real_path)

        /* 更新 */
        if(!res.series || typeof(res.series) != 'string')
          series = '无系列'
        else
          series = res.series

        await　M['article'].findOneAndUpdate({_id:res._id},res,{upsert:true,setDefaultsOnInsert:true})
        console.log("更新文章:",res.title)

        let category=[],tags=[]
        if(U.isArray(res.category))  category = res.category
        if(U.isArray(res.tags))  tags = res.tags

        pdebug('tags:',tags)
        pdebug('series:',series)
        pdebug('category:',category)

        await M['content'].updateOne({_id:content_id},{$addToSet:{
          category:{$each: category},
          tags    :{$each: tags},
          series  : series,
        }}).exec()

      }
    }
  }
}

module.exports = Article
