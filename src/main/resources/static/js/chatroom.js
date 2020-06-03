
let comId = $.cookie("userId");
let socket = null;
onload = function () {
    socket = new WebSocket("ws:localhost:80//websocket/" + comId);
    socket.onopen = function () {
        console.log("454546")
    }
    socket.onmessage = function (data) {
        console.log("data:" + data)
        var record = JSON.parse(data.data);
        var li = "<li style='width: 60%;height: auto;font-size: 25px;display: block;float: left;font-style: normal;'>" + record.comUserId + ":" + record.message + "</li>"
        $("#user-right").append(li);
    }


    $.ajax({
            url: "user/getAllUser",
            type: "POST",
            data: {},
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userId != comId) {
                        var li = "   <li onclick='chat(this)'>\n" +
                            "                        <div class=\"user-avatar-wrapper\">\n" +
                            "                            <a href=\"javascript:;\"><img src=\"./images/avatar.jpg\" alt=\"头像\"></a>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"user-info\">\n" +
                            "                            <div class=\"user-info-top\">\n" +
                            "                                <a href=\"javascript:;\">\n" +
                            "                                    <div class=\"user-name\">" + data[i].userId + "</div>\n" +
                            "                                </a>\n" +
                            "                                <div class=\"time\">05-25</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"user-info-content\">【签到提醒】</div>\n" +
                            "                        </div>\n" +
                            "                    </li>\n"
                        $("#left-userList").append(li);
                    }
                }
            },
            error: function () {
                console.log("400000000000")
            }

        }
    )

}
$("#send").click(function () {
    var text = $("#text-mes").val();
    console.log("text:" + text)
    var toId = $("#friend_id").text();
    var data = {
        toUserId: toId,
        comUserId: comId,
        message: text,
        recordTime: new Date()
    }
    var li = "<li style='width: 60%;height: auto;font-size: 25px;display: block;float: right;font-style: normal;background-color:pink;" +
        "text-align: right;line-height: 25px'>"+ data.message+":"  + + data.comUserId +  "</li>"
    $("#user-right").append(li);
    socket.send(JSON.stringify(data))
})

function chat(obj) {
    console.log("hgkjhhhhhhhhhhhhhh.....................")
    var userId = obj.children[1].children[0].children[0].children[0].innerHTML;
    $("#friend_id").html(userId)
    $("#user-right").html("")
}