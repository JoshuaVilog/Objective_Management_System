<?php
include "connection.php";

$sql = "SELECT `DEPARTMENT_ID`, `DEPARTMENT_CODE`, `DEPARTMENT_NAME` FROM `department_tb` WHERE DELETED_STATUS = '0'";
$result = $connHRIS->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['DEPARTMENT_ID'],
            "b"=>$row['DEPARTMENT_CODE'],
            "c"=>$row['DEPARTMENT_NAME'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>