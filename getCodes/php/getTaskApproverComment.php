<?php
include "connection.php";

$taskID = $_POST['taskID'];

$sql = "SELECT `RID`, `APPROVER`, `STATUS`, `COMMENT`, `CREATED_AT` FROM `task_approving` WHERE TASK_ID =  $taskID ORDER BY CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
       
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['COMMENT'],
            "c" => $row['CREATED_AT'],
            "d" => $row['APPROVER'],
            "e" => $row['STATUS'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>