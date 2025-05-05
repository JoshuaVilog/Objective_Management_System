<?php
include "connection.php";

$activityID = $_POST['activityID'];
$taskID = $_POST['taskID'];

// $id = $activityID.$taskID;
$id = $taskID;

// $sql = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE`, `CREATED_AT`, `CREATED_BY`, `CREATED_IP`, `UPDATED_AT`, `UPDATED_BY`, `UPDATED_IP`, `DELETED_AT`, `DELETED_BY`, `DELETED_IP`, `REALTIME_ACTION` FROM `task_masterlist` WHERE CONCAT(ACTIVITY_ID, TASK_PARENT_ID, DELETED_BY) = $id";
//$sql = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`,`TASK_ASSIGNEE`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE` FROM `task_masterlist` WHERE CONCAT(TASK_PARENT_ID, COALESCE(DELETED_BY, '')) = $id ORDER BY CREATED_AT DESC";
$sql = "SELECT `RID`, `ACTIVITY_ID`, `TASK_PARENT_ID`, `TASK_DESC`, `TASK_DETAILS`,`TASK_ASSIGNEE`, `DUE_DATE`, `PRIORITY_ID`, `STATUS`, `START_DATE`, `FINISH_DATE` FROM `task_masterlist` WHERE CONCAT(SUBTASK_PARENT_ID, TASK_PARENT_ID, COALESCE(DELETED_AT, '')) = 0$id ORDER BY CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['TASK_DESC'],
            "c" => $row['TASK_DETAILS'],
            "d" => $row['DUE_DATE'],
            "e" => $row['PRIORITY_ID'],
            "f" => $row['STATUS'],
            "g" => $row['START_DATE'],
            "h" => $row['FINISH_DATE'],
            'i'=> "",
            "j" => "",
            "k" => $row['TASK_ASSIGNEE'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>