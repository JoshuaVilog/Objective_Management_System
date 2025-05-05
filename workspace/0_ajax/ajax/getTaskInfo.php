<?php
include "connection.php";

$taskID = $_POST['taskID'];

$sql = "SELECT `RID`, `TASK_PARENT_ID`, `SUBTASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`,`TASK_ASSIGNEE`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE` FROM `task_masterlist` WHERE RID = $taskID";

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
        
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>