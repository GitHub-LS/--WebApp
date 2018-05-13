<?php
    //数据库链接文件
    include_once('webConfig.php');

    class mySqlContant{
        function mysqlCon(){
            //1.new一个 mysqli(host,username,passwd,dbname,port)对象 ====等同于建立连接
            //2.定义sql语句
            //3.调用mysqli 对象  的  query($sql)方法并得到其返回结果值
            //4.调用mysqli 对象 的 close()方法关闭连接
            $web = new webConfig();
            $mysqli = new mysqli($web->getRoot(),$web->getName(),$web->getKey(),$web->getDb(),'3306');
            $mysqli -> query('set names utf8');

            return $mysqli;
        }
    }
?>