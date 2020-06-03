window.onload = function () {
    let userId = $.cookie("userId");
    $.ajax({
        type: "POST",
        url: "relation/relationInfoPage",//改这里的路径
        data: {userId: userId},//
        success: function (result) {
            if (result.success) {
                $("#myheadp").attr("src", "result.data.user.userImg");
                $("#userName").val(result.data.user.userName);
                $("#userPersonalized").val(result.data.user.userPersonalized);
                let friendlist = $("#friendlist");
                for (let i = 0; i < result.data.followCount; i++) {//改这里的人数
                    let friend = document.createElement("div");
                    friend.className = "friend";
                    friend.innerHTML = "<div class=\"friend_left\">\n" +
                        "                        <img src='"+result.data.users[i].userImg+"' alt=\"\">\n" +//改这里
                        "                    </div>\n" +
                        "                    <div class=\"friend_right\">\n" +
                        "                        <li><a>"+result.data.users.userName+"</a></li>\n" +
                        "                        <li><a>互相关注</a></li>\n" +
                        "                        <li><a>"+result.data.users.userPersonalized+"</a></li>\n" +
                        "                        <li><a>通过<font color=\"#ff6025\">微博推荐</font> 关注</a></li>\n" +
                        "                    </div>"
                    friendlist.appendChild(friend);
                }
            }
        }
    });
};

function person(obj) {
    let friendId = document.getElementById(obj);
    $.cookie(friendId, friendId);
    window.location.href="../friend.html";
    // let userId = $.cookie("userId");
}