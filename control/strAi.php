<?php


header('Content-Type: text/html; charset=utf-8');
require_once 'phpanalysis.class.php';

class strAi{ //分词
    public $str = "";

    function __construct($str){
        $this->str = $str;
    }

    function strResult(){
        if($this->str != ''){
            //初始化类
            PhpAnalysis::$loadInit = false;
            $pa = new PhpAnalysis('utf-8', 'utf-8', true);
            
            //载入词典
            $pa->LoadDict();   
                
            //执行分词
            $pa->SetSource($this->str);
            
            $pa->StartAnalysis( true );
            $okresult = $pa->GetFinallyResult('%', false);
            
            $pa_foundWordStr = $pa->foundWordStr;
            
            return $okresult."%";
        }
    }
    
}

