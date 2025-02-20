<?php

session_start();
include("login.html");
include("database.php");

if (isset($_POST["submit_login"])) {
    
    $username_login = $_POST["username_login"];
    $password_login = $_POST["password_login"];

    $sql_query = "SELECT * FROM users WHERE username = '$username_login'";

    $result = mysqli_query($conn, $sql_query);
    $row = mysqli_fetch_assoc($result);

    if ($username_login == $row["username"] && password_verify($password_login, $row["password"])) {
        $_SESSION['user'] = ['name' => $username_login , 'email' => $row["email"]];
        echo '<script>window.location.replace("/voting-system/home/home.html");</script>';
    }
    else {
        echo '<script>
                incorrect_box.style.display = "block";
                incorrect.textContent = "Username/Password is incorrect";
            </script>';
    }
}
