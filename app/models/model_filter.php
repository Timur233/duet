<?php
    namespace app\models;

    use app\core\Model;

    class Model_Filter extends Model {
        public function filter_by_params($lang = 'ru', $params) {	
            return Model::fetch('https://cms.abpx.kz/api/collections/get/' . FLATS_COLLECTION, $params);
        }
    }
?>