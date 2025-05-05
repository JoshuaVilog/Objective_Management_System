<?php
include "connection_hris.php";

$sql = "SELECT `JOB_LEVEL_ID`, `JOB_LEVEL` FROM `job_level_tb`";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['JOB_LEVEL_ID'],
            "b"=>$row['JOB_LEVEL'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>