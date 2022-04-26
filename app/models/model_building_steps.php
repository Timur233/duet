<?php
    namespace app\models;

    class Model_Building_Steps extends Model
    {
        public static $lang = 'ru';

        public function get_steps($lang = 'ru') {
            self::$lang = $lang;
            $building_steps = self::getBuildingSteps();
            
            return self::sortDates($building_steps['entries']);
        }

        public function sortDates($array) {
            $sorted_array = [];
    
            foreach ($array as $item) {
                $item['timestamp'] = strtotime('01-' . $item['date']);
                $item['format_date'] = self::formatDate($item['date']);
                $item['preview'] = (!empty($item['preview']) && 
                    isset($item['preview'])) ? 
                    $item['preview'] : 
                    $item['gallery'][0]['styles'][0]['path'];

                array_push($sorted_array, $item);
            }
    
            usort($sorted_array, function($a, $b) { return $b['timestamp'] - $a['timestamp']; });
    
            return $sorted_array;
        }
    
        public function formatDate($date) {
            $months = array(
                '01' => 'January',
                '02' => 'February',
                '03' => 'March',
                '04' => 'April',
                '05' => 'May',
                '06' => 'June',
                '07' => 'July',
                '08' => 'August',
                '09' => 'September',
                '10' => 'October',
                '11' => 'November',
                '12' => 'December',
            );
            $dateArr = explode('-', $date);
        
            return array('month' => $months[$dateArr[0]], 'year' => $dateArr[1]);
            
            return $months[$dateArr[0]] . ' ' . $dateArr[1];
        }
    
        public function getBuildingSteps() {
            if (PROJECT_ID) {
                return Model::fetch('https://cms.abpx.kz/api/collections/get/building_steps', array(
                    'filter' => array(
                        'project' => PROJECT_ID
                    ),
                    'fields' => array(
                        '_id'  => 1,
                        'date' => 1,
                        'gallery' => 1,
                        'preview' => 1,
                    ),
                    'lang'   => self::$lang
                ));
            }
    
            return null;
        }
    }
?>