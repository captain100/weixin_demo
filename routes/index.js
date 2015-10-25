var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/heartqOl', function (req, res, next) {
    //http://192.168.0.101:8081/info/paper/getPaperContent?paperId=157&taskNo=1234&userAccount=testUser
    request.get({url: config.server + '/info/paper/getPaperContent?paperId=157&taskNo=1234&userAccount=testUser'}, function (err, response, body) {
        console.log(body);
        body = JSON.parse(body);
        console.log(body.data);
        res.render('heartq_test', {data:body.data});
    })

});
//提交数据
router.get('/subPaper',function(req,res){
    var data = req.query.data;
    var json = JSON.stringify(data);
    json = JSON.parse(json);
    console.log(json);
    var options = {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36'
        },
        url: config.server+'/info/paper/submit',
        method: 'POST',
        json: true,
        body: json
    };
    request(options, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('----info------', data);
            res.end();
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
            res.render('question',{data:data.data});
        }
    });
    //res.render('question',{data:
    //{
    //    "paperId": 1,
    //    "paperTitle": "问卷标题",
    //    "desc": "问卷描述",
    //    "createTime": 1231231231221,
    //    "questionList": [
    //        {
    //            "title": "这个是第一题",
    //            "type": 1,
    //            "questionId": 1,
    //            "option": [
    //                {
    //                    "text": "选项A",
    //                    "value": "4"
    //                },
    //                {
    //                    "text": "选项B",
    //                    "value": "3"
    //                },
    //                {
    //                    "text": "选项C",
    //                    "value": "2"
    //                },
    //                {
    //                    "text": "选项D",
    //                    "value": "1"
    //                }
    //            ]
    //        },
    //        {
    //            "title": "这个是第二题",
    //            "type": 1,
    //            "questionId": 2,
    //            "option": [
    //                {
    //                    "text": "选项A",
    //                    "value": "4"
    //                },
    //                {
    //                    "text": "选项B",
    //                    "value": "3"
    //                },
    //                {
    //                    "text": "选项C",
    //                    "value": "2"
    //                },
    //                {
    //                    "text": "选项D",
    //                    "value": "1"
    //                }
    //            ]
    //        }
    //    ]
    //}
    //});
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
    //res.render('list', {list: [
    //    {
    //        "paperId": 1,
    //        "paperTitle": "问卷标题",
    //        "createTime": 12121,
    //        "updateTime": 12121
    //    },
    //    {
    //        "paperId": 2,
    //        "paperTitle": "问卷标题",
    //        "createTime": 12121,
    //        "updateTime": 12121
    //    }
    //]});
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
        url: config.server+'/admin/paper/create',//http://123.56.227.132:8080/admin/paper/create
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


module.exports = router;
