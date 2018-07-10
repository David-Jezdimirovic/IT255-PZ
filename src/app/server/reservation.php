<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');

include("functions.php");

if (isset($_POST['id']) && isset($_POST['ime']) && isset($_POST['od']) && isset($_POST['do']) && isset($_POST['token'])){

  $id = $_POST['id'];
  $ime = $_POST['ime'];
  $od = $_POST['od'];
  $do = ($_POST['do']);
  $token = ($_POST['token']);

  echo reservation($id,$ime,$od,$do,$token);
  
}
?>