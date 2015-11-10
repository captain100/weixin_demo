var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var WechatPublicStrategy = require('passport-wechat-enterprise').Strategy;
var API = require('wechat-enterprise').API;

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('./auth/index', {title: 'login'});
});

router.post('/login', passport.authenticate('local', {
        successRedirect: '/list',
        failureRedirect: '/auth/'
    }
));
router.all('/users', isLoggedIn);
router.get('/users', function (req, res, next) {
    var html = "<h2>你好, " + req.user.username + "</h2><a href='/auth/logout'>退出</a>";
    res.send(html);
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/auth/');
})

//微信企业号的oauth2.0
passport.use("wechat-enterprise", new WechatPublicStrategy({
        corpId: 'wx306a8629aca93739',
        corpSecret: 'iIChKj2NbXS74RlDHpr2_9f3r6VUIKbYueydJhQj58BqfUMuPnPvodEzbx0tUTq6',
        callbackURL: "http://sz.xiaoyun.com:3000/auth/auth/wechat/callback",
        state: "STATE",
        scope: "snsapi_base"
    },
    function (accessToken,token,profile, done) {
        // console.log('profile =  ' + profile);
        //存储用户信息
        var CorpID = 'wx306a8629aca93739';
        var Secret = 'iIChKj2NbXS74RlDHpr2_9f3r6VUIKbYueydJhQj58BqfUMuPnPvodEzbx0tUTq6';
        var api = new API(CorpID, Secret, 7);
        api.getUser(profile.UserId, function (err, data, resUser) {
        console.log(data);
        done(null,data);
    })

        
    },
    function getAccessToken(cb) {
        return cb();
    },
    function saveAccessToken(accessToken, cb) {
        console.log(accessToken);
        return cb;
    }
));


router.get('/auth/wechat', passport.authenticate('wechat-enterprise'));

router.get('/auth/wechat/callback', passport.authenticate('wechat-enterprise', {failureRedirect: '/login'}),function(req,res){
    res.redirect('http://sz.xiaoyun.com:3000/list');
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('./auth/');
}
passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            username: 'qiushi',
            password: '123456'
        };
        if (username !== user.username) {
            return done(null, false, {message: 'incorrect username'})
        }
        if (password !== user.password) {
            return done(null, false, {message: 'incorrect pass'})
        }
        return done(null, user);

    }))
passport.serializeUser(function (user, done) {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
})


module.exports = router;
