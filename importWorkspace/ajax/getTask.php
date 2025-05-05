<?php
include "connection.php";

$activityID = $_POST['activityID'];
$id = "0".$activityID;


// $sql = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP`, `UPDATED_AT`, `UPDATED_BY`, `UPDATED_IP`, `DELETED_AT`, `DELETED_BY`, `DELETED_IP`, `REALTIME_ACTION` FROM `task_masterlist` WHERE CONCAT(ACTIVITY_ID, TASK_PARENT_ID ,DELETED_BY) = $id";
$sql = "SELECT `RID`, `TASK_DESC` FROM `task_masterlist` WHERE CONCAT(TASK_PARENT_ID, ACTIVITY_ID, COALESCE(DELETED_IP, '')) = '$id' ORDER BY CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $subtaskID = $activityID.$row['RID'];
        $sqlNoOfRows = "SELECT COUNT(RID) AS NO_OF_ROWS FROM `task_masterlist` WHERE CONCAT(ACTIVITY_ID,TASK_PARENT_ID,COALESCE(DELETED_BY, '')) = $subtaskID";
        $resultNoOfRows = mysqli_query($conn, $sqlNoOfRows);
        $rowNoOfRows = mysqli_fetch_assoc($resultNoOfRows);

        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['TASK_DESC']
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>