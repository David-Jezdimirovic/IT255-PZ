<?php
header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Headers: X-Requested-With');
header("Content-type: application/json");

    $sobe = array(
     array('broj' => 23, 'kvadrati' => 30, 'kreveti' => 1 ),  
     array('broj' => 12, 'kvadrati' => 50, 'kreveti' => 3 ), 
     array('broj' => 3, 'kvadrati' => 40, 'kreveti' => 2 ),   
     array('broj' => 42, 'kvadrati' => 70, 'kreveti' => 4 ),  
     
   
    );
	

	echo json_encode($sobe);
?>