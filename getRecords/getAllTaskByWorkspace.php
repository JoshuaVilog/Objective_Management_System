<?php
include "connection.php";

// $userCode = $_POST['userCode'];
// $findUserCode = '"'.$userCode.'"';
$workspaceID = $_POST['workspaceID'];

$sql = "SELECT
workspace_masterlist.WORKSPACE_DESC,
category_masterlist.WORKSPACE_ID,
category_masterlist.CATEGORY_DESC,
activity_masterlist.CATEGORY_ID,
activity_masterlist.ACTIVITY_DESC,
task_masterlist.RID,
task_masterlist.ACTIVITY_ID,
task_masterlist.TASK_DESC,
task_masterlist.TASK_ASSIGNEE,
task_masterlist.PRIORITY_ID,
task_masterlist.STATUS,
task_masterlist.DUE_DATE,
task_masterlist.START_DATE,
task_masterlist.FINISH_DATE,
task_masterlist.CREATED_BY,
task_masterlist.TASK_PARENT_ID,
task_masterlist.SUBTASK_PARENT_ID
FROM
workspace_masterlist
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(workspace_masterlist.RID, COALESCE(task_masterlist.DELETED_AT, '')) = '$workspaceID'
ORDER BY task_masterlist.CREATED_AT DESC
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
            "c" => "", //TASK DETAILS
            "d" => $row['DUE_DATE'],
            "e" => $row['PRIORITY_ID'],
            "f" => $row['STATUS'],
            "g" => $row['START_DATE'],
            "h" => $row['FINISH_DATE'],
            'i'=> "", // Subtask Count
            "j" => $row['TASK_PARENT_ID'], //$row['TASK_PARENT_ID']
            "k" => $row['TASK_ASSIGNEE'],
            "l" => $row['SUBTASK_PARENT_ID'], //$row['SUBTASK_PARENT_ID']
            "m" => $row['ACTIVITY_ID'],
            "n" => $row['CREATED_BY'],
            "o" => $row['ACTIVITY_DESC'],
            "p" => $row['CATEGORY_DESC'],
            "q" => $row['WORKSPACE_DESC'],

        );
    }













    /*
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "id"=>$row['RID'],
            "a"=>$row['RID'],
            "b"=>$row['TASK_DESC'],
            "c"=>$row['TASK_ASSIGNEE'],
            "d"=>$row['STATUS'],
            "e"=>$row['ACTIVITY_DESC'],
            "f"=>$row['CATEGORY_DESC'],
            "g"=>$row['WORKSPACE_DESC'],
            "h"=>$row['WORKSPACE_ID'],
            "i"=>$row['CATEGORY_ID'],
            "j"=>$row['ACTIVITY_ID'],
            "k"=>$row['DUE_DATE'],
            "l"=>$row['START_DATE'],
            "m"=>$row['FINISH_DATE'],
            "n"=>$row['CREATED_BY'],
            
            // ""=>$row[''],
           
        );
    }
    */
}

header('Content-Type: application/json');
echo json_encode($records);





?>