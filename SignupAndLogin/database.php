<?php

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "voting_systemdb";

try {
    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    echo '<script>console.log("connected successfully to the databse");</script>';
} catch (mysqli_sql_exception) {
    echo '<script>console.log("unable to connect");</script>';
}
