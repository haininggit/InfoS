let friendId = $.cookie("friendId");
let pagenum = 1;

window.onload = function () {
    page(pagenum);
};

function page(page) {
    $.ajax({
        type: "POST",
        url: "user/personalInfoPage",
        data: {
            userId: userId,
            pageNum: page
        },
        success: function (result) {
            console.log(result.data);
            if (result.success) {
                document.getElementById("headp").src = result.data.user.userImg;
                // $("#headp").attr("src",result.data.user.userImg);//这里改大头像
                $("#nickname").text(result.data.user.userName);//这里改用户名
                $("#we-num").text(result.data.user.userMsgcount);//这里改说说数量
                $("#fans-num").text(result.data.user.userFans);//这里改粉丝数量
                pagenums = result.data.messageNums;//这里改页数
                let parentdiv = document.getElementsByClassName("blogs")[0];
                if (result.data.messages.length > 0) {
                    for (let i = 0; i < result.data.messages.length; i++) {
                        let article = document.createElement("li");
                        article.id = result.data.messages[i].message.messageId;
                        article.innerHTML = "<div class=\"blog-wrapper\">\n" +
                            "                                <!--个人信息分为左右两部分-->\n" +
                            "                                <div class=\"blog-user-info\">\n" +
                            "                                    <!--头像 昵称 发送时间-->\n" +
                            "                                    <div class=\"B-left\">\n" +
                            "                                        <div class=\"left-avatar\"><img src='" + result.data.user.userImg + "' alt = \"头像\"></div>\n" +
                            "                                        <div class=\"name-time\">\n" +
                            "                                            <h2 class=\"blog-nickname\">" + result.data.user.userName + "</h2>\n" +
                            "                                            <h3 class=\"send-time\">" + result.data.messages[i].message.messageCtime + "</h3>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"B-right\">\n" +
                            "                                        <a href = \"javascript:;\" class=\"fas-a\"><i class=\"fas fa-angle-down\"></i></a>\n" +
                            "                                        <!--设置 删除,下拉列表呈现-->\n" +
                            "                                        <div class=\"appear\">\n" +
                            "                                            <div class=\"blog-setting\">\n" +
                            "                                                <a href = \"javascript:;\">删除</a>\n" +
                            "                                                <a href = \"javascript:;\">置顶</a>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                </div>\n" +
                            "                                <!--动态正文-->\n" +
                            "                                <div class=\"blog-content\">\n" +
                            "                                    <p class=\"blog-text\" onclick='readArticle(this)'>\n" + result.data.messages[i].message.messageInfo + "</p>\n" +
                            "                                    <!-- 可能动态中只有文字 -->\n" +
                            "                                    <div class=\"blog-img-video\">\n" +
                            "                                    </div>\n" +
                            "                                </div>\n" +
                            "                                <!--评论 点赞等-->\n" +
                            "                                <!--评论 点赞等-->\n" +
                            "                                <div class=\"blog-views\">\n" +
                            "                                    <span>阅读&nbsp;<span class=\"read-num\">" + result.data.messages[i].message.messageReadNum + "</span></span>\n" +
                            "                                    <a href = \"javascript:;\" class=\"forward\">转发" + result.data.messages[i].message.messageReadNum + "</a>\n" +
                            "                                    <a href = \"javascript:;\" class=\"comment\">评论" + result.data.messages[i].message.messageCommentNum + "</a>\n" +
                            "                                    <a href = \"javascript:;\" class=\"praise\">点赞" + result.data.messages[i].message.messageAgreeNum + "</a>\n" +
                            "                                </div>\n" +
                            "                            </div>";
                        if (result.data.messages[i].imgs.length != 0) {
                            let blogimgvideo = $("#blog-img-video");
                            for (let j = 0; j < result.data.messages[i].imgs.length; j++) {
                                let images = document.createElement("img");
                                images.id = result.data.messages[i].imgs[j].imgUrl;
                                blogimgvideo.appendChild(images);
                            }
                        }
                        if (result.data.messages[i].video != null) {
                            let blogimgvideo = $("#blog-img-video");
                            let videos = document.createElement("video");
                            videos.id = result.data.messages[i].video.videoId;
                            videos.src = result.data.messages[i].video.videoUrl;
                            blogimgvideo.appendChild(videos);
                        }
                        parentdiv.appendChild(article);
                    }
                } else {
                    alert("他还没发表过任何动态");
                }
            } else {
                alert(result.errorMsg);
            }
        }
    })
}



function readArticle(obj) {
    let articleId = obj.parentNode.parentNode.parentNode.id;
    $.cookie("messageId", articleId);
    window.location.href = ""//改这里
}



