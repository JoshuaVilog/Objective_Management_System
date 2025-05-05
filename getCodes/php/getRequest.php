<?php
include "connection.php";

$requestID = $_POST['requestID'];

$sql = "SELECT `RID`, `TASK_ID`, `REQUESTOR`, `ASSIGNEE`, `CREATED_AT` FROM `task_request` WHERE RID = $requestID";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $records['a'] = $row['RID'];
        $records['b'] = $row['REQUESTOR'];
        $records['c'] = $row['ASSIGNEE'];
        $records['d'] = $row['TASK_ID'];
        $records['e'] = $row['CREATED_AT'];

    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>