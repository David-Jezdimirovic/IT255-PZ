<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');

    include("functions.php");

if (isset($_POST['firstName']) &&  isset($_POST['lastName']) && isset($_POST['username']) && isset($_POST['admin']) && isset($_POST['id'])){
  $firstname = $_POST['firstName'];
  $lastname = $_POST['lastName'];
  $username = $_POST['username'];
  $admin = intval($_POST['admin']);
  $id = $_POST['id'];

  
  echo updateUser($firstname, $lastname, $username, $admin, $id);
}

?>