var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression')
var favicon = require('serve-favicon')



var app = express();

//使用 gzip
app.use(compression());


//网页
app.use(express.static("../frontEnd/dist"))

// 使用favcion
app.use(favicon(path.join(__dirname, '../frontEnd/static', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images/:name',require('./image.js'));


//全局
global.debug = require('debug')('debug')

if(process.env.DEBUG.indexOf('debug') !== -1){
  debug("开启跨域")
  var cors = require('cors')
  app.use(cors())
}


global.content_id = 'content_id'
global.verifyToken = require('./verifyToken.js')
global.C = require('./config.js')
global.M ={}
global.db = require('./models/except/index.js')

global.U = require('./utils/index.js')



//app.use('/', require('./routes/index.js'));
var index_path = path.join(__dirname,'../frontEnd/dist/index.html')
app.get('/article/*',function(req,res){
    res.sendFile(index_path)
})
app.use('/_article', require('./routes/article.js'));
app.use('/image', require('./routes/image.js'));
app.use("/webhook",require("./routes/webhook.js"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if(err.status == 404)
    res.status(404);
  else
    res.status(500);
  res.json({
    status:-1,
    err:err.message
  })
});

module.exports = app;
