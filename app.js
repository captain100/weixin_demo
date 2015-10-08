var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var wechat = require('wechat');
var config = {
    token:'testqiushi',//开发者 token
    appid:'wxfaf11f0ec66a40eb',// appid
    encodingAESKey:'hMgmYbOGPRcMe63oaApmzi2yrUxrCqZcY8ssrDYI83H'//encodingAESKey
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  console.log(11111111111)
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  console.log(message);
  if (message.Content === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.Content === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.Content === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '健康测试',
        description: '开来对你的健康状况进行一个测试吧',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://123.56.227.132/heartqOl'
      }
    ]);
  }
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000,function(){
  console.log('service port 3000 has start');
})
