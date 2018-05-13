<?php
    //API入口脚本文件
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    //首先判断身份，不符合直接拒绝，符合继续执行下一步
    include_once("route.php");
    //use control\route as myRoute;
    

    
    $route = new route();
    $route->run();
?>