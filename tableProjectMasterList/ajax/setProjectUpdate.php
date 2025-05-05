<?php
include "connection.php";

$projectID = $_POST['id'];

$sql="SELECT `PROJECT_ID`, `PROJECT_DESC`, `PROJECT_DETAILS`, `TARGET_DATE` FROM `project_masterlist` WHERE `PROJECT_ID` = $projectID";

$result = $conn->query($sql);

$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records['a'] = $row['PROJECT_ID'];
        $records['b'] = $row['PROJECT_DESC'];
        $records['c'] = $row['PROJECT_DETAILS'];
        $records['d'] = $row['TARGET_DATE'];

    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>