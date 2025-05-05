<?php
include "connection.php";

$userCode = $_POST['userCode'];
$oldPassword = md5($_POST['oldPassword']);
$newPassword = md5($_POST['newPassword']);

$sql = "SELECT `USER_ID`, `PASSWORD` FROM `user` WHERE USER_ID = $userCode";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

if($oldPassword == $row['PASSWORD']){
    $conn->query("UPDATE
        `user`
        SET
        `PASSWORD` = '$newPassword'
        WHERE
        USER_ID = $userCode
    ");
    echo $newPassword;
} else {
    echo "wrong";
}


//echo $userCode;
?>