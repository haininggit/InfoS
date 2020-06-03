
var imgFile = []; //文件流
var imgSrc = []; //图片路径
var imgName = []; //图片名字
$(function(){
    // 鼠标经过显示删除按钮
    $('.content-img-list').on('mouseover','.content-img-list-item',function(){
        $(this).children('a').removeClass('hide');
    });
    // 鼠标离开隐藏删除按钮
    $('.content-img-list').on('mouseleave','.content-img-list-item',function(){
        $(this).children('a').addClass('hide');
    });
    // 单个图片删除
    $(".content-img-list").on("click",'.content-img-list-item a',function(){
        var index = $(this).attr("index");
        imgSrc.splice(index, 1);
        imgFile.splice(index, 1);
        imgName.splice(index, 1);
        var boxId = ".content-img-list";
        addNewContent(boxId);
        if(imgSrc.length<4){//显示上传按钮
            $('.content-img .file').show();
        }
    });
    //图片上传
    $('#upload').on('change',function(){

        if(imgSrc.length>=4){
            return alert("最多只能上传4张图片");
        }
        var imgSize = this.files[0].size;  //b
        if(imgSize>1024*1024*1){//1M
            return alert("上传图片不能超过1M");
        }
        console.log(this.files[0].type)
        if(this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg' && this.files[0].type != 'image/gif'){
            return alert("图片上传格式不正确");
        }

        var imgBox = '.content-img-list';
        var fileList = this.files;
        for(var i = 0; i < fileList.length; i++) {
            var imgSrcI = getObjectURL(fileList[i]);
            imgName.push(fileList[i].name);
            imgSrc.push(imgSrcI);
            imgFile.push(fileList[i]);
        }
        if(imgSrc.length==4){//隐藏上传按钮
            $('.content-img .file').hide();
        }
        addNewContent(imgBox);
        this.value = null;//解决无法上传相同图片的问题
    })

    //提交请求
    $('#btn-submit-upload').on('click',function(){
        // FormData上传图片
        var formFile = new FormData();
        // formFile.append("type", type);
        // formFile.append("content", content);
        // formFile.append("mobile", mobile);
        // 遍历图片imgFile添加到formFile里面
        $.each(imgFile, function(i, file){
            formFile.append('myFile[]', file);
        });
        console.log(imgFile)
        //    $.ajax({
        //        url: 'http://zhangykwww.yind123.com/webapi/feedback',
        //        type: 'POST',
        //        data: formFile,
        //        async: true,
        //        cache: false,
        //        contentType: false,
        //        processData: false,
        //        // traditional:true,
        //        dataType:'json',
        //        success: function(res) {
        //            console.log(res);
        //            if(res.code==0){
        //                alert("您的意见反馈已提交，感谢您的宝贵意见")
        //    //             $("#adviceContent").val("");
        // 			// $("#contact").val("");
        //            }else{
        //                alert(res.message);
        //                $('.content-img .file').show();
        //                $("#adviceContent").val("");
        //                $("#cotentLength").text("0/240");
        // 			$("#contact").val("");
        // 			imgSrc = [];imgFile = [];imgName = [];
        // addNewContent(".content-img-list");

        // $('.success-tips').removeClass('hide');
        //      	var time = 3;
        //      	var tipTimer = setInterval(function(){
        //      		time--;
        //      		if(time==0){
        //      			$('.success-tips').addClass('hide');
        //      			$('.success-tips .timer').text('3s');
        //      			clearInterval(tipTimer);
        //      		}else{
        //      			$('.success-tips .timer').text(time+'s');
        //      		}
        //      	},1000);
        //            }
        //        }
        //    })
    });

});

//删除
function removeImg(obj, index) {
    imgSrc.splice(index, 1);
    imgFile.splice(index, 1);
    imgName.splice(index, 1);
    var boxId = ".content-img-list";
    addNewContent(boxId);
}

//图片展示
function addNewContent(obj) {
    $(obj).html("");
    for(var a = 0; a < imgSrc.length; a++) {
        var oldBox = $(obj).html();
        $(obj).html(oldBox + '<li class="content-img-list-item"><img src="'+imgSrc[a]+'" alt=""><a index="'+a+'" class="hide delete-btn"><i class="ico-delete"></i></a></li>');
    }
}

//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;


}


window.onload = function () {
    let userId = $.cookie("userId");
    $.ajax({
        type: "POST",
        url: "message/messageInfoPage",//改这里
        data: {
            userId: userId,
        },
        success: function (result) {
            console.log(result.data);
            if (result.success) {
                document.getElementById("headp").src = result.data.user.userImg;
                $("#usernickname").text(result.data.user.userName);//这里改用户名
                $("#we-num").text(result.data.user.userMsgcount);//这里改说说数量
                $("#fans-num").text(result.data.user.userFans);//这里改粉丝数量
                $("#follow-num").text(result.data.user.followCount);//这里改粉丝数量
                let parentdiv = document.getElementsByClassName("blogs")[0];

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
                        "                                                <a href = \"javascript:;\" onclick='deletemessage(this)'>删除</a>\n" +
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
                alert(result.errorMsg);
            }
        }
    })

};
