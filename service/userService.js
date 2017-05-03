/**
 * Created by admin on 16-4-5.
 */
var userDao = require("../dao/UserDao");

var useService = {
    checkLogin: function (loginName, password, callback) {
        userDao.getUserByLoginName(loginName, function (user) {
            if (user && user != undefined && user.length == 1 && user[0].password == password) {
                userDao.getUserById(user[0].id, callback);
            } else {
                callback(null);
            }
        });
    },
    getUserById: function (id, callback) {
        userDao.getUserById(id, function (user) {
            callback(user);
        });
    }
}

module.exports = useService;