var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var config = require('./config');
// var wechartenterprise = require('./routes/wechartenterprise'); 
// var wechat = require('./routes/wechat');

var app = express();

var wechatEnterprise = require('wechat-enterprise');
var enterprise_config = {
    token: 'S55eVsVnthwy1rf6D1o5AmnoR2r',
    encodingAESKey: 'QqiPktpEjnX3pLV5LIAjBktq5bUVG1dJsKVw0C8H2nP',
    corpId: 'wx306a8629aca93739'
}

var wechat = require('wechat');
var wechat_config = {
    token: 'testnewqiushi',//开发者 token
    appid: 'wxb4fb29266130bb85',// appid
    encodingAESKey: 'BahC4uNa3dY6wo5U3mRpVf4yxkQtXs6OyDXEe2GudmR'//encodingAESKey
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'admin_user', cookie: {maxAge: 60000}}));
app.use(passport.initialize());
app.use(passport.session());
//微信解析
app.use(express.query());

//系统基础路由
app.use('/', routes);
app.use('/users', users);
app.use('/wechartenterprise',wechatEnterprise(enterprise_config,function(req, res, next){
    console.log(111111111);
    console.log(req);
    res.writeHead(200);
    res.end('hello node api');

}));

//微信后台信息
app.use('/wechat', wechat(wechat_config, function (req, res, next) {
    console.log(11111111111)
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    if (message.Content === 'qiushi') {
        // 回复qiushi(普通回复)
        res.reply('hehe');
    } else if (message.Content === '是') {
        //你也可以这样回复text类型的信息
        res.reply([{
            title: 'Schedule Day 1',
            description: '今天是个重要的日子，你有一些事情需要完成快来查看。',
            picurl: 'http://123.56.227.132/images/question.jpg',
            url: 'http://123.56.227.132/schedule'
        }]);
    } else if (message.Content === 'schedule day1') {
        res.reply([{
            title: 'Schedule Day 1',
            description: '今天是个重要的日子，你有一些事情需要完成快来查看。',
            picurl: 'http://123.56.227.132/images/question.jpg',
            url: 'http://123.56.227.132/schedule'
        }]);
    } else {
        // 回复高富帅(图文回复)
        res.reply({
            content: '欢迎你加入由XX公司提供的XX试验。在此之前请确认你是否已经在你的主治医师的指导下签署书面合同已经签署请\n回复：是\n否则请联系你的主治医师',
            type: 'text'
        });
    }
}));
//用户认证路由
app.use('/auth', auth);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, function () {
    console.log('service port 3000 has start');
});
