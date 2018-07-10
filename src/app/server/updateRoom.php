<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');

    include("functions.php");

if (isset($_POST['broj']) &&  isset($_POST['naziv']) && isset($_POST['tv']) && isset($_POST['kvadrati']) && isset($_POST['kreveti']) && isset($_POST['id'])){
  $broj = $_POST['broj'];
  $naziv = $_POST['naziv'];
  $tv = intval($_POST['tv']);
  $kvadrati = $_POST['kvadrati'];
  $kreveti = $_POST['kreveti'];
  $id = $_POST['id'];

  if(isset($_POST['room_type_id']) && !empty($_POST['room_type_id'])){
    $room_type_id = intval($_POST['room_type_id']);
} else{
    $room_type_id = null;
}
  echo updateRoom($broj, $naziv, $tv, $kvadrati, $kreveti, $room_type_id, $id);
}

?>