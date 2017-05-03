/**
 * Created by admin on 16-3-31.
 */
var express = require("express");
var userService = require("../service/userService");
var router = express.Router();

router.get("/login", function (req, res) {
    if(req.session.user){
        res.redirect("/online");


    }else{
        res.render("login");
    }
});

router.post("/checkLogin", function (req, res) {
    var result = "";
    if (!req.body.userName || !req.body.password) {
        result = {code: -1, msg: "用户名密码为空"};
    }
    userService.checkLogin(req.body.userName, req.body.password, function (user) {
        if (user) {
            req.session.user = user[0];
            result = {code: 1, msg: "登录成功", url: "/"};
        } else {
            result = {code: -1, msg: "用户不存在"};
        }
        res.send(result);
    });

});

module.exports = router;