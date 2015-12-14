var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');
var WechatAPI = require('wechat-api');
var api =null;
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('showPage', {title: 'Express'});
});

router.get('/heartqOl', function (req, res, next) {
    console.log('get heart')
    //http://192.168.0.101:8081/info/paper/getPaperContent?paperId=157&taskNo=1234&userAccount=testUser
    request.get({url: config.server + '/info/paper/getPaperContent?paperId='+req.query.paperId+'&taskNo='+req.query.taskNo+'&userAccount='+req.query.userAccount}, function (err, response, body) {
        console.log(body);
        body = JSON.parse(body);
        console.log(body.data);
        res.render('heartq_test', {data: body.data});
    })

});
//提交数据
router.get('/subPaper', function (req, res) {
    var data = req.query.data;
    var json = JSON.stringify(data);
    json = JSON.parse(json);
    console.log('----------------------')
    console.log(json);
    var options = {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36'
        },
        url: config.server + '/info/paper/submit',
        method: 'POST',
        json: true,
        body: json
    };
    request(options, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            //console.log('----info------', data);
            res.json(200, {info: data});
        }
    });

});
router.get('/admin', function (req, res) {
    res.render('admin', {});
});
router.get('/new', function (req, res) {
    res.render('newqs', {});
});
//展示问卷
router.get('/getQuestion', function (req, res) {
    //console.log(req.query.paperId);
    var paperId = req.query.paperId || 150;
    request.get(config.server + '/admin/paper/readDetail?paperId=' + paperId, function (err, response, data) {
        console.log(response);
        if (!err && response.statusCode == 200) {
            data = JSON.parse(data);
            console.log(data);
            res.render('question', {data: data.data});
        }
    });

});
//登陆用户问卷页
router.get('/list', function (req, res) {
    request.get(config.server + '/admin/paper/list?paperName=', function (error, response, data) {
        if (!error && response.statusCode == 200) {
            data = JSON.parse(data);
            console.log(data);
            res.render('list', {list: data.data});
        }
    });
});

//创建试卷
router.post('/insert', function (req, res) {
    var data = JSON.parse(req.body.data);
    console.log(data);
    var options = {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36'
        },
        url: config.server + '/admin/paper/create',//http://123.56.227.132:8080/admin/paper/create
        method: 'POST',
        json: true,
        body: data
    };
    request(options, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('----info------', data);
            res.render('admin', {});
        }
    });
});
//推送消息接口
router.get('/pushMsg', function (req, res) {
    var APPID = 'wxb4fb29266130bb85',
        APPSECRET = '675f1cd7edfcaba17b987c44c83e0a6b';

    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            var accsessToken = body.access_token;
            var postUrl = 'https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=' + accsessToken;
            var data = {
                "touser": "oewo7wMrPRdkfCxLhkQ0qTTMyRME",//oewo7wMrPRdkfCxLhkQ0qTTMyRME 90后
                                                         //oewo7wPJosZXZMem-JzRsvGKU7Sk  袁伟强
                                                         //oewo7wGXHZOFg0KgJVT1pR2Wh8RI 穆应州
                                                         //oewo7wAEVuKVjTEEUov3Lc4lI0Uk  胡浩
                "mpnews": {
                    "media_id": "J9_ss0D0-2eXe-0bluUhDctDOvRTYMLPWnkNBqoTtGizFMa_S38Uy_cdBiDJ5Wri"
                },
                "msgtype": "mpnews"
            }
            var options = {
                url: postUrl,
                method: 'POST',
                json: true,
                body: data
            };
            console.log(accsessToken)
            request(options, function (err, resp, info) {
                console.log(err, resp, info);

            });
        }

    });
});

//推送模版消息
router.post('/template/:openid',function(req, res) {
    console.log('推送消息已到达')
    console.log(req.body);
    api = new WechatAPI(config.APPID, config.APPSECRET);
    var templateId = '9JDP4C0Q82qwj9AdZEPfOphLrhg1APAanwFZHwA059s';
    // URL置空，则在发送后,点击模板消息会进入一个空白页面（ios）, 或无法点击（android）
    var url = req.body.redirectUrl;
    var data = {
        "first": {
            "value":req.body.msgTitle,
            "color":"#173177"
        },
        "keyword1":{
            "value":req.body.msgContent,
            "color":"#173177"
        },
        "keyword2": {
            "value":req.body.msgDueTime,
            "color":"#173177"
        },
        "remark":{
            "value":req.body.remark,
            "color":"#173177"
        }
    };
    var openid = req.param('openid');
    console.log('openid',openid);
    api.sendTemplate(openid, templateId, url, data, function(err, result){
        console.log('error',err);
        console.log('result', result);
        res.json(200, result);
    });
});

router.post('/push/:openid', function (req, res) {

    var openid = req.param('openid');
    var articles = req.body.articles;
    api.sendNews(openid, articles, function (err, result) {
        console.log(result);
        res.json(200, result);
    });
});

//schdule列表
router.get('/schedule', function (req, res) {
    //var list = [{
    //    EGtitle: 'Inclusion Exclusion Criterica',
    //    CHtitle: '去诊所',
    //    EGdesc: 'Do you have been Inclusion Exclusion Criterica?',
    //    CHdesc: '你今天是否去诊所进行一下检查？',
    //    isDone: false,
    //    url: '',
    //    type: 'alert',
    //    icon: '',
    //    actionID: '12345678'
    //}, {
    //    EGtitle: 'Medical Surgical History/Demographics',
    //    CHtitle: '医学外科病史/人口统计',
    //    EGdesc: 'Do you have been Medical Surgical History/Demographics?',
    //    CHdesc: '你今天是否去诊所进行一下检查？',
    //    isDone: true,
    //    url: '',
    //    type: 'alert',
    //    icon: '',
    //    actionID: '12345678'
    //}, {
    //    EGtitle: 'Start Questionnaire',
    //    CHtitle: '进行问卷调查',
    //    EGdesc: 'Do you have been M?',
    //    CHdesc: '你今天是否去诊所进行一下检查？',
    //    isDone: false,
    //    url: '/heartqOl',
    //    type: 'question',
    //    icon: '',
    //    actionID: '12345678'
    //}, {
    //    EGtitle: 'HIV Rapid Antigen Text',
    //    CHtitle: '进行问卷调查',
    //    EGdesc: 'Do you have been HIV Rapid Antigen Text?',
    //    CHdesc: '你今天是否去诊所进行一下检查？',
    //    isDone: false,
    //    url: '',
    //    type: 'alert',
    //    icon: '',
    //    actionID: '12345678'
    //}];
    var userAccount = req.query.userAccount;
    var projectUniqNo = req.query.projectUniqNo;
    var scheduleCount = req.query.scheduleCount;

    var url = config.server+"/info/task/userCurrentList?userAccount="+userAccount+"&projectUniqNo="+projectUniqNo+"&scheduleCount="+scheduleCount;
    console.log(url);
    request.get({url:url},function(error,response, info){
        if(error)res.json({error:error});
        if (!error && response.statusCode == 200) {
            info = JSON.parse(info);
            res.render('schedule', {list: info.data.listCount,userAccount:info.userAccount});
        }
    })
});


module.exports = router;
