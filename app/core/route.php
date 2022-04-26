<?php
    class Route
    {
        static $langs = [
            'list'     => array(
                'ru',
                'kk'
            ),
            'selected' => 'ru'            
        ];

        static function getLang($link) {
            $routes = explode('/', $link);

            foreach (Route::$langs['list'] as $lang) {
                if (isset($routes[1]) && $lang === $routes[1]) {
                    Route::$langs['selected'] = $lang;
                    define('LANG', $lang);

                    unset($routes[1]);


                    return implode('/', $routes);
                }
            }

            define('LANG', 'ru');
            
            return $link;
        }

        static function start()
        {
            // контроллер и действие по умолчанию
            $controller_name = 'Main';
            $action_name = 'index';

            $base_link = str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']);
            $link = str_replace($base_link, '', $_SERVER['REQUEST_URI']);
            $link = preg_replace(['/\/\?.*/', '/\?.*/'], '', $link);
            $link = Route::getLang($link);

            $routes = explode('/', $link);  
            
            // получаем имя контроллера
            if ( !empty($routes[1]) )
            {	
                $controller_name = $routes[1];
            }
            
            // получаем имя экшена
            if ( !empty($routes[2]) )
            {
                $action_name = $routes[2];
            }
    
            // добавляем префиксы
            $model_name = 'Model_'.$controller_name;
            $controller_name = 'Controller_'.$controller_name;
            $action_name = 'action_'.$action_name;
    
            // подцепляем файл с классом модели (файла модели может и не быть)
            $model_file = strtolower($model_name).'.php';
            $model_path = "app/models/".$model_file;
            if(file_exists($model_path))
            {
                include "app/models/".$model_file;
            }
    
            // подцепляем файл с классом контроллера
            $controller_file = strtolower($controller_name).'.php';
            $controller_path = "app/controllers/".$controller_file;
            if(file_exists($controller_path))
            {
                include "app/controllers/".$controller_file;
            }
            else
            {
                /*
                правильно было бы кинуть здесь исключение,
                но для упрощения сразу сделаем редирект на страницу 404
                */
                Route::ErrorPage404();
            }
            
            // создаем контроллер
            $controller_namespace = "app\\controllers\\{$controller_name}";
            $controller = new $controller_namespace;
            $action = $action_name;
            
            if(method_exists($controller, $action))
            {
                // вызываем действие контроллера
                $controller->$action();
            }
            else
            {
                // здесь также разумнее было бы кинуть исключение
                Route::ErrorPage404();
            }
        
        }
        
        function ErrorPage404()
        {
            $host = 'https://'.$_SERVER['HTTP_HOST'].'/';
            header('HTTP/1.1 404 Not Found');
            header("Status: 404 Not Found");
            header('Location:'.$host.'404');

            exit;
        }
    }
?>