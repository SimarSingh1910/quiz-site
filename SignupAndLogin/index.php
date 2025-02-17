<?php

session_start();
include("signup.html");
include("database.php");

if (isset($_POST["submit"])) {

    $gmail = null;
    $username = null;
    $password = null;
    $confirm = null;

    $gmail = $_POST["gmail"];
    $username = $_POST["username"];
    $password = $_POST["password"];
    $confirm = $_POST["confirm"];

    if ($gmail != null && $username != null && $password != null && $confirm != null) {

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $_SESSION["gmail"] = $gmail;
        $_SESSION["username"] = $username;

        $sql = "INSERT INTO users(username,password,email) VALUES('$username','$hash','$gmail')";

        try {
            mysqli_query($conn, $sql);
            echo '<script>console.log("registered user successfully");</script>';
        } catch (mysqli_sql_exception) {
            echo '<script>
                console.log("unable to register user");
                incorrect_box.style.display = "block";
                incorrect.textContent = "Username is already taken";
            </script>';
        }
        // echo '<script>window.location.href = "login.php";</script>';
    }
}
mysqli_close($conn);
