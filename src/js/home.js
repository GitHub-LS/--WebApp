$(document).ready(function () {
    //获取商品精选推荐数据
    var shopCount = 10;
    var getRequest = true;
    $("#theMain").scroll(function(){
        nowObj = $(this);
        var tempHeight = this.scrollHeight - $(this).scrollTop() - $(this).height();
        if(tempHeight < 50 && getRequest && shopCount <= 200){
            getSelectedShopData(shopCount);
            shopCount += 10;
            getRequest = false;
        }
    });

    getSelectedShopData(0);
    function getSelectedShopData(page) {

        $.ajax({
            url: '../../../control/entrance.php',
            type: 'post',
            dataType:'JSON',
            data: {
                flag:"get",
                str:"classifyShop",
                page:page,
                id:'0'
            },
            success: function (data) {
                //console.log(data);
                $.each(data,function(n,val){
                    if(n % 2){
                        $(".list1").append(initShopData(val));
                    }else{
                        $(".list2").append(initShopData(val));
                    }
                });
                $("#shopList .list .shopTools .theTicket").click(function(){
                    $(".getTicket a").attr("href",$(this).attr("name"));
                    openMsgTip();
                });
                getRequest = true;
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function initShopData(data) {
        var html = '<li>' +
                        '<div class="shopImg"><a href="javascript:void(0)" onclick="openIframe(\'src/htmls/otherLink/shopinfo.html?id=' + data['ShopId'] + '\')"><img src="' + data['ShopImgUrl'] + '" alt=""></a></div>' +
                        '<div class="shopTitle"><a href="javascript:void(0)" onclick="openIframe(\'src/htmls/otherLink/shopinfo.html?id=' + data['ShopId'] + '\')">' + data['ShopName'] + '</a></div>' +
                        '<div class="shopTools"><span>￥<yp>' + (data['ShopPrice'] - parseInt(data['CardPrice'].substr(data['CardPrice'].indexOf("减") + 1))).toFixed(2) + '</yp> <sp> ' + data['ShopPrice'] + '</sp></span><div class="theTicket" name="'+ data['CardUrlShort'] + '">领券</div></div>' +
                    '</li>';

        return html;
    }


    //打开iframe
    $("#openIframe").click(function(){
        openIframe("src/htmls/otherLink/search.html");
    });
});