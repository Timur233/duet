<?php
    namespace app\core;

    class Model
    {
        public function fetch($url, $params = array()) {

            $ch = curl_init($url . '?token=account-' . SING_TOKEN);
          
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json'
            ));
          
            if (!empty($params)) {
              curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
            }
          
            $responce = curl_exec($ch);
            curl_close($ch);
          
            return json_decode($responce, true);
          
        }
        
    }
?>