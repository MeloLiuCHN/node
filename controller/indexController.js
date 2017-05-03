var express = require('express');
var router = express.Router();
var messageService = require("../service/messageService");
router.get('/', function (req, res, next) {

    res.render('online', {"user": req.session.user});
});


/*router.get('/index', function (req, res, next) {
 res.render('index',{"user":req.session.user});
 });*/

router.get('/online', function (req, res, next) {
    res.render('online', {"user": req.session.user});
});
/*router.get('/myhome', function (req, res, next) {
    console.log(req.query.uid)
    res.render('User/user', {"uid": req.params.uid});
});*/

router.get("/message", function (req, res) {
    messageService.getMeeage(function (data) {

        res.render('messageList', {"user": req.session.user, "contentList": data});
    });
})

module.exports = router;
