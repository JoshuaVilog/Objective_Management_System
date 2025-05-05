<?php
include "connection.php";

$taskID = $_POST['taskID'];

$sql = "SELECT `RID`, `COMMENT_DESC`, `TASK_ID`, `CREATED_AT`, `CREATED_BY`, user.USER_LNAME, user.USER_FNAME FROM `task_comment` INNER JOIN USER ON task_comment.CREATED_BY = user.USER_ID WHERE CONCAT(TASK_ID, COALESCE(DELETED_BY, '')) = $taskID ORDER BY CREATED_AT DESC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
       
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['COMMENT_DESC'],
            "c" => $row['USER_FNAME']." ".$row['USER_LNAME'],
            "d" => $row['CREATED_AT'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>