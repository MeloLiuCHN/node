/**
 * Created by admin on 16-4-1.
 */

var messageService = require("./service/messageService");

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

var chat = {
    connect: function () {
        global.socket.on('connection', function (socket) {
            console.log('a user connected');

            //监听新用户加入
            socket.on('inRoom', function (obj) {
                //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
                socket.name = obj.userid;

                //检查在线列表，如果不在里面就加入
                if (!onlineUsers.hasOwnProperty(obj.userid)) {
                    onlineUsers[obj.userid] = obj.username;
                    //在线人数+1
                    onlineCount++;
                }
               // messageService.getMeeage(function (contentList) {
                    //向所有客户端广播用户加入
                    global.socket.emit('login_in', {onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj});
                    console.log(obj.username + '加入了聊天室');
               // })

            });

            //监听用户退出
            socket.on('disconnect', function () {
                //将退出的用户从在线列表中删除
                if (onlineUsers.hasOwnProperty(socket.name)) {
                    //退出用户的信息
                    var obj = {userid: socket.name, username: onlineUsers[socket.name]};

                    //删除
                    delete onlineUsers[socket.name];
                    //在线人数-1
                    onlineCount--;

                    //向所有客户端广播用户退出
                    global.socket.emit('logout', {onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj});
                    console.log(obj.username + '退出了聊天室');
                }
            });

            //监听用户发布聊天内容
            socket.on('message', function (obj) {
                //向所有客户端广播发布的消息
                global.socket.emit('message', obj);
                messageService.addMessage(obj.userid, obj.content, function () {
                    console.log(obj.username + '说：' + obj.content);
                });
            });

        });
    }
}

module.exports = chat;
