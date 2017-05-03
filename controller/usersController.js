var express = require('express');
var userService = require("../service/userService");
var router = express.Router();
var  multer=require('multer');



/* GET users listing. */

router.get('/myhome', function (req, res) {

    if(req.query.uid){
        userService.getUserById(req.query.uid,function (data) {
/*
            fs.readFile("./app.js",function(err,data){  //异步读取文件
                if(err){
                    return console.err(err);
                }
                console.log("读取完成 内容为："+data);
            });*/
            res.render('User/user', {"user":data[0]});
        })
    }
});

/*var upload=multerService.single('testfile');
var dataInput = function (req, res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return  console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        //console.log(req.files);
    });
}*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },

    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
       var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload1 = multer({ dest: '../upload',storage: storage })
router.post('/file-upload', upload1.single('thumbnail'), function (req, res, next) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
})
/*router.post('/file-upload', function(req, res, next) {

    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return  console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        console.log(req.files);
    });
});*/
module.exports = router