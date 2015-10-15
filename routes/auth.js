var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./auth/index', { title: 'login' });
});

router.post('/login',passport.authenticate('local',{
	successRedirect: '/amdin',
    failureRedirect: '/auth/'}
    ));
router.all('/users',isLoggedIn);
router.get('/users',function(req,res,next){
	var html = "<h2>你好, " + req.user.username + "</h2><a href='/auth/logout'>退出</a>";
	res.send(html);
});
router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/auth/');
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('./auth/');
}
passport.use('local',new LocalStrategy(
  function(username,password,done){
    var user ={
      username :'qiushi',
      password:'123456'
    };
    if(username !==user.username){
      return done(null,false,{message:'incorrect username'})
    }
    if(password !== user.password){
      return done(null,false,{message:'incorrect pass'})
    }
    return done(null,user);

}))
passport.serializeUser(function(user,done){
  done(null,user);
})
passport.deserializeUser(function(user,done){
  done(null,user);
})
module.exports = router;
