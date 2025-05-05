<?php
include "connection.php";

$id = $_POST['id'];
$desc = $conn->real_escape_string($_POST['desc']);
$department = $_POST['department'];
$category = $_POST['category'];
$date = $_POST['date'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$room = $_POST['room'];
$attendees = $_POST['attendees'];
$visitors = $_POST['visitors'];
$itemsToPrepared = $_POST['itemsToPrepared'];
$visitorType = $_POST['visitorType'];
$userCode = $_POST['userCode'];

$conn->query("UPDATE
        `scheduler_masterlist`
    SET
        `SCHEDULE_DESC` = '$desc',
        `DEPARTMENT` = '$department',
        `CATEGORY` = '$category',
        `DATE` = '$date',
        `ROOM` = '$room',
        `ATTENDEES` = '$attendees',
        `VISITORS` = '$visitors',
        `VISITOR_TYPE` = '$visitorType',
        `ITEMS_TO_PREPARED` = '$itemsToPrepared',
        `STARTTIME` = '$startTime',
        `ENDTIME` = '$endTime'
    WHERE
        `RID` = $id");

