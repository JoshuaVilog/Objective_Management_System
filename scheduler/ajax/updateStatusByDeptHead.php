<?php
include "connection.php";

$id = $_POST['id'];
$userCode = $_POST['userCode'];
$status = $_POST['status'];

date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");
$getIP = getClientIP();

$conn->query("UPDATE
    `scheduler_masterlist`
SET
    `STATUS` = '$status',
    `STATUS_AT` = '$createdAt',
    `STATUS_BY` = '$userCode',
    `STATUS_IP` = '$getIP'
WHERE
    `RID` = $id");

$conn->query("INSERT INTO `sched_status_masterlist`(
    `RID`,
    `SCHEDULER_ID`,
    `STATUS`,
    `USER`,
    `DATETIME`,
    `IP_ADDRESS`
)
VALUES(
    DEFAULT,
    '$id',
    '$status',
    '$userCode',
    '$createdAt',
    '$getIP'
)");

?>
