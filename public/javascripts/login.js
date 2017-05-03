/**
 * Created by admin on 16-3-31.
 */

    $(function(){
        $("#btn_login").on("click",function(){
            login.checkLogin();
        });
    });


var login = login || {};

login.getParam = function () {
    var userName = $("#userName").val();
    var password = $("#password").val();
    return {
        userName: userName,
        password: password
    };
};

login.checkLogin = function () {
    $.ajax({
        url: this.checkLoginUrl,
        data: this.getParam(),
        dataType: "json",
        type:"post",
        success: function (res) {
            if (res.code == -1) {
                alert(res.msg);
            }else{
                location.reload();
            }
        },
        error: function () {

        }
    });
}

login.checkLoginUrl = "/login/checkLogin";