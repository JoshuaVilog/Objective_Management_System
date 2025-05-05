<?php
include "connection.php";

$taskID = $_POST['taskID'];


$sql = "SELECT MAX(RID) AS REQUEST_ID FROM `task_request` WHERE TASK_ID = $taskID";
$result = mysqli_query($conn, $sql);
$fetch = mysqli_fetch_assoc($result);


echo $fetch['REQUEST_ID'];









/*
$result = $conn->query($sql);

$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a" => $row['RID'],
            "b" => $row['ACTIVITY_DESC'],
            "c" => $row['ACTIVITY_DETAILS'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);
*/
?>