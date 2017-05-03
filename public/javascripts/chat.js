/**
 * Created by admin on 16-4-1.
 */
var socket;

$(function () {
    var user = {
        userid: $("#btn-send").attr("data-code"),
        username: $("#btn-send").attr("data-value")
    }
    online.setUser(user);
    socket = io.connect();
    socket.emit("inRoom", user);

    socket.on("login_in", function (res) {
        online.updateUserList(res);
    });

    socket.on("logout", function (res) {
        online.updateUserList(res);
    });

    socket.on("message", function (obj) {
        online.newMessage(obj);
    });

    $("#btn-send").on("click", function () {
        online.sendMsg(user);
    });
    $(document).on("keydown", function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            online.sendMsg(user);
        }
    });

    online.init();
})

var online = online || {};
online.setUser = function (user) {
    this.user = user;
}
online.newMessage = function (obj) {
    $class = "";
    $text_algin = "";
    $img_url = "";
    if (this.user.userid == obj.userid) {
        $class = " am-comment-flip am-comment-danger";
        $text_algin = " content-right";
        $img_url = "/images/1.jpg";
    } else {
        $class = " am-comment-highlight";
        $img_url = "/images/2.jpg";
    }
    $div = "<li class='am-comment " + $class + "'><a href='#link-to-user-home'>"
        + "<img src='" + $img_url + "' alt='' class='am-comment-avatar' width='48' height='48'></a>"
        + "<div class='am-comment-main'><header class='am-comment-hd'>"
        + "<div class='am-comment-meta " + $text_algin + "'><a href='' class='am-comment-author'>" + obj.username + "</a></div>"
        + "</header><div class='am-comment-bd " + $text_algin + "'><p><a href=''></a> " + obj.content + "</p></div></div></li>"
    $("#content_box").append($div);
    this.scrollTop();
}

online.sendMsg = function (user) {
    user.content = $.trim($("#content").val());
    if (!user.content) {
        $("#content").focus();
        return;
    }
    socket.emit("message", user);
    $("#content").val("");
}

online.updateUserList = function (obj) {
    var li = "";
    for (var key in obj.onlineUsers) {
        li += "<li data-code='" + key + "' style='text-align: center;padding:7px 0px;'>" + obj.onlineUsers[key] + "</li>";
    }
    $("#user_list").html(li)
    $("#user_num").html("在线人数：" + obj.onlineCount);
}

online.scrollTop = function () {
    var li = $("#content_box").find("li");
    if (li.length > 15) {
        $("#content_box").find("li").first().remove();
    }
    var windowHeight = parseInt($("body").css("height"));//整个页面的高度
    $("html,body").animate({ "scrollTop": windowHeight }, 1000);
}
online.init = function () {
    var _this =this;
    $.ajax({
        url: "message",
        data: null,
        dataType: "text",
        type: "get",
        success: function (res) {
         //   console.log(res);
            $("#content_box").html(res)
            _this.scrollTop();
        },
        error: function () {

        }
    });
}
