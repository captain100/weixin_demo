var env = process.env.NODE_ENV || 'development';
var config = null;
if(config === null){
	if(env === 'development'){
		config = {
			APPID :'wxb4fb29266130bb85',
       		APPSECRET :'675f1cd7edfcaba17b987c44c83e0a6b',
			server:"http://10.251.1.46:8080"
		}
	}else if(env === 'testing'){
		config = {
			 APPID :'wxb4fb29266130bb85',
       		 APPSECRET :'675f1cd7edfcaba17b987c44c83e0a6b',
			 server:"http://123.56.126.231:8080"
		}
	}else{
		config = {
			APPID :'wxb4fb29266130bb85',
       		APPSECRET :'675f1cd7edfcaba17b987c44c83e0a6b',
			server:"http://123.56.126.231:8080"
		}
	}
}
module.exports = config;