<?php
include "connection.php";

$email = $_POST['email'];
$userCode = $_POST['userCode'];

$conn->query("UPDATE
    `user`
    SET
    `EMAIL` = '$email'
    WHERE
    USER_ID = $userCode
");
//echo $userCode;
?>