<?php
include "connection.php";

$workspaceID = $_POST['workspaceID'];


$sql = "SELECT
task_masterlist.RID,
task_masterlist.TASK_DESC,
task_masterlist.STATUS,
task_masterlist.TASK_ASSIGNEE,
task_masterlist.DUE_DATE,
activity_masterlist.ACTIVITY_DESC,
category_masterlist.CATEGORY_DESC
FROM
`workspace_masterlist`
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE
CONCAT(workspace_masterlist.RID, COALESCE(task_masterlist.DELETED_AT, '')) = $workspaceID";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['TASK_DESC'],
            "c" => $row['STATUS'],
            "d" => $row['DUE_DATE'],
            "e" => $row['ACTIVITY_DESC'],
            "f" => $row['CATEGORY_DESC'],
            "g" => $row['TASK_ASSIGNEE'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);
















/*
SELECT
    workspace_masterlist.RID,
    task_masterlist.RID,
    task_masterlist.TASK_DESC,
    task_masterlist.STATUS,
    task_masterlist.DUE_DATE
FROM
    `workspace_masterlist`
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE
    CONCAT(workspace_masterlist.RID, COALESCE(task_masterlist.DELETED_AT, '')) =
*/
?>