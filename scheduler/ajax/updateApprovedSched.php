<?php
include "connection.php";

$id = $_POST['id'];
// $desc = $_POST['desc'];
// $department = $_POST['department'];
// $category = $_POST['category'];
$date = $_POST['date'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$room = $_POST['room'];
// $attendees = $_POST['attendees'];
$userCode = $_POST['userCode'];

$conn->query("UPDATE
        `scheduler_masterlist`
    SET
        `DATE` = '$date',
        `ROOM` = '$room',
        `STARTTIME` = '$startTime',
        `ENDTIME` = '$endTime'
    WHERE
        `RID` = $id");

