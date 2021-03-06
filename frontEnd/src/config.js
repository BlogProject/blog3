var real_server = "/"
var server = process.env.NODE_ENV==='production'?real_server:'http://127.0.0.1:3001/'
module.exports = {
  server: server,
  userConfigs:{
        avatar:'/static/avatar.png',
        name:'Rainboy',
        sign:'我好菜啊~',
        github:'rainboylvx',
        social_links:[
          {
            name:'EMAIL:rainboylvx@qq.com',
            icon:'android-mail',
            link:'rainboylvx@qq.com'
          },
          {
            name:'GITHUB',
            icon:'social-github',
            link:'https://github.com/Rainboylvx'
          }
        ],
        friends:[
          {
              name:'李同学',
              link:'https://virusdefender.net/'
          }
        ],
    rmarkedConfigs:{
      image:true,
      image_base:'/',
      clipbordCopy:true
    }
  }
}
