<?php
include "connection.php";

$categoryID = $_POST['categoryID'];

$sql = "SELECT
activity_masterlist.CATEGORY_ID,
task_masterlist.STATUS,
task_masterlist.DUE_DATE,
task_masterlist.TASK_ASSIGNEE
FROM
category_masterlist
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(category_masterlist.RID, COALESCE(task_masterlist.DELETED_AT, '')) = $categoryID
ORDER BY task_masterlist.CREATED_AT DESC
";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['CATEGORY_ID'],
            "b"=>$row['STATUS'],
            "c"=>$row['TASK_ASSIGNEE'],
            "d"=>$row['DUE_DATE'],
            // ""=>$row[''],
           
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);













/*
SELECT
	workspace_masterlist.RID,
    workspace_masterlist.WORKSPACE_DESC,
    category_masterlist.WORKSPACE_ID,
    category_masterlist.RID,
    category_masterlist.CATEGORY_DESC,
    activity_masterlist.CATEGORY_ID,
    activity_masterlist.RID,
    activity_masterlist.ACTIVITY_DESC,
    task_masterlist.RID,
    task_masterlist.ACTIVITY_ID,
    task_masterlist.TASK_DESC,
    task_masterlist.TASK_ASSIGNEE,
    CONCAT(COALESCE(task_masterlist.TASK_ASSIGNEE LIKE '%"17"%', ''), COALESCE(task_masterlist.DELETED_BY, ''))
FROM
    workspace_masterlist
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(COALESCE(task_masterlist.TASK_ASSIGNEE LIKE '%"17"%', ''), COALESCE(task_masterlist.DELETED_BY, '')) = 1

*/

?>