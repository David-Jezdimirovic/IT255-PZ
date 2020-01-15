<?php
include("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    die();
}

function checkIfLoggedIn(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $token = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM users WHERE token=?");
        $result->bind_param("s",$token);
        $result->execute();
        $result->store_result();
        $num_rows = $result->num_rows;
         if($num_rows > 0)
        {
            return true;
        }
         else{
             return false;
         }
    }
    else{
        return false;
    }
}

function login($username, $password){
    global $conn;
    $rarray = array();
    if(checkLogin($username,$password)){
        $id = sha1(uniqid());
        $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
        $result2->bind_param("ss",$id,$username);
        $result2->execute();

        $rarray['token'] = $id;

        $admin = checkIsAdmin($id);
        $rarray['admin'] = $admin;

    //    $query = "SELECT admin FROM users WHERE username=".$username. "AND password=".$password;
    //    $result3 = mysql_query($query);
    //$rarray['admin'] = $result3;
       // if($result3 == true){
       //     $rarray['admin'] = 1;
       // }else{
       //     $rarray['admin'] = 0;
       // }
    } else{
        header('HTTP/1.1 401 Unauthorized');
        $rarray['error'] = "Invalid username/password";
    }
    return json_encode($rarray);
}



function checkIsAdmin($token) {
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT admin FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $admin = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $admin = $row['admin'];
        }
        return $admin;
    }
}



function checkLogin($username, $password){
    global $conn;
    $password = md5($password);
    $result = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $result->bind_param("ss",$username,$password);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}

function register2($username, $password, $firstname, $lastname, $admin){
    global $conn;
    $rarray = array();
    $errors = "";
    if(checkIfUserExists($username)){
    $errors .= "Username already exists\r\n";
    }
    if(strlen($username) < 5){
    $errors .= "Username must have at least 5 characters\r\n";
    }
    if(strlen($password) < 5){
    $errors .= "Password must have at least 5 characters\r\n";
    }
    if(strlen($firstname) < 3){
    $errors .= "First name must have at least 3 characters\r\n";
    }
    if(strlen($lastname) < 3){
    $errors .= "Last name must have at least 3 characters\r\n";
    }
    if($errors == ""){
        $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, username, password, admin) VALUES (?, ?, ?, ?, ?)");
        $pass =md5($password);
        $stmt->bind_param("ssssi", $firstname, $lastname, $username, $pass, $admin);
        if($stmt->execute()){
            $id = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
            $result2->bind_param("ss",$id,$username);
            $result2->execute();
            $rarray['token'] = $id;
        }else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    return json_encode($rarray);
}

function register($username, $password, $firstname, $lastname, $admin){
    global $conn;
    $rarray = array();
    $errors = "";
if(checkIfLoggedIn()){
    if(checkIfUserExists($username)){
    $errors .= "Username already exists\r\n";
    }
    if(strlen($username) < 5){
    $errors .= "Username must have at least 5 characters\r\n";
    }
    if(strlen($password) < 5){
    $errors .= "Password must have at least 5 characters\r\n";
    }
    if(strlen($firstname) < 3){
    $errors .= "First name must have at least 3 characters\r\n";
    }
    if(strlen($lastname) < 3){
    $errors .= "Last name must have at least 3 characters\r\n";
    }
    if($errors == ""){
        $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, username, password, admin) VALUES (?, ?, ?, ?, ?)");
        $pass =md5($password);
        $stmt->bind_param("ssssi", $firstname, $lastname, $username, $pass, $admin);
        if($stmt->execute()){
            $id = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE users SET token=? WHERE username=?");
            $result2->bind_param("ss",$id,$username);
            $result2->execute();
            $rarray['token'] = $id;
           $rarray['success'] = "ok";
        }else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else{
      
       header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
}else{
    $rarray['error'] = "Please log in";
    header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}



function checkIfUserExists($username){
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE username=?");
    $result->bind_param("s",$username);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}



function checkIfUserExists2($username,$id){
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE username=? AND id !=?");
    $result->bind_param("si",$username,$id);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}




function check_authorization($token, $admin_local, $for) {
  // $rarray=array();
    $admin = checkAdmin($token);
    if($admin == $for && $admin == $admin_local) {
        return true;
     // $rarray['provera']=true;
    } else {
       return false;
     // $rarray['provera']=false;
    }
 //   return json_encode($rarray);
}


function proveriAdmina($token) {
  
    $rarray=array();
 
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT admin FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $admin = array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $admin['admin'] = $row['admin'];
        }
      
       $rarray['admin'] = $admin;
    }

        return json_encode($rarray);
   
 
}






function addRoom($broj, $naziv, $tv, $kvadrati, $kreveti, $room_type_id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn() ){
        $stmt = $conn->prepare("INSERT INTO rooms (broj, naziv, tv, kvadrati, kreveti, room_type_id) VALUES (?,
        ?, ?, ?, ?, ?)");
        $stmt->bind_param("dsdddd",$broj, $naziv, $tv, $kvadrati, $kreveti, $room_type_id);
        if($stmt->execute()){
            $rarray['success'] = "ok";
        }else{
            $rarray['error'] = "Database connection error";
        }
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}


function getRooms(){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){ 
        
                             //"SELECT rooms.id, broj, naziv, tv, kvadrati, kreveti,  (SELECT tip FROM room_type WHERE id=rooms.room_type_id) as tip FROM rooms"
        $result = $conn->query("SELECT rooms.id,broj,naziv,tv,kvadrati,kreveti, tip from rooms,room_type where rooms.room_type_id=room_type.id ORDER BY rooms.broj ASC");
      
        $num_rows = $result->num_rows;
        
        $rooms = array();
        if($num_rows > 0)
        {                         //"SELECT rooms.id, broj, naziv, tv, kvadrati, kreveti,  (SELECT tip FROM room_type WHERE id=rooms.room_type_id) as tip FROM rooms"
            $result2 = $conn->query("SELECT rooms.id,broj,naziv,tv,kvadrati,kreveti, tip from rooms,room_type where rooms.room_type_id=room_type.id ORDER BY rooms.broj ASC");
           
            while($row = $result2->fetch_assoc()) {
                $one_room = array();
                $one_room['id'] = $row['id'];
                $one_room['broj'] = $row['broj'];
                $one_room['naziv'] = $row['naziv'];
                $one_room['tv'] = $row['tv'];
                $one_room['kvadrati'] = $row['kvadrati'];
                $one_room['kreveti'] = $row['kreveti'];
                $one_room['tip'] = $row['tip']; 
                array_push($rooms,$one_room);
            }
        }
        $rarray['rooms'] = $rooms;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}




function getRoom($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->query("SELECT rooms.id, broj, naziv, tv, kvadrati, kreveti, room_type_id, (SELECT tip FROM room_type WHERE id=rooms.room_type_id) as tip FROM rooms WHERE rooms.id=".$id);
        $num_rows = $result->num_rows;
        $rooms = array();
        if($num_rows > 0)
        {
            $result2 = $conn->query("SELECT rooms.id, broj, naziv, tv, kvadrati, kreveti, room_type_id (SELECT tip FROM room_type WHERE id=rooms.room_type_id) as tip FROM rooms WHERE rooms.id=".$id);
            while($row = $result2->fetch_assoc()) {
                $one_room = array();
                $one_room['id'] = $row['id'];
                $one_room['broj'] = $row['broj'];
                $one_room['naziv'] = $row['naziv'];
                $one_room['tv'] = $row['tv'];
                $one_room['kvadrati'] = $row['kvadrati'];
                $one_room['kreveti'] = $row['kreveti'];
                $one_room['room_type_id'] = $row['room_type_id']; 
                $one_room['tip'] = $row['tip']; 
                $rooms = $one_room;
            }
        }
        $rarray['room'] = $rooms;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}





function deleteRoom($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){

        $result = $conn->query("SELECT room_id FROM reservations WHERE room_id=".$id);
        $num_rows = $result->num_rows;
        
        if($num_rows > 0){
            header('HTTP/1.1 400 Bad request');
             $rarray['error'] = "Soba je rezervisana";
        }else{        
        $result2 = $conn->prepare("DELETE FROM rooms WHERE id=?");
        $result2->bind_param("i",$id);
        $result2->execute();
        $rarray['success'] = "Deleted successfully";
        }

    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}




function updateRoom($broj, $naziv, $tv, $kvadrati, $kreveti, $room_type_id, $id){ 
    global $conn;
     $rarray = array(); 
     if(checkIfLoggedIn()){
         
          $stmt = $conn->prepare("UPDATE rooms SET broj=?, naziv=?, tv=?, kvadrati=?, kreveti=?, room_type_id=? WHERE id=?");
           $stmt->bind_param("isiiiii", $broj, $naziv, $tv, $kvadrati, $kreveti, $room_type_id, $id); 
           if($stmt->execute()){
                $rarray['success'] = "updated";
             }else{
                  $rarray['error'] = "Database connection error";
                 } 
    } else{ 
        $rarray['error'] = "Please log in"; 
        header('HTTP/1.1 401 Unauthorized');
     } 
     return json_encode($rarray); 
    }



    function getRoomWithId($id){ 
        global $conn;
        $rarray = array();
         if(checkIfLoggedIn()){ 
            $id = $conn->real_escape_string($id);
            $result = $conn->query("SELECT rooms.id, broj, naziv, tv, kvadrati, kreveti,  (SELECT tip FROM room_type WHERE id=rooms.room_type_id) as tip FROM rooms WHERE rooms.id=".$id); 
            $num_rows = $result->num_rows;
             $rooms = array(); 

              if($num_rows > 0) {

                $result2 = $conn->query("SELECT rooms.id, broj, naziv, tv, kvadrati, kreveti,  (SELECT tip FROM room_type WHERE id=rooms.room_type_id) as tip FROM rooms WHERE rooms.id=".$id);
                while($row = $result2->fetch_assoc()) {
                    $rooms = $row;
                    } 
                 }
                $rarray['room'] = $rooms; 
                 return json_encode($rarray); 
         } else{ 
             $rarray['error'] = "Please log in"; 
             header('HTTP/1.1 401 Unauthorized');
              return json_encode($rarray); 
         }
                    
     }



function addRoomType($tip){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $stmt = $conn->prepare("INSERT INTO room_type (tip) VALUES (?)");
        $stmt->bind_param("s", $tip);
        if($stmt->execute()){
            $rarray['success'] = "ok";
        }else{
            $rarray['error'] = "Database connection error";
        }
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}

function getRoomTypes(){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->query("SELECT * FROM room_type");
        $num_rows = $result->num_rows;
        $room_types = array();
        if($num_rows > 0)
        {
            $result2 = $conn->query("SELECT * FROM room_type");
            while($row = $result2->fetch_assoc()) {
                $one_room = array();
                $one_room['id'] = $row['id'];
                $one_room['tip'] = $row['tip'];
                array_push($room_types,$one_room);
            }
        }
        $rarray['room_types'] = $room_types;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}



function getRoomType($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->query("SELECT * FROM room_type WHERE id=".$id);
        $num_rows = $result->num_rows;
        $room_type = array();
        if($num_rows > 0)
        {
            $result2 = $conn->query("SELECT * FROM room_type WHERE id=".$id);
            while($row = $result2->fetch_assoc()) {
                $one_room = array();
                $one_room['id'] = $row['id'];
                $one_room['tip'] = $row['tip'];
                 
                $room_type = $one_room;
            }
        }
        $rarray['type'] = $room_type;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

function updateRoomType($tip, $id){ 
    global $conn;
     $rarray = array(); 
     if(checkIfLoggedIn()){
          $stmt = $conn->prepare("UPDATE room_type SET tip=? WHERE id=?");
           $stmt->bind_param("si", $tip, $id); 
           if($stmt->execute()){
                $rarray['success'] = "updated";
             }else{
                  $rarray['error'] = "Database connection error";
                 } 
    } else{ 
        $rarray['error'] = "Please log in"; 
        header('HTTP/1.1 401 Unauthorized');
     } 
     return json_encode($rarray); 
    }

function deleteRoomType($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){

        $result = $conn->query("SELECT room_type_id FROM rooms WHERE room_type_id=".$id);
        $num_rows = $result->num_rows;
        
        if($num_rows > 0){
       //     header('HTTP/1.1 400 Bad request');
             $rarray['error'] = "Postoji soba sa ovim tipom";
        }else{
        $result2 = $conn->prepare("DELETE FROM room_type WHERE id=?");
        $result2->bind_param("i",$id);
        $result2->execute();
        $rarray['success'] = "Deleted successfully";
        }
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}





function getUsers(){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){ 
        
                            
        $result = $conn->query("SELECT id, firstname, lastname, username, admin from users");
      
        $num_rows = $result->num_rows;
        
        $users = array();
        if($num_rows > 0)
        {                         
            $result2 = $conn->query("SELECT id, firstname, lastname, username, admin from users");
           
            while($row = $result2->fetch_assoc()) {
                $one_user = array();
                $one_user['id'] = $row['id'];
                $one_user['firstname'] = $row['firstname'];
                $one_user['lastname'] = $row['lastname'];
                $one_user['username'] = $row['username'];
                $one_user['admin'] = $row['admin'];
                
                array_push($users,$one_user);
            }
        }
        $rarray['users'] = $users;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}



function getUser($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->query("SELECT id, firstname,lastname,username,admin FROM users WHERE id=".$id);
        $num_rows = $result->num_rows;
        $user = array();
        if($num_rows > 0)
        {
            $result2 = $conn->query("SELECT id, firstname,lastname,username,admin FROM users WHERE id=".$id);
            while($row = $result2->fetch_assoc()) {
                $one_user = array();
                $one_user['id'] = $row['id'];
                $one_user['firstname'] = $row['firstname'];
                $one_user['lastname'] = $row['lastname'];
                $one_user['username'] = $row['username'];
                $one_user['admin'] = $row['admin']; 
                $user = $one_user;
            }
        }
        $rarray['user'] = $user;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}


function updateUser($firstname, $lastname, $username, $admin, $id){ 
    global $conn;
     $rarray = array(); 
     $errors = "";
    if(checkIfUserExists2($username,$id)){
    $errors .= "Username already exists\r\n";
    }
    if(strlen($username) < 5){
    $errors .= "Username must have at least 5 characters\r\n";
    }
   // if(strlen($password) < 5){
   // $errors .= "Password must have at least 5 characters\r\n";
   // }
    if(strlen($firstname) < 3){
    $errors .= "First name must have at least 3 characters\r\n";
    }
    if(strlen($lastname) < 3){
    $errors .= "Last name must have at least 3 characters\r\n";
    }
     if(checkIfLoggedIn()){
        if($errors == ""){
          $stmt = $conn->prepare("UPDATE users SET firstname=?, lastname=?, username=?, admin=? WHERE id=?");
           $stmt->bind_param("sssii", $firstname, $lastname, $username, $admin, $id); 
           if($stmt->execute()){
                $rarray['success'] = "updated";
             }else{
                  $rarray['error'] = "Database connection error";
                 }
        } else{
                   
         header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
        } 

    } else{ 
        $rarray['error'] = "Please log in"; 
        header('HTTP/1.1 401 Unauthorized');
     } 
     return json_encode($rarray); 
    }



function deleteUser($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->query("SELECT user_id FROM reservations WHERE user_id=".$id);
        $num_rows = $result->num_rows;
        
        if($num_rows > 0){
       //     header('HTTP/1.1 400 Bad request');
             $rarray['error'] = "Korisnik ima rezervaciju";
        }else{
        $result2 = $conn->prepare("DELETE FROM users WHERE id=?");
        $result2->bind_param("i",$id);
        $result2->execute();
        $rarray['success'] = "Deleted successfully";
        }
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}





function reservation($id, $ime, $od, $do, $token){
    global $conn;
     $rarray = array(); 
     global $conn;
     $errors="";
     if(checkIfLoggedIn()){
        if(checkIsFree($id,$od,$do)){
            $errors .= "Soba je zauzeta u tom periodu\r\n";
            }
        if($od > $do){
            $errors .= "Datum zavrsetka ne moze biti pre datuma pocetka rezervacije\r\n";
        }
        if($od < date("Y-m-d") || $do < date("Y-m-d")){
            $errors .= "Datumi ne mogu biti raniiji od danasnjeg datuma\r\n";
        }

   //     $result = $conn->query("SELECT id,username FROM users WHERE token=".$token);
   //     $user = array();
   //     $num_rows = $result->num_rows;
   //         if($num_rows > 0){
   //             $result2 = $conn->query("SELECT username FROM users WHERE token=".$token);
   //         while($row = $result2->fetch_assoc()) {
  //              $one_user = array();
  //              $one_user['id'] = $row['id'];
  //              $one_user['username'] = $row['username'];
               
  //              $user = $one_user;
  //                   }
  //               }
                // $rarray['username']=$user;
             //    return json_encode($rarray);

        if($errors == ""){  
            $username = getUsername($token);

         $result3 = $conn->prepare("INSERT INTO reservations ( room_id, user_id, ime, date1, date2) VALUES (?,?,?,?,?)");
         $result3->bind_param("iisss", $id, $username['id'], $ime, $od, $do);
         $result3->execute();                                                   //$username
             }else{
               
                 header('HTTP/1.1 400 Bad request');
                  $rarray['error'] = json_encode($errors);
             }
        }else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);

}

function getUsername($token) {
    $token = str_replace('"', "", $token);
    global $conn;
    $query = 'SELECT id,username FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
    $username=array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $username['id'] = $row['id'];
            $username['username'] = $row['username'];
            //username = $row['username'];
        }
        return $username;
    }
}



function checkIsFree($id,$od,$do){
    global $conn;
     $rarray = array(); 
     global $conn;
     $result = $conn->prepare("SELECT * FROM reservations WHERE room_id=? AND date1 BETWEEN ? AND ? OR date2 BETWEEN ? AND ?");
    $result->bind_param("issss",$id,$od,$do,$od,$do);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}


function getReservations(){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){ 
        
                            
        $result = $conn->query("SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime,date1,date2 from users,rooms,reservations WHERE users.id=user_id AND rooms.id =room_id ");
      
        $num_rows = $result->num_rows;
        
        $reservations = array();
        if($num_rows > 0)
        {                         
            $result2 = $conn->query("SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime, DATE_FORMAT(date1, '%d. %m. %Y.') AS date1, DATE_FORMAT(date2, '%d. %m. %Y.') AS date2 from users,rooms,reservations WHERE users.id=user_id AND rooms.id =room_id ");
           
            while($row = $result2->fetch_assoc()) {
                $one_reservation = array();
                $one_reservation['id'] = $row['id'];
                $one_reservation['room_id'] = $row['room_id'];
                $one_reservation['broj'] = $row['broj'];
                $one_reservation['naziv'] = $row['naziv'];
                $one_reservation['user_id'] = $row['user_id'];
                $one_reservation['firstname'] = $row['firstname'];
                $one_reservation['lastname'] = $row['lastname'];
                $one_reservation['ime'] = $row['ime'];
                $one_reservation['date1'] = $row['date1'];
                $one_reservation['date2'] = $row['date2'];

                
                array_push($reservations,$one_reservation);
            }
        }
        $rarray['reservations'] = $reservations;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }

}






function getmyReservations($token){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){ 
        
     //  $token = str_replace('"', "", $token);
      $username = getUsername($token); 

        $result = $conn->query( "SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime,date1,date2 from reservations JOIN rooms ON reservations.room_id = rooms.id JOIN users ON reservations.user_id=users.id WHERE reservations.user_id=".$username['id'] );           
       // $result = $conn->query("SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime,date1,date2 from reservations,users,rooms WHERE reservations.user_id=users.id AND reservations.room_id=rooms.id  AND reservations.user_id=".$username['id']);
       
      
        $num_rows = $result->num_rows;
        
        $myreservations = array();
        if($num_rows > 0)
        {    
            $result2 = $conn->query("SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime, DATE_FORMAT(date1, '%d. %m. %Y.') AS date1, DATE_FORMAT(date2, '%d. %m. %Y.') AS date2 from reservations JOIN rooms ON reservations.room_id = rooms.id JOIN users ON reservations.user_id=users.id WHERE reservations.user_id=".$username['id'] );                                
           // $result2 = $conn->query("SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime, DATE_FORMAT(date1, '%d. %m. %Y.') AS date1, DATE_FORMAT(date2, '%d. %m. %Y.') AS date2 from reservations,users,rooms WHERE reservations.user_id=users.id AND reservations.room_id=rooms.id AND reservations.user_id=".$username['id']);

            while($row = $result2->fetch_assoc()) {
                $one_myreservation = array();
                $one_myreservation['id'] = $row['id'];
                $one_myreservation['room_id'] = $row['room_id'];
                $one_myreservation['broj'] = $row['broj'];
                $one_myreservation['naziv'] = $row['naziv'];
                $one_myreservation['user_id'] = $row['user_id'];
                $one_myreservation['firstname'] = $row['firstname'];
                $one_myreservation['lastname'] = $row['lastname'];
                $one_myreservation['ime'] = $row['ime'];
                $one_myreservation['date1'] = $row['date1'];
                $one_myreservation['date2'] = $row['date2'];

                
                array_push($myreservations,$one_myreservation);
            }
        }
        $rarray['myreservations'] = $myreservations;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }

}


function deleteReservation($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){
        $result = $conn->prepare("DELETE FROM reservations WHERE id=?");
        $result->bind_param("i",$id);
        $result->execute();
        $rarray['success'] = "Deleted successfully";
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
    }
    return json_encode($rarray);
}



function getReservation($id){
    global $conn;
    $rarray = array();
    if(checkIfLoggedIn()){ 
      //  $token = str_replace('"', "", $token);
                            
        $result = $conn->query("SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime,date1,date2 from users,rooms,reservations WHERE users.id=user_id AND rooms.id =room_id AND reservations.id=".$id);
      
        $num_rows = $result->num_rows;
        
        $reservation = array();
        if($num_rows > 0)
        {                         
            $result2 = $conn->query("SELECT reservations.id, room_id, broj, naziv, user_id, firstname, lastname, reservations.ime, DATE_FORMAT(date1, '%d. %m. %Y.') AS date1, DATE_FORMAT(date2, '%d. %m. %Y.') AS date2 from users,rooms,reservations WHERE users.id=user_id AND rooms.id =room_id AND reservations.id=".$id);
           
            while($row = $result2->fetch_assoc()) {
                $one_reservation = array();
                $one_reservation['id'] = $row['id'];
                $one_reservation['room_id'] = $row['room_id'];
                $one_reservation['broj'] = $row['broj'];
                $one_reservation['naziv'] = $row['naziv'];
                $one_reservation['user_id'] = $row['user_id'];
                $one_reservation['firstname'] = $row['firstname'];
                $one_reservation['lastname'] = $row['lastname'];
                $one_reservation['ime'] = $row['ime'];
                $one_reservation['date1'] = $row['date1'];
                $one_reservation['date2'] = $row['date2'];

                $reservation = $one_reservation;
               // array_push($myreservations,$one_myreservation);
            }
        }
        $rarray['reservation'] = $reservation;
        return json_encode($rarray);
    } else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }

}






function getName($token) {
   // $token = str_replace('"', "", $token);
    global $conn;
    $rarray=array();
    $query = 'SELECT username FROM users WHERE token = ?';
    $result = $conn->prepare($query);
    $result->bind_param('s', $token);
  
    $username=array();
    if ($result->execute()) {
        $result = $result->get_result();
        while ($row = $result->fetch_assoc()) {
            $one = array();
            $one['username'] = $row['username']; //vraca {usename:david}
            //username = $row['username']; //vraca samo david
            $username=$one;
        }
        $rarray['username'] = $username;
        return json_encode($rarray);
    }
}






function changePassword($sifra1,$sifra2,$token){

     global $conn;
        $rarray = array();
        $errors = "";
        
        if(checkIfLoggedIn()){

            $pass =md5($sifra1);
            $pass2 =md5($sifra2);

            if(!checkIfPasswordCorrect($pass,$token)){
                $errors .= "Trenutna sifra nije dobra\r\n";
            }
           
            if(strlen($sifra2) < 5){
                $errors .= "Password must have at least 5 characters\r\n";
            }
            
            if($errors == ""){
                $stmt = $conn->prepare("UPDATE users SET password=? WHERE password =? AND token =?");
               
                $stmt->bind_param("sss", $pass2, $pass, $token);
               
                if($stmt->execute()){
                    $rarray['success'] = "updated";
                
                }else{
                    header('HTTP/1.1 400 Bad request');
                    $rarray['error'] = "Database connection error";
                }
            }else{
          
                header('HTTP/1.1 400 Bad request');
                $rarray['error'] = json_encode($errors);
            }
        }else{
            $rarray['error'] = "Please log in";
            header('HTTP/1.1 401 Unauthorized');
        }
        return json_encode($rarray);



}


function checkIfPasswordCorrect($pass,$token){
    global $conn;
    $result = $conn->prepare("SELECT * FROM users WHERE password=? AND token=?");
    $result->bind_param("ss",$pass,$token);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{
        return false;
    }
}





?>
