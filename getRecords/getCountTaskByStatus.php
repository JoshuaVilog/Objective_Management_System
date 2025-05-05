<?php
include "connection.php";

$workspace = $_POST['workspace'];

$sql = "SELECT 
TASK_ASSIGNEE,
SUM(CASE WHEN STATUS = '3' THEN 1 ELSE 0 END) AS COMPLETE,
SUM(CASE WHEN STATUS != '3' THEN 1 ELSE 0 END) AS INCOMPLETE
FROM task_masterlist
INNER JOIN activity_masterlist ON task_masterlist.ACTIVITY_ID = activity_masterlist.RID
INNER JOIN category_masterlist ON activity_masterlist.CATEGORY_ID = category_masterlist.RID
INNER JOIN workspace_masterlist ON category_masterlist.WORKSPACE_ID = workspace_masterlist.RID
WHERE CONCAT(workspace_masterlist.RID, COALESCE(task_masterlist.DELETED_AT, '')) = '$workspace'
GROUP BY TASK_ASSIGNEE";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['TASK_ASSIGNEE'],
            "b"=>$row['COMPLETE'],
            "c"=>$row['INCOMPLETE'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>