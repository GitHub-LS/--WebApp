function openMsgTip(){
    $("#msgTip").css({"display":"block"});
}

$("#close").click(function(){
    closeMsgTip();
});
function closeMsgTip(){
    $("#msgTip").css({"display":"none"});
}

$(document).ready(function(){
    $("#topBar .prePage").click(function(){
        //console.log(window.parent.$("#newWindow").attr("src"));
        var iframeWidth = window.parent.$("#newWindow").width();
        window.parent.$("#newWindow").css({'left':iframeWidth});
    });

});