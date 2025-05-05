<?php
include "connection.php";

$id = $_POST['id'];
$userCode = $_POST['userCode'];
$status = $_POST['status'];

date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");
$getIP = getClientIP();

if($status == "2"){
    $date = $_POST['date'];
    $startTime = $_POST['startTime'];
    $endTime = $_POST['endTime'];
    $room = $_POST['room'];

    $conn->query("UPDATE
        `scheduler_masterlist`
    SET
        `DATE` = '$date',
        `ROOM` = '$room',
        `STARTTIME` = '$startTime',
        `ENDTIME` = '$endTime',
        `STATUS` = '$status',
        `STATUS_AT` = '$createdAt',
        `STATUS_BY` = '$userCode',
        `STATUS_IP` = '$getIP'
    WHERE
        `RID` = $id");

} else {
    $conn->query("UPDATE
        `scheduler_masterlist`
    SET
        `STATUS` = '$status',
        `STATUS_AT` = '$createdAt',
        `STATUS_BY` = '$userCode',
        `STATUS_IP` = '$getIP'
    WHERE
        `RID` = $id");

}



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
