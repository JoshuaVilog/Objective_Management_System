<?php
include "connection.php";

$taskID = $_POST['taskID'];

$sql = "SELECT `RID`, `DESCRIPTION`, `CREATED_AT`, CREATED_BY FROM `task_activity_history` WHERE TASK_ID = $taskID ORDER BY CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
       
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['DESCRIPTION'],
            "c" => $row['CREATED_AT'],
            "d" => $row['CREATED_BY'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>