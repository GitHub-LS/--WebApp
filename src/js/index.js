$(document).ready(function(){
    

    //底部导航点击事件
    $("#link ul li").click(function(){
        var oldId = "#link ul li[name='" + $("#link ul").attr("name") + "']";
        var newObj = $(this);

        if(!$(oldId).is(newObj)){
            selectedStyle($(oldId),newObj);
            $("#link ul").attr("name",newObj.attr("name"));

            var theSrc ="src/htmls/bottomLink/" + $(this).attr("name") + ".html";
            $("#view iframe").attr("src",theSrc);
        }
        
    });

    //选中检测
    function selectedStyle(oldObj,newObj){
        var oldSrc = 'src/images/icon/' + oldObj.attr("name") + ".png";
        var newSrc = 'src/images/icon/c-' + newObj.attr("name") + ".png";

        oldObj.children("img").attr("src",oldSrc);
        newObj.children("img").attr("src",newSrc);
        
        oldObj.css({"color":"#666"});
        newObj.css({"color":"#ff7891"});
    }

    //link按钮切换动画
    function linkButAnimate(){

    }
});