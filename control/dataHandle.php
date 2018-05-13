<?php
    //主要功能实现文件
    include_once('mysqlContant.php');
    include_once("strAi.php");

    class dataHandle{
        //增

        //删

        //改

        //查
        function addData(){

        }

        function updata(){

        }

        function delData(){

        }

        function selectData($myStr,$page,$id){
            $sql = 'null';
            $pageStart = (int)$page;
            $arr = array();
            
            $ai = new strAi(@$_POST['request']);  //创建分词实例，并且导入字符串
        
            $strResult = $ai->strResult();  //获取分词后的结果

            $mysqlCon = mySqlContant::mysqlCon();   //连接数据库

            if($id == 0){
                $id = "Ifashion != '".$id."'";
            }else if($myStr == "classifyShop"){
                $myStr = "home";
            }

            switch($myStr){
                case "home" : $sql = "SELECT `ShopId`,`CardUrlShort`,`ShopImgUrl`,`ShopName`,`ShopPrice`,`CardPrice` FROM `shop` WHERE CardCount != 0 AND Classify = '".$id."' LIMIT $pageStart,10"; break;
                case "shopInfo" : $sql = "SELECT `MyUrlShort`,`CardUrlShort`,`ShopImgUrl`,`ShopName`,`ShopPrice`,`CardPrice` FROM `shop` WHERE ShopId = '".$id."'"; break;
                case "classifyShop" : $sql = "SELECT `ShopId`,`CardUrlShort`,`ShopImgUrl`,`ShopName`,`ShopPrice`,`CardPrice` FROM `shop` WHERE ".$id." LIMIT ".$pageStart.",10"; break;
                case "search" : $sql = "SELECT `ShopId`,`CardUrlShort`,`ShopImgUrl`,`ShopName`,`ShopPrice`,`CardPrice` FROM `shop` WHERE ShopName like '".$strResult."' LIMIT $pageStart,10"; break;
                default : $sql = "";
            }
            //echo $sql;
            $result = $mysqlCon->query($sql);
            $i = 0;
            while($temp = mysqli_fetch_array($result,MYSQL_ASSOC)){
                $arr[$i] = $temp;
                $i++;
            }
            echo json_encode($arr);
        }
    }
?>