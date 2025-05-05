<?php
include "connection_hris.php";

$sql = "SELECT `JOB_POSITION_ID`, `JOB_TITLE`, `JOB_LEVEL_ID` FROM `job_position_tb`";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['JOB_POSITION_ID'],
            "b"=>$row['JOB_TITLE'],
            "c"=>$row['JOB_LEVEL_ID'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>