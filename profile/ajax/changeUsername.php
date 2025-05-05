<?php
include "connection.php";

$username = $_POST['username'];
$lastName = $_POST['lastName'];
$firstName = $_POST['firstName'];
$middleName = $_POST['middleName'];
$userCode = $_POST['userCode'];

$conn->query("UPDATE
    `user`
    SET
    `USER_LNAME` = '$lastName',
    `USER_FNAME` = '$firstName',
    `USER_MNAME` = '$middleName',
    `USERNAME` = '$username'
    WHERE
    USER_ID = '$userCode'
");
//echo $userCode;
?>