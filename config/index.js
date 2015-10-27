var env = process.env.NODE_ENV || 'development';
var config = null;
if(config === null){
	if(env === 'development'){
		config = {
			server:"http://123.56.227.132:8080"
		}

	}else if(env === 'testing'){
		config = {
			server:"http://192.168.0.101:8081"
		}
	}else{
		config = {
			server:"http://192.168.0.101:8081"
		}
	}
}
module.exports = config;