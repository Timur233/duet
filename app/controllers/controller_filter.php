<?php
    namespace app\controllers;

    use app\models\Model_Filter;
    use app\core\Controller;

    class Controller_Filter extends Controller
    {

        function __construct()
        {
            $this->query = json_decode(file_get_contents('php://input'), true);
        }
        
        function action_index()
        {          
            $params = array(
                'filter' => [],
                'sort'   => [
                    'rooms'  => 1,
                    'square' => 1
                ]
            );

            if (isset($this->query['rooms'])) { $params['filter']['rooms'] = $this->query['rooms']; }
            if (isset($this->query['floors'])) { $params['filter']['floors'] = $this->query['floors']; }
            if (isset($this->query['square'])) { $params['filter']['square'] = $this->query['square']; }

            $data = Model_Filter::filter_by_params(LANG, $params);
            $data['params'] = $params;

            print_r(
                json_encode(
                    $data
                )
            );

            exit;
        }
        
    }
?>