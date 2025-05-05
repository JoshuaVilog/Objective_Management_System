<?php
include "connection.php";

$sql = "SELECT `RID`, `DEPARTMENT_ID`, `KPI_USER` FROM `kpi_masterlist` WHERE COALESCE(DELETED_AT, '') = ''";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['DEPARTMENT_ID'],
            "c"=>$row['KPI_USER'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);











/*
$department = $_POST['department'];

if($department == "ALL"){
    $sql = "SELECT `KPI_EVALUATION_ID`, `DEPARTMENT_ID`, `USER_ID`, `CREATED_AT`, `CREATED_BY`, `UPDATED_AT`, `UPDATED_BY`, `DELETED_STATUS`, `DELETED_AT`, `DELETED_BY` FROM `kpi_evaluation` WHERE DELETED_STATUS = 0";
} else {
    $sql = "SELECT `KPI_EVALUATION_ID`, `DEPARTMENT_ID`, `USER_ID`, `CREATED_AT`, `CREATED_BY`, `UPDATED_AT`, `UPDATED_BY`, `DELETED_STATUS`, `DELETED_AT`, `DELETED_BY` FROM `kpi_evaluation` WHERE DELETED_STATUS = 0 AND DEPARTMENT_ID = $department";
}


$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['KPI_EVALUATION_ID'],
            "b"=>$row['DEPARTMENT_ID'],
            "c"=>$row['USER_ID'],
            "d"=>$row['CREATED_AT'],
            "e"=>$row['CREATED_BY'],
            "f"=>$row['UPDATED_AT'],
            "g"=>$row['UPDATED_BY'],
            "h"=>$row['DELETED_STATUS'],
            "i"=>$row['DELETED_AT'],
            "j"=>$row['DELETED_BY'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);
*/
?>