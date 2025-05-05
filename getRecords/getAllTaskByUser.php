<?php
include "connection.php";

$userCode = $_POST['userCode'];
$year = $_POST['year'];

$findUserCode = $year.'-["'.$userCode.'"]';

/* $sql = "SELECT
workspace_masterlist.WORKSPACE_DESC,
category_masterlist.WORKSPACE_ID,
category_masterlist.CATEGORY_DESC,
activity_masterlist.CATEGORY_ID,
activity_masterlist.ACTIVITY_DESC,
task_masterlist.RID,
task_masterlist.ACTIVITY_ID,
task_masterlist.TASK_DESC,
task_masterlist.TASK_ASSIGNEE,
task_masterlist.STATUS,
task_masterlist.DUE_DATE,
task_masterlist.START_DATE,
task_masterlist.FINISH_DATE
FROM
workspace_masterlist
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(task_masterlist.TASK_ASSIGNEE, COALESCE(task_masterlist.DELETED_BY, '')) = '$findUserCode'
ORDER BY task_masterlist.CREATED_AT DESC"; */
$sql = "SELECT
workspace_masterlist.WORKSPACE_DESC,
workspace_masterlist.YEAR_ID,
category_masterlist.WORKSPACE_ID,
category_masterlist.CATEGORY_DESC,
activity_masterlist.CATEGORY_ID,
activity_masterlist.ACTIVITY_DESC,
task_masterlist.RID,
task_masterlist.ACTIVITY_ID,
task_masterlist.TASK_DESC,
task_masterlist.TASK_ASSIGNEE,
task_masterlist.STATUS,
task_masterlist.DUE_DATE,
task_masterlist.START_DATE,
task_masterlist.FINISH_DATE
FROM
workspace_masterlist
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(workspace_masterlist.YEAR_ID, '-', task_masterlist.TASK_ASSIGNEE, COALESCE(task_masterlist.DELETED_BY, '')) = '$findUserCode'
ORDER BY task_masterlist.CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['TASK_DESC'],
            "c"=>$row['TASK_ASSIGNEE'],
            "d"=>$row['STATUS'],
            "e"=>$row['ACTIVITY_DESC'],
            "f"=>$row['CATEGORY_DESC'],
            "g"=>$row['WORKSPACE_DESC'],
            "h"=>$row['DUE_DATE'],
            "i"=>$row['START_DATE'],
            "j"=>$row['FINISH_DATE'],
            "k"=>$row['ACTIVITY_ID'],
           
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);





?>