<?php
include "connection.php";

$taskCode = $_POST['taskCode'];

$sql = "SELECT
    `SUBTASK_CODE`,
    `SUBTASK_DESC`,
    `ASSIGNEE`,
    `PRIORITY_ID`,
    `TARGET_DATE`,
    `STATUS`,
    `REMARKS`,
    `CREATED_AT`,
    `CREATED_BY`
    FROM
    `subtask_list`
    WHERE
    `TASK_CODE` = '$taskCode'";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['SUBTASK_CODE'],
            "b"=>$row['SUBTASK_DESC'],
            "c"=>$row['ASSIGNEE'],
            "d"=>$row['PRIORITY_ID'],
            "e"=>$row['TARGET_DATE'],
            "f"=>$row['STATUS'],
            "i"=>$row['REMARKS'],
            "j"=>$row['CREATED_AT'],
            "k"=>$row['CREATED_BY'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>