<?php
    namespace app\controllers;

    use app\core\Controller;
    use app\models\Model_Main;
    use app\core\View;

    include "app/models/model_main.php";

    class Controller_Thanks extends Controller
    {
        function action_index() {
            $data = Model_Main::get_data(LANG);	
            $data['footer']	= Model_Main::get_footer(LANG);

            View::generate('thanks.twig', $data);
        }
        
    }
?>