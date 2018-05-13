<?php
    //web配置文件
    class webConfig{
        private $mysqlRoot = 'localhost';
        private $mysqlName  = 'root';
        private $mysqlKey  = '123456';
        private $mysqlDb   = 'taobaoquan';

        function getRoot(){
            return $this->mysqlRoot;
        }

        function getName(){
            return $this->mysqlName;
        }

        function getKey(){
            return $this->mysqlKey;
        }

        function getDb(){
            return $this->mysqlDb;
        }
        function setData($root,$name,$key,$db){
            $this->mysqlRoot = $root;
            $this->mysqlName = $name;
            $this->mysqlKey = $key;
            $this->mysqlDb = $db;
        }
    }
?>