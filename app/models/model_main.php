<?php
    namespace app\models;

    use app\core\Model;

    class Model_Main extends Model
    {
        function get_data($lang = 'ru') {	
            return Model::fetch('https://cms.abpx.kz/api/singletons/get/'.SINGLETON, array('lang' => $lang));
        }

        function get_footer($lang = 'ru') {	
            return Model::fetch('https://cms.abpx.kz/api/singletons/get/main_footer', array('lang' => $lang));
        }
    }
?>