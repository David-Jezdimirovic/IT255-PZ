<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');

    include("functions.php");

if (isset($_POST['sifra1']) &&  isset($_POST['sifra2']) && isset($_POST['token'])){
  $sifra1 = $_POST['sifra1'];
  $sifra2 = $_POST['sifra2'];
  $token = ($_POST['token']);
 

 
  echo changePassword($sifra1,$sifra2,$token);

 
}
?>