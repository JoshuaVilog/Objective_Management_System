<?php
include "connection.php";

$taskID = $_POST['taskID'];

// $sql = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `SUBTASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`,`TASK_ASSIGNEE`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE` FROM `task_masterlist` WHERE RID = $taskID";
$sql = "SELECT
task_masterlist.RID,
task_masterlist.ACTIVITY_ID,
`TASK_PARENT_ID`,
`SUBTASK_PARENT_ID`,
`TASK_DESC`,
`TASK_DETAILS`,
`TASK_ASSIGNEE`,
`DUE_DATE`,
`PRIORITY_ID`,
`STATUS`,
`START_DATE`,
`FINISH_DATE`,
category_masterlist.WORKSPACE_ID,
task_masterlist.CREATED_BY
FROM
`task_masterlist`
INNER JOIN `activity_masterlist` ON task_masterlist.ACTIVITY_ID = activity_masterlist.RID
INNER JOIN `category_masterlist` ON activity_masterlist.CATEGORY_ID = category_masterlist.RID
WHERE
task_masterlist.RID = $taskID";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $records['a'] = $row['RID'];
        $records['b'] = $row['TASK_DESC'];
        $records['c'] = $row['TASK_DETAILS'];
        $records['d'] = $row['DUE_DATE'];
        $records['e'] = $row['PRIORITY_ID'];
        $records['f'] = $row['STATUS'];
        $records['g'] = $row['START_DATE'];
        $records['h'] = $row['FINISH_DATE'];
        $records['i'] = $row['TASK_PARENT_ID'];
        $records['j'] = $row['TASK_ASSIGNEE'];
        $records['k'] = $row['SUBTASK_PARENT_ID'];
        $records['l'] = $row['ACTIVITY_ID'];
        $records['m'] = $row['WORKSPACE_ID'];
        $records['n'] = $row['CREATED_BY'];
        
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>