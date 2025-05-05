<?php
include "connection.php";

$sql = "SELECT `EMPLOYEE_ID`, `RFID`, `EMPLOYEE_NAME`, `F_NAME`, `M_NAME`, `L_NAME`, `ACTIVE`, `DATE_HIRED`, `DEPARTMENT_ID`, `JOB_POSITION_ID`, `COMPANY_ID`, `ACTIVE` FROM `1_employee_masterlist_tb` WHERE DELETED_STATUS = '0'";
$result = $connHRIS->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['EMPLOYEE_ID'],
            "b"=>$row['RFID'],
            "c"=>$row['EMPLOYEE_NAME'],
            "d"=>$row['DATE_HIRED'],
            "e"=>$row['DEPARTMENT_ID'],
            "f"=>$row['JOB_POSITION_ID'],
            "g"=>$row['ACTIVE'],
            "h"=>$row['COMPANY_ID'],
            "i"=>$row['F_NAME'],
            "fname"=>$row['F_NAME'],
            "lname"=>$row['L_NAME'],
            "mname"=>$row['M_NAME'],
            "active"=>$row['ACTIVE'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>