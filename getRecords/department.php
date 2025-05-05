<?php
include "connection.php";

$sql = "SELECT `DEPARTMENT_ID`, `DEPARTMENT_DESC`, `DEPARTMENT_CODE` FROM `department`";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['DEPARTMENT_ID'],
            "b"=>$row['DEPARTMENT_DESC'],
            "c"=>$row['DEPARTMENT_CODE'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>