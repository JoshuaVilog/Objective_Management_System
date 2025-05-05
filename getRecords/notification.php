<?php
include "connection.php";

$userCode = $_POST['userCode'];

$sql1 = "SELECT SUBTASK_CODE FROM `subtask_list` WHERE subtask_list.ASSIGNEE = $userCode AND subtask_list.STATUS = 0";
$result1 = $conn->query($sql1);
$no1 = $result1->num_rows;

$sql2 = "SELECT
subtask_history_list.SUBTASK_CODE,
subtask_history_list.START_DATETIME,
subtask_history_list.FINISH_DATETIME
FROM
`subtask_history_list`
INNER JOIN subtask_list ON subtask_history_list.SUBTASK_CODE = subtask_list.SUBTASK_CODE
WHERE
subtask_list.ASSIGNEE = $userCode AND subtask_history_list.STATUS = 1";
$result2 = $conn->query($sql2);
$no2 = $result2->num_rows;

// Convert result set to JSON
$records = array();

$records[] = array(
    "a" => $no1,
    "b" => $no2,
);







// if ($result1->num_rows > 0) {
//     while ($row = $result->fetch_assoc()) {
//         $records[] = $row;
//     }
// }

header('Content-Type: application/json');
echo json_encode($records);

?>