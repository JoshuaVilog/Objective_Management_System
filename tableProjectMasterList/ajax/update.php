<?php
include "connection.php";

$desc = $conn->real_escape_string($_POST['desc']);
$targetDate = $_POST['targetDate'];
$details = $conn->real_escape_string($_POST['details']);
$id = $_POST['id'];
$userCode = $_POST['userCode'];

date_default_timezone_set('Asia/Manila'); // Set the timezone to Philippines 
$datetime = date('Y-m-d H:i:s'); // Format: Year-Month-Day Hour:Minute:Second

$conn->query("UPDATE
    `project_masterlist`
    SET
    `PROJECT_DESC` = '$desc',
    `PROJECT_DETAILS` = '$details',
    `TARGET_DATE` = '$targetDate',
    `UPDATED_AT` = '$datetime',
    `UPDATED_BY` = $userCode,
    `UPDATED_IP` = '',
    `REALTIME_ACTION` = '$datetime'
    WHERE
    `PROJECT_ID` = $id
    ");

?>