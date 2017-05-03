/**
 * Created by admin on 16-4-5.
 */
var messageDao = require("../dao/messageDao");
var messageService = {
    addMessage: function (userid, content, callback) {
        messageDao.insert(userid, content, callback);
    },
    getMeeage: function (callback) {
        messageDao.getMessage(callback)
    }
}

module.exports = messageService;
