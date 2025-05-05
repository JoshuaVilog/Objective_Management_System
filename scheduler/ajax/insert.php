<?php
include "connection.php";

$desc = $conn->real_escape_string($_POST['desc']);
$department = $_POST['department'];
$category = $_POST['category'];
$date = $_POST['date'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$room = $_POST['room'];
$attendees = $_POST['attendees'];
$userCode = $_POST['userCode'];
$status = $_POST['status'];
$visitors = $_POST['visitors'];
$itemsToPrepared = $_POST['itemsToPrepared'];
$visitorType = $_POST['visitorType'];
$ip = getClientIP();

date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");
$getIP = getClientIP();

$conn->query("INSERT INTO `scheduler_masterlist`(
    `RID`,
    `SCHEDULE_DESC`,
    `DEPARTMENT`,
    `CATEGORY`,
    `DATE`,
    `ROOM`,
    `ATTENDEES`,
    `VISITORS`,
    `VISITOR_TYPE`,
    `ITEMS_TO_PREPARED`,
    `STARTTIME`,
    `ENDTIME`,
    `STATUS`,
    `CREATED_BY`,
    `CREATED_IP`
)
VALUES(
    DEFAULT,
    '$desc',
    '$department',
    '$category',
    '$date',
    '$room',
    '$attendees',
    '$visitors',
    '$visitorType',
    '$itemsToPrepared',
    '$startTime',
    '$endTime',
    '$status',
    '$userCode',
    '$ip'
)");

$id = $conn->insert_id;

if($status == "0"){

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
    
} else if($status == "1"){

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
        '0',
        '$userCode',
        '$createdAt',
        '$getIP'
    )");
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
        '1',
        '$userCode',
        '$createdAt',
        '$getIP'
    )");
}


?>