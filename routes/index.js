var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/heartqOl',function(req,res,next){
	request.get({url:'http://123.56.227.132:8080/info/paper/read?paperId=5'},function(err,response,body){
		console.log(body);
		body = JSON.parse(body);
		console.log(body.data);
		res.render('heartq_test',body.data);
	})

});
router.get('/admin',function(req,res){
	res.render('admin',{});
})
router.get('/new',function(req,res){
	res.render('create',{});
})




module.exports = router;
