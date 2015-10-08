var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/heartqOl',function(req,res,next){
	res.render('heartq_test',{title:'HeartQol',data:[
		{
			title:'Walk indoors on level ground？',
			answer:{
				a:'No',
				b:'A little',
				c:'some',
				d:'A Lot'
			}	
		},{
			title:'Walk indoors on level ground？',
			answer:{
				a:'No',
				b:'A little',
				c:'some',
				d:'A Lot'
			}	
		},{
			title:'Walk indoors on level ground？',
			answer:{
				a:'No',
				b:'A little',
				c:'some',
				d:'A Lot'
			}	
		},{
			title:'Walk indoors on level ground？',
			answer:{
				a:'No',
				b:'A little',
				c:'some',
				d:'A Lot'
			}	
		}]});
});
router.get('/admin',function(req,res){
	res.render('admin',{});
})
router.get('/new',function(req,res){
	res.render('create',{});
})


module.exports = router;
