<?php
include "connection.php";

// USELESS CODE

$projectID = $_POST['projectID']."0";

$sql = "SELECT `TASK_ID`, `TASK_CODE`, `TASK_DESC`, `TASK_DETAILS`, `PROJECT_ID`, `KPI_LIST_ID`, `ASSIGNEE`, `PRIORITY_ID`, `TARGET_DATE`, `STATUS`, `REMARKS` FROM `task_masterlist` WHERE CONCAT(PROJECT_ID, DELETED_BY) = $projectID";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['TASK_ID'],
            "b"=>$row['TASK_CODE'],
            "c"=>$row['TASK_DESC'],
            "d"=>$row['TASK_DETAILS'],
            "e"=>$row['KPI_LIST_ID'],
            "f"=>$row['ASSIGNEE'],
            "g"=>$row['PRIORITY_ID'],
            "h"=>$row['TARGET_DATE'],
            "i"=>$row['STATUS'],
           
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>