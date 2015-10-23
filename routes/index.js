var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/heartqOl', function (req, res, next) {
    request.get({url: 'http://123.56.227.132:8080/info/paper/read?paperId=5'}, function (err, response, body) {
        console.log(body);
        body = JSON.parse(body);
        console.log(body.data);
        res.render('heartq_test', body.data);
    })

});
router.get('/admin', function (req, res) {
    res.render('admin', {});
});
router.get('/new', function (req, res) {
    res.render('create', {});
});
//登陆用户问卷页
router.get('/list', function (req, res) {
    res.render('list');
})

router.post('/insert', function (req, res) {

    var data = req.body.data;
    console.log(data);
    var options = {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36'
        },
        url: 'http://123.56.227.132:8080/admin/paper/create',//http://123.56.227.132:8080/admin/paper/create
        method: 'POST',
        json: true,
        body: {
            "paperTitle": "问卷标题",
            "desc": "问卷描述",
            "questionList": [
                {
                    "title": "这个是第一题",
                    "type": 1,
                    "option": [
                        {
                            "text": "选项A",
                            "value": "4"
                        },
                        {
                            "text": "选项B",
                            "value": "3"
                        },
                        {
                            "text": "选项C",
                            "value": "2"
                        },
                        {
                            "text": "选项D",
                            "value": "1"
                        }
                    ]
                },
                {
                    "title": "这个是第二题",
                    "type": 1,
                    "option": [
                        {
                            "text": "选项A",
                            "value": "4"
                        },
                        {
                            "text": "选项B",
                            "value": "3"
                        },
                        {
                            "text": "选项C",
                            "value": "2"
                        },
                        {
                            "text": "选项D",
                            "value": "1"
                        }
                    ]
                }
            ]
        }
    };

    request(options, function (error, response, data) {
        //console.log(response);
        //console.log('err = ' + error + 'response = ' + response + 'body = ' + data);
        if (!error && response.statusCode == 200) {
            console.log('----info------', data);
            res.render('admin',{});
        }
    });


});


module.exports = router;
