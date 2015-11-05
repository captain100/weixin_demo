var wechatEnterprise = require('wechat-enterprise');
var enterprise_config = {
	token: 'S55eVsVnthwy1rf6D1o5AmnoR2r',
 	encodingAESKey: 'QqiPktpEjnX3pLV5LIAjBktq5bUVG1dJsKVw0C8H2nP',
    corpId: 'wx306a8629aca93739'
}

wechatEnterprise(enterprise_config,function(req, res, next){
	console.log(111111111);
	console.log(req);
    res.writeHead(200);
	res.end('hello node api');

});
module.exports = wechat;