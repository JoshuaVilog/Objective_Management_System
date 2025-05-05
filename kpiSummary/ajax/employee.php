<?php
include "connection_hris.php";

$sql = "SELECT `EMPLOYEE_ID`, `RFID`, `EMPLOYEE_NAME`, `DATE_HIRED`, `JOB_POSITION_ID` FROM `1_employee_masterlist_tb`";
$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a" => $row['RFID'],
            "b" => $row['EMPLOYEE_NAME'],
            "c" => $row['DATE_HIRED'],
            "d" => $row['JOB_POSITION_ID'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);


?>