<?php
include "connection.php";

// $status = $_POST['status'];
$userCode = $_POST['userCode'];
$date = $_POST['date'];
$starttime = $_POST['starttime'];
$endtime = $_POST['endtime'];
$room = $_POST['room'];
$status = $_POST['status'];
$id = $_POST['id'];


date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");
$getIP = getClientIP();

if($status == "EDIT"){
    $sql = "SELECT `RID`, `SCHEDULE_DESC`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME` FROM `scheduler_masterlist` WHERE CONCAT(STATUS,COALESCE(DELETED_AT, '')) = '2' AND RID != $id";

} else if($status == "APPROVE"){
    $sql = "SELECT `RID`, `SCHEDULE_DESC`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME` FROM `scheduler_masterlist` WHERE CONCAT(STATUS,COALESCE(DELETED_AT, '')) = '2'";
    
}

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "rid"=> $row['RID'],
            "desc"=> $row['SCHEDULE_DESC'],
            "date"=> $row['DATE'],
            "room"=> $row['ROOM'],
            "attendees"=> $row['ATTENDEES'],
            "starttime"=> $row['STARTTIME'],
            "endtime"=> $row['ENDTIME'],
        );
    }
}

// $sqlSelected = "SELECT `RID`, `SCHEDULE_DESC`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME` FROM `scheduler_masterlist` WHERE RID = $id";
// $resultSelected = mysqli_query($conn, $sqlSelected);
// $rowSelected = mysqli_fetch_assoc($resultSelected);

// $conflict = checkConflict($records, $rowSelected['DATE'], $rowSelected['STARTTIME'], $rowSelected['ENDTIME'], $rowSelected['ROOM']);
$conflict = checkConflict($records, $date, $starttime, $endtime, $room);

if($conflict == true){
    // CONFLICT FOUND
    echo "CONFLICT";
} else {
    // AVAILABLE
    echo "AVAILABLE";
}


function checkConflict($meetings, $date, $starttime, $endtime, $room) {
    // Convert input times to timestamps for proper comparison
    $startTimestamp = strtotime($starttime);
    $endTimestamp = strtotime($endtime);

    foreach ($meetings as $meeting) {
        if ($meeting["date"] == $date && $meeting["room"] == $room) {
            $meetingStart = strtotime($meeting["starttime"]);
            $meetingEnd = strtotime($meeting["endtime"]);

            // Corrected overlap conditions using timestamps
            if (($startTimestamp >= $meetingStart && $startTimestamp < $meetingEnd) || 
                ($endTimestamp > $meetingStart && $endTimestamp <= $meetingEnd) || 
                ($startTimestamp < $meetingStart && $endTimestamp > $meetingStart)) {
                return true; // Conflict found
            }
        }
    }
    return false; // No conflict
}

// MY FIRST FUNCTION OF CHECKING THE CONFLICT
/* function checkConflict($meetings, $date, $starttime, $endtime, $room) {
    foreach ($meetings as $meeting) {
        if ($meeting["date"] == $date && $meeting["room"] == $room) {
            // Check if times overlap
            if (($starttime >= $meeting["starttime"] && $starttime < $meeting["endtime"]) ||
                ($endtime > $meeting["starttime"] && $endtime <= $meeting["endtime"]) ||
                ($starttime <= $meeting["starttime"] && $endtime >= $meeting["endtime"])) {
                return true; // Conflict found //true
            }
        }
    }
    return false; // No conflict //false
} */
?>