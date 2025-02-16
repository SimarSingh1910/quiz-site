<?php
session_start();
include("login.html");
if (isset($_POST["submit_login"])) {
    $username_login=$_POST["username_login"];
    $password_login=$_POST["password_login"];
    if($username_login==$_SESSION["username"] && $password_login==$_SESSION["password"]){
        echo '<script>alert("YOU HAVE SUCCESSFULLY LOGGED IN!!!!!");</script>';
    }
}
?>