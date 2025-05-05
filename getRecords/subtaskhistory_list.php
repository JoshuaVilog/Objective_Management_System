<?php
include "connection.php";

$subtaskCode = $_POST['subtaskCode'];

$sql = "SELECT
`ID`,
`SUBTASK_CODE`,
`START_DATETIME`,
`FINISH_DATETIME`,
`REMARKS`,
`STATUS`,
`CREATED_AT`,
`CREATED_BY`
FROM
`subtask_history_list`
WHERE
`SUBTASK_CODE` = '$subtaskCode'";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['ID'],
            "b"=>$row['START_DATETIME'],
            "c"=>$row['FINISH_DATETIME'],
            "d"=>$row['REMARKS'],
            "e"=>$row['STATUS'],
            "f"=>$row['CREATED_AT'],
            "g"=>$row['CREATED_BY'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>