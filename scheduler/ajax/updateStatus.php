<?php
include "connection.php";

$id = $_POST['id'];
$userCode = $_POST['userCode'];
$status = $_POST['status'];

date_default_timezone_set('Asia/Manila');
$createdAt = date("Y-m-d H:i:s");
$getIP = getClientIP();

$sql = "SELECT `RID`, `SCHEDULE_DESC`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME` FROM `scheduler_masterlist` WHERE CONCAT(STATUS,COALESCE(DELETED_AT, '')) = '2'";
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

// header('Content-Type: application/json');
// echo json_encode($records);

if($status == "2"){
    //APPROVE SCHED

    $sqlSelected = "SELECT `RID`, `SCHEDULE_DESC`, `DATE`, `ROOM`, `ATTENDEES`, `STARTTIME`, `ENDTIME` FROM `scheduler_masterlist` WHERE RID = $id";
    $resultSelected = mysqli_query($conn, $sqlSelected);
    $rowSelected = mysqli_fetch_assoc($resultSelected);

    $conflict = checkConflict($records, $rowSelected['DATE'], $rowSelected['STARTTIME'], $rowSelected['ENDTIME'], $rowSelected['ROOM']);

    if($conflict == true){
        // CONFLICT FOUND
        echo "CONFLICT";
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

} else if($status == "3"){
    // DISAPPROVE SCHED
    
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



function checkConflict($meetings, $date, $starttime, $endtime, $room) {
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
}
?>