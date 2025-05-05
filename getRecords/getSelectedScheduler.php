<?php
include "connection.php";

$id = $_POST['id'];

$sql = "SELECT `RID`, `SCHEDULE_DESC`, `DEPARTMENT`, `CATEGORY`, `DATE`, `ROOM`, `ATTENDEES`, `VISITORS`, `VISITOR_TYPE`, `ITEMS_TO_PREPARED`, `STARTTIME`, `ENDTIME`, `STATUS`, `STATUS_AT`, `STATUS_BY`, `STATUS_IP`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP` FROM `scheduler_masterlist` WHERE RID = $id";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records["rid"] = $row['RID'];
        $records["desc"] = $row['SCHEDULE_DESC'];
        $records["date"] = $row['DATE'];
        $records["room"] = $row['ROOM'];
        $records["category"] = $row['CATEGORY'];
        $records["department"] = $row['DEPARTMENT'];
        $records["attendees"] = $row['ATTENDEES'];
        $records["visitors"] = $row['VISITORS'];
        $records["visitorType"] = $row['VISITOR_TYPE'];
        $records["itemsToPrepared"] = $row['ITEMS_TO_PREPARED'];
        $records["starttime"] = convertTime($row['STARTTIME']);
        $records["endtime"] = convertTime($row['ENDTIME']);
        $records["STATUS"] = $row['STATUS'];
        $records["STATUS_AT"] = $row['STATUS_AT'];
        $records["STATUS_BY"] = $row['STATUS_BY'];
        $records["STATUS_IP"] = $row['STATUS_IP'];
        $records["CREATED_AT"] = $row['CREATED_AT'];
        $records["CREATED_BY"] = $row['CREATED_BY'];
        $records["CREATED_IP"] = $row['CREATED_IP'];
    }
}

header('Content-Type: application/json');
echo json_encode($records);



function convertTime($time) {
    $hour = date("H:i", strtotime($time)); // Get the hour part
    return $hour; // Convert from 17:00:00 to 17:00
}