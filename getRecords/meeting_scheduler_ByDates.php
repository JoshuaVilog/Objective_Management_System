<?php
include "connection.php";

$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];

// $sql = "SELECT `RID`, `SCHEDULE_DESC`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME`, `STATUS`, `STATUS_AT`, `STATUS_BY`, `STATUS_IP`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP` FROM `scheduler_masterlist` WHERE CONCAT(STATUS, COALESCE(DELETED_AT, '')) = '2' AND DATE BETWEEN '$startDate' AND '$endDate' ORDER BY DATE ASC";
$sql = "SELECT `RID`, `SCHEDULE_DESC`, `DEPARTMENT`, `CATEGORY`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME`, `STATUS`, `STATUS_AT`, `STATUS_BY`, `STATUS_IP`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP` FROM `scheduler_masterlist` WHERE (CONCAT(STATUS, COALESCE(DELETED_AT, '')) = '2' OR CONCAT(STATUS, COALESCE(DELETED_AT, '')) = '4') AND DATE BETWEEN '$startDate' AND '$endDate' ORDER BY DATE ASC";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "rid"=> $row['RID'],
            "desc"=> $row['SCHEDULE_DESC'],
            "date"=> $row['DATE'],
            "category"=> $row['CATEGORY'],
            "room"=> $row['ROOM'],
            "department"=> $row['DEPARTMENT'],
            "attendees"=> $row['ATTENDEES'],
            "starttime"=> convertTime($row['STARTTIME']),
            "endtime"=> convertTime($row['ENDTIME']),
            "STATUS"=> $row['STATUS'],
            "STATUS_AT"=> $row['STATUS_AT'],
            "STATUS_BY"=> $row['STATUS_BY'],
            "STATUS_IP"=> $row['STATUS_IP'],
            "CREATED_AT"=> $row['CREATED_AT'],
            "CREATED_BY"=> $row['CREATED_BY'],
            "CREATED_IP"=> $row['CREATED_IP'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);


function convertTime($time) {
    $hour = date("H:i", strtotime($time)); // Get the hour part
    return $hour; // Convert from 17:00:00 to 17:00
}
?>