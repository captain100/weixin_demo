var express = require('express');
var router = express.Router();

var wechatEnterprise = require('wechat-enterprise');
var enterprise_config = {
	token: 'S55eVsVnthwy1rf6D1o5AmnoR2r',
 	encodingAESKey: 'QqiPktpEjnX3pLV5LIAjBktq5bUVG1dJsKVw0C8H2nP',
    corpId: 'wx306a8629aca93739'
}
var API = require('wechat-enterprise').API;

var CorpID = 'wx306a8629aca93739';
var Secret = 'iIChKj2NbXS74RlDHpr2_9f3r6VUIKbYueydJhQj58BqfUMuPnPvodEzbx0tUTq6';
// 构造实例



router.use(wechatEnterprise(enterprise_config, function(req, res, next){
	var message = req.weixin;
	var userId = message.FromUserName;
	console.log('userId ='+userId);
	var AgentID  = message.AgentID;
	var api = new API(CorpID, Secret, AgentID);
	api.getUser(userId, function (err, data, res) {
	console.log(data);
	});

}));

module.exports = router;

