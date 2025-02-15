<?php
session_start();
include("signup.html");
if (isset($_POST["submit"])) {
    $gmail=null;
    $username=null;
    $password=null;
    $confirm=null;
    $gmail=$_POST["gmail"];
    $username=$_POST["username"];
    $password=$_POST["password"];
    $confirm=$_POST["confirm"];
    if ($gmail!=null && $username!=null && $password!=null && $confirm!=null) {
        $_SESSION["gmail"]=$_POST["gmail"];
        $_SESSION["username"]=$_POST["username"];
        $_SESSION["password"]=$_POST["password"];
        echo '<script>window.location.href = "login.php";</script>';
    }
}
?>