<?php
include "connection.php";

$id = $_POST['id'];

$sql = "SELECT `RID`, `STATUS`, `USER`, `DATETIME`, `IP_ADDRESS` FROM `sched_status_masterlist` WHERE `SCHEDULER_ID` = '$id'";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "rid"=> $row['RID'],
            "status"=> $row['STATUS'],
            "user"=> $row['USER'],
            "datetime"=> $row['DATETIME'],
            "ip"=> $row['IP_ADDRESS'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>