<?php
include "connection.php";

$id = $_POST['userId'];
$lastname = $_POST['lastname'];
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$email = $_POST['email'];
$username = $_POST['username'];
$department = $_POST['department'];
$department2 = $_POST['department2'];
$position = $_POST['position'];
$role = $_POST['role'];
$status = $_POST['status'];

$conn->query("UPDATE
    `user`
    SET
    `USER_LNAME` = '$lastname',
    `USER_FNAME` = '$firstname',
    `USER_MNAME` = '$middlename',
    `EMAIL` = '$email',
    `DEPARTMENT_ID` = '$department',
    `POSITION_ID` = '$position',
    `USERNAME` = '$username',
    `USER_ROLE` = '$role',
    `USER_STATUS` = '$status',
    `DEPARTMENT2` = '$department2'
    WHERE
    `USER_ID` = '$id'
");

?>