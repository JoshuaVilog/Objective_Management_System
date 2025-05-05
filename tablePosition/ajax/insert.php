<?php
include "connection.php";

$title = $_POST['title'];
$desc = $_POST['desc'];
$userCode = $_POST['userCode'];

date_default_timezone_set('Asia/Manila'); // Set the timezone to Philippines 
$createdAt = date('Y-m-d H:i:s'); // Format: Year-Month-Day Hour:Minute:Second

$sql = "SELECT `RID`, `JOB_TITLE`, `JOB_DESC` FROM `position` WHERE JOB_TITLE = '$title'";
$result = $conn->query($sql);


if(mysqli_num_rows($result) != 0){
    echo "duplicate";
} else {
    $conn->query("INSERT INTO `position`(
        `RID`,
        `JOB_TITLE`,
        `JOB_DESC`,
        `CREATED_BY`,
        `CREATED_AT`,
        `UPDATED_BY`,
        `UPDATED_AT`,
        `DELETED_AT`
    )
    VALUES(
        DEFAULT,
        '$title',
        '$desc',
        '$userCode',
        '$createdAt',
        '',
        '',
        ''
    )");
}