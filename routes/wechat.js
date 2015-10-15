var wechat = require('wechat');
var config = {
    token:'testqiushi',//开发者 token
    appid:'wxfaf11f0ec66a40eb',// appid
    encodingAESKey:'hMgmYbOGPRcMe63oaApmzi2yrUxrCqZcY8ssrDYI83H'//encodingAESKey
};

exports.weixin = function(req,res){
  wechat(config, function (req, res, next) {
  console.log(11111111111)
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  console.log(message);
  if (message.Content === 'qiushi') {
    // 回复qiushi(普通回复)
    res.reply('hehe');
  } else if (message.Content === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '健康测试',
        description: '开来对你的健康状况进行一个测试吧',
        picurl: 'http://123.56.227.132/images/question.jpg',
        url: 'http://123.56.227.132/heartqOl'
      }
    ]);
  }
})
}


// module.exports = wechat;