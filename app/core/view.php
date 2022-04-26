<?php
    namespace app\core;
    
    class View {
        function generate($template_view, $data = null) {

            $loader = new \Twig\Loader\FilesystemLoader('app/views/');
            $twig = new \Twig\Environment($loader, [
                'cache' 	  => 'cache/',
                'auto_reload' => true //true что бы автоматически чистить кэш
            ]);
            
            $template = $twig->load($template_view);

            $data['base_url'] = BASE_URL;
            $data['lang']     = LANG;

            echo $template->render($data);

        }
    }
?>