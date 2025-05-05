<?php
include "connection.php";

$id = $_POST['workspaceID']."-4";

$sql = "SELECT
task_masterlist.RID,
task_masterlist.TASK_DESC,
task_masterlist.STATUS,
task_masterlist.TASK_DETAILS,
task_masterlist.TASK_ASSIGNEE,
task_masterlist.PRIORITY_ID,
task_masterlist.DUE_DATE,
task_masterlist.START_DATE,
task_masterlist.FINISH_DATE,
task_masterlist.CREATED_BY
FROM
`workspace_masterlist`
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(workspace_masterlist.RID, '-', task_masterlist.STATUS, COALESCE(task_masterlist.DELETED_AT, '')) = '$id'
ORDER BY task_masterlist.RID DESC
";

$result = $conn->query($sql);
// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $records[] = array(
            "id" => $row['RID'],
            "a" => $row['RID'],
            "b" => $row['TASK_DESC'],
            // "c" => $row['TASK_DETAILS'],
            "d" => $row['DUE_DATE'],
            "e" => $row['PRIORITY_ID'],
            "f" => $row['STATUS'],
            "g" => $row['START_DATE'],
            "h" => $row['FINISH_DATE'],
            'i'=> "", //$resultSubtask->num_rows
            // "j" => $row['TASK_PARENT_ID'],
            "k" => $row['TASK_ASSIGNEE'],
            // "l" => $row['SUBTASK_PARENT_ID'],
            // "m" => $row['ACTIVITY_ID'],
            "n" => $row['CREATED_BY'],
            
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>