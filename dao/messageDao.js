/**
 * Created by admin on 16-4-5.
 */
var baseDao = require("../dao/BaseDao");
var utils = require("../utils/uuid.js");

function Message() {
    this.insert = function (userId, message, callback) {
        var sql = "insert into message (userid,content,addTime) values (?,?,?)";
        this.query(sql, [userId, message, utils.getNowFormatDate()], callback);
    }
    this.getMessage = function (callback) {
        var sql = "SELECT a.* from(SELECT userid,content,nickName,addTime FROM message as m JOIN `user` AS u on m.userid =u.id ORDER BY m.addTime desc limit 0 ,10) a order by addTime ASC";
        this.query(sql, "", callback);
    }
}

Message.prototype = baseDao;

module.exports = new Message;