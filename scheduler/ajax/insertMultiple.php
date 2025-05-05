<?php
include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$desc = $conn->real_escape_string($data['desc']);
$department = $data['department'];
$category = $data['category'];
$listDate = $data['listDate'];
$startTime = $data['startTime'];
$endTime = $data['endTime'];
$room = $data['room'];
$attendees = $data['attendees'];
$userCode = $data['userCode'];
$status = $data['status'];
$visitors = $data['visitors'];
$itemsToPrepared = $data['itemsToPrepared'];
$visitorType = $data['visitorType'];
$ip = getClientIP();

date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");
$getIP = getClientIP();

foreach($listDate as $date){

    
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
    
}

?>