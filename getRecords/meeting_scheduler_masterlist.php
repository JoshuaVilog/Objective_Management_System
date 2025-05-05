<?php
include "connection.php";

$sql = "SELECT `RID`, `SCHEDULE_DESC`, `DEPARTMENT`, `CATEGORY`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME`, `STATUS`, `STATUS_AT`, `STATUS_BY`, `STATUS_IP`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP` FROM `scheduler_masterlist` WHERE COALESCE(DELETED_AT, '') = '' ORDER BY RID DESC";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "rid"=> $row['RID'],
            "desc"=> $row['SCHEDULE_DESC'],
            "date"=> $row['DATE'],
            "department"=> $row['DEPARTMENT'],
            "category"=> $row['CATEGORY'],
            "room"=> $row['ROOM'],
            "attendees"=> $row['ATTENDEES'],
            "starttime"=> $row['STARTTIME'],
            "endtime"=> $row['ENDTIME'],
            "STATUS"=> $row['STATUS'],
            // "STATUSS"=> $row['STATUS'],
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

?>