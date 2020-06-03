$("#sysMessage").click(
    function () {
        var div = document.createElement("div");
        div.className = "sysMessage";
        var select = document.createElement("select");
        select.innerHTML = "  <option value=\"1\">@我的</option>\n" +
            "    <option value=\"1\">评论</option>\n" +
            "    <option value=\"1\">私信</option>\n" +
            "    <option value=\"1\">消息设置</option>";
        div.append(select);
      this.styl
        this.parentNode.append(div);
    }
)