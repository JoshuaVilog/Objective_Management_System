<?php
include "connection.php";

$id = $_POST['id'];
$userCode = $_POST['userCode'];

date_default_timezone_set('Asia/Manila'); // Set the timezone to Philippines 
$datetime = date('Y-m-d H:i:s'); // Format: Year-Month-Day Hour:Minute:Second

$conn->query("UPDATE
    `project_masterlist`
    SET
    `DELETED_AT` = '$datetime',
    `DELETED_BY` = $userCode,
    `DELETED_IP` = '',
    `REALTIME_ACTION` = '$datetime'
    WHERE
    `PROJECT_ID` = $id
");

?>