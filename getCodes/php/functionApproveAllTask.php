<?php
include "connection.php";

$userCode = $_POST['userCode'];
$getIP = getClientIP();
$id = $_POST['workspaceID']."-4";


$sql = "SELECT
task_masterlist.RID
FROM
`workspace_masterlist`
INNER JOIN category_masterlist ON workspace_masterlist.RID = category_masterlist.WORKSPACE_ID
INNER JOIN activity_masterlist ON category_masterlist.RID = activity_masterlist.CATEGORY_ID
INNER JOIN task_masterlist ON activity_masterlist.RID = task_masterlist.ACTIVITY_ID
WHERE CONCAT(workspace_masterlist.RID, '-', task_masterlist.STATUS, COALESCE(task_masterlist.DELETED_AT, '')) = '$id'
";

$result = $conn->query($sql);

// Convert result set to JSON
// $records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $taskID = $row['RID'];
        
        $conn->query("INSERT INTO `task_approving`(
            `RID`,
            `TASK_ID`,
            `APPROVER`,
            `STATUS`,
            `CREATED_BY`,
            `CREATED_IP`
        )
        VALUES(
            DEFAULT,
            '$taskID',
            '$userCode',
            '1',
            '$userCode',
            '$getIP'
        )");


        //APPROVED
        $conn->query("UPDATE
            `task_masterlist`
            SET
            `STATUS` = '3',
            `UPDATED_BY` = $userCode,
            `UPDATED_IP` = '$getIP'
            WHERE
            `RID` =  $taskID
        ");


    }
}

// header('Content-Type: application/json');
// echo json_encode($records);





?>