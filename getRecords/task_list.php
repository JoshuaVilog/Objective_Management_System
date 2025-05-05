<?php
include "connection.php";

$projectCode = $_POST['projectCode'];

$sql = "SELECT
    `TASK_CODE`,
    `TASK_DESC`,
    `ASSIGNEE`,
    `PRIORITY_ID`,
    `TARGET_DATE`,
    `STATUS`,
    `REMARKS`,
    `CREATED_AT`,
    `CREATED_BY`
    FROM
    `task_list`
    WHERE
    `PROJECT_CODE` = '$projectCode'";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['TASK_CODE'],
            "b"=>$row['TASK_DESC'],
            "c"=>$row['ASSIGNEE'],
            "d"=>$row['PRIORITY_ID'],
            "e"=>$row['TARGET_DATE'],
            "f"=>$row['STATUS'],
            "g"=>$row['REMARKS'],
            "h"=>$row['CREATED_AT'],
            "i"=>$row['CREATED_BY'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>