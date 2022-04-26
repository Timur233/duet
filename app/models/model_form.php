<?php
    namespace app\models;

    use app\core\Model;

    class Model_Form extends Model
    {
        function send_form ($lang = 'ru', $form_body) {	
            return Model::fetch('https://cms.abpx.kz/api/forms/submit/' . FORM_NAME, $form_body);
        }
    }
?>