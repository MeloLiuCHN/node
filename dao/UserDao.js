/**
 * Created by admin on 16-3-31.
 */

var baseDao = require("./BaseDao");

function User() {
    var _this = this;
    this.getUserByLoginName = function (value, callback) {  //利用回调返回 结果
        var sql = "select id,password from user where loginName = ?";
        this.query(sql, [value], function (user) {
            callback(user);
        });
    }

    this.getUserById = function (id, callback) {
        var sql = "select id,nickName from user where id = ?";
        this.query(sql, [id], function (user) {
            callback(user);
        });
    }
}

User.prototype = baseDao; //原型链继承

module.exports = new User();