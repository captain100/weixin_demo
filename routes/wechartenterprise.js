var wechat = require('wechat-enterprise');
var config = {
	token: 'BhQW9hdLaR7EeiSt8jL59naryIPgBv',
 	encodingAESKey: 'CvYTwFatYgrfLwrk4Q5bpU5UWVo4Z1HwGAnUSFsesYy',
    corpId: 'wx306a8629aca93739'
}

module.exports.wechart = function(){
	console.log(11111111)
	return wechat(config,function(req, res, next){
		console.log(req);
		console.log(res);
		res.writeHead(200);
  		res.end('hello node api');

	})

};