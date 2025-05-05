<?php
include "connection.php";

$id = $_POST['userCode'];

$sql = "SELECT
task_request.RID,
task_request.TASK_ID,
task_masterlist.TASK_DESC,
`REQUESTOR`,
`ASSIGNEE`,
`REMARKS`,
`MARK_READ`,
task_request.CREATED_AT
FROM
`task_request`
INNER JOIN task_masterlist ON task_request.TASK_ID = task_masterlist.RID
WHERE
`REQUESTOR` = $id
ORDER BY CREATED_AT DESC";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['TASK_ID'],
            "c"=>$row['REQUESTOR'],
            "d"=>$row['ASSIGNEE'],
            "e"=>$row['REMARKS'],
            "f"=>$row['MARK_READ'],
            "g"=>$row['CREATED_AT'],
            "h"=>$row['TASK_DESC'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>