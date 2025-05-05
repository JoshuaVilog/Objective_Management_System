<?php
include "connection.php";

$sql = "SELECT
    `JOB_POSITION_ID`,
    `JOB_TITLE`,
    job_level_tb.JOB_LEVEL
FROM
    `job_position_tb`
INNER JOIN `job_level_tb` ON job_position_tb.JOB_LEVEL_ID = job_level_tb.JOB_LEVEL_ID";
$result = $connHRIS->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['JOB_POSITION_ID'],
            "b"=>$row['JOB_TITLE'],
            "c"=>$row['JOB_LEVEL'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>