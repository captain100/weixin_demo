
var express = require('express');
var router = express.Router();
var request = require('request');

var wechat = require('wechat');
var wechat_config = {
    token: 'testnewqiushi',//开发者 token
    appid: 'wxb4fb29266130bb85',// appid
    encodingAESKey: 'BahC4uNa3dY6wo5U3mRpVf4yxkQtXs6OyDXEe2GudmR'//encodingAESKey
};

router.use(wechat(wechat_config, function (req, res, next) {
    console.log(11111111111)
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    if (message.Content === 'qiushi') {
        // 回复qiushi(普通回复)
        res.reply('hehe');
    //} else if (message.Content === '是') {
    //    //你也可以这样回复text类型的信息
    //    res.reply([{
    //        title: 'Schedule Day 1',
    //        description: '今天是个重要的日子，你有一些事情需要完成快来查看。',
    //        picurl: 'http://123.56.227.132/images/question.jpg',
    //        url: 'http://123.56.227.132/schedule'
    //    }]);
    //} else if (message.Content === 'schedule day1') {
    //    res.reply([{
    //        title: 'Schedule Day 1',
    //        description: '今天是个重要的日子，你有一些事情需要完成快来查看。',
    //        picurl: 'http://123.56.227.132/images/question.jpg',
    //        url: 'http://123.56.227.132/schedule'
    //    }]);
    } else if (message.Event === 'CLICK' && message.EventKey === 'CREAT_TASK_1') {
        var openid =  message.FromUserName;
        request('http://www.cpzero.cn/createTask?openid='+openid,function (error, response, info){
            next();
        })
       
    } else {
        res.reply({
            content: '欢迎你加入由XX公司提供的XX试验。在此之前请确认你是否已经在你的主治医师的指导下签署书面合同已经签署请\n回复：是\n否则请联系你的主治医师',
            type: 'text'
        });
    }
}));


module.exports = router;