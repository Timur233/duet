<?php
    namespace app\controllers;

    use app\core\Controller;
    use app\models\Model_Building_Steps;
    use app\models\Model_Filter;
    use app\models\Model_Main;
    use app\core\View;

    include "app/models/model_filter.php";
    include "app/models/model_building_steps.php";

    class Controller_Main extends Controller
    {
        function action_index() {
            $data = Model_Main::get_data(LANG);	

            $params = array(
                'filter' => [],
                'sort'   => [
                    'rooms'  => 1,
                    'square' => 1
                ]
            );
            $data['offers'] = json_encode(Model_Filter::filter_by_params(LANG, $params)['entries']);
            $data['theme'] = 'white';

            $data['footer']	= Model_Main::get_footer(LANG);

            array_unshift($data['footer']['contacts_list'], array(
                'isActive' => 1,
                'title' => 'Exclusive Duet',
                'address' => $data['site_adress'],
                'site' => 'ex-duet.kz',
                'phones' => array(
                    $data['site_phone'],
                )
            ));

            if (PROJECT_ID !== ''):
                $data['building_steps'] = Model_Building_Steps::get_steps(LANG);
            endif;

            View::generate('index.twig', $data);
        }
        
    }
?>