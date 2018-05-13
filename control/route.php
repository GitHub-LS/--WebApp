<?php
    //namespace control;
    //url分析文件
    include_once("isUser.php");
    include_once("dataHandle.php");

    class route{
        private $myStr = null; //请求内容
        private $flag = null; //请求操作
        private $page = 0;  //请求页
        private $id = "";  //请求商品id
        private $myCookie = null; //请求cookie
        
        function run(){
            $this->myStr = @$_POST['str'];
            $this->flag = @$_POST['flag'];
            $this->page = @$_POST['page'];
            $this->id = @$_POST['id'];

            if(@$_POST['login'] == 'login'){
                $user = new isUser();
                $user->login();
            }else if(@$_POST['login'] == 'redister'){
                $user = new isUser();
                $user->register();
            }else if(@$_POST['login'] == 'judgeLogin'){
                $user = new isUser();
                $user->judgeUser();
            }else{
                $this->dataManage();
            }
            
        }

        function dataManage(){
            switch($this->flag){
                case 'get' : dataHandle::selectData($this->myStr,$this->page,$this->id); break;
                case 'updata' : dataHandle::updataData($this->myStr); break;
                case 'del' : dataHandle::delData($this->myStr); break;
                case 'add' : dataHandle::addData($this->myStr); break;
                default : exit(0);
            }
        }
    }
?>