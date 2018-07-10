<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
include("functions.php");

  if(isset($_GET['token'])){
      $token = intval($_GET['token']);
      echo getmyReservations($token);
  }

?>