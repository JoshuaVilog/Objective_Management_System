<?php
include "connection.php";

$year = $_POST['year'];

$sql = "SELECT `RID`, `DEPARTMENT_ID`, `KPI_USER`, `EVAL_1`, `EVAL_2`, `EVAL_3`, `EVAL_4`, `1Q_SCORE`, `1Q_GRADE`, `2Q_SCORE`, `2Q_GRADE`, `3Q_SCORE`, `3Q_GRADE`,  `4Q_SCORE`, `4Q_GRADE`, `FINAL_SCORE`, `FINAL_GRADE` FROM `kpi_masterlist` WHERE CONCAT(YEAR_ID, COALESCE(DELETED_AT, '')) = '$year'";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "rid"=>$row['RID'],
            "dept"=>$row['DEPARTMENT_ID'],
            "user"=>$row['KPI_USER'],
            "e1"=>$row['EVAL_1'],
            "e2"=>$row['EVAL_2'],
            "e3"=>$row['EVAL_3'],
            "e4"=>$row['EVAL_4'],
            "qs1"=>$row['1Q_SCORE'],
            "qg1"=>$row['1Q_GRADE'],
            "qs2"=>$row['2Q_SCORE'],
            "qg2"=>$row['2Q_GRADE'],
            "qs3"=>$row['3Q_SCORE'],
            "qg3"=>$row['3Q_GRADE'],
            "qs4"=>$row['4Q_SCORE'],
            "qg4"=>$row['4Q_GRADE'],
            "fqs"=>$row['FINAL_SCORE'],
            "fqg"=>$row['FINAL_GRADE'],

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