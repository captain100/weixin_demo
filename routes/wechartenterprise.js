var wechat = require('wechat-enterprise');
var config = {
	token: 'FAy6aOWo6ybPf9DLy6H91lMJxDOOxg',
 	encodingAESKey: 'EhLMzTCtIGMCioS8ZQPJrGrY2zVUKZomoo3zRIAXQgA',
    corpId: 'wx306a8629aca93739'
}

wechat(config,function(req, res, next){
	console.log(111111111);
	console.log(req);
    res.writeHead(200);
	res.end('hello node api');

});
module.exports = wechat;