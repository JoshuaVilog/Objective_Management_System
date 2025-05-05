<?php
include "connection.php";

$id = $_POST['id'];
$userCode = $_POST['userCode'];

date_default_timezone_set('Asia/Manila');
$datetime = date("Y-m-d H:i:s");
$getIP = getClientIP(); 

$conn->query("UPDATE
    `workspace_masterlist`
    SET
    `DELETED_AT` = '$datetime',
    `DELETED_BY` = $userCode,
    `DELETED_IP` = '$getIP'
    WHERE
    `RID` = $id
");

?>