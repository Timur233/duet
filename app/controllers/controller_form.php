<?php
    namespace app\controllers;

    use app\core\Controller;
    use app\core\View;
    use app\models\Model_Form;
    use app\models\Model_Main;

    include "app/models/model_main.php";

    class Controller_Form extends Controller {

        function __construct() {
            $this->query = json_decode(file_get_contents('php://input'), true);
        }
        
        function action_index() {        
        }

        function action_send() {
            
            $form_body = [];
            
            foreach ($this->query as $input) {
                $form_body['form'][$input['name']] = $input['data'];
            }

            return self::render_responce(Model_Form::send_form(LANG, $form_body));

        }

        function render_responce($data) {
            
            $site = Model_Main::get_data(LANG);

            $viewData = array(
                'userName'    => $data['Имя'],
                'translater'  => $site['translate'],
                'isPresent'   => false
            );

            return View::generate('widgets/thanks-msg.twig', $viewData);
        }
        
    }
?>