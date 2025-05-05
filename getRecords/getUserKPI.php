<?php
include "connection.php";

$user = $_POST['user'];

$sql = "SELECT `RID`, `DEPARTMENT_ID`, `KPI_USER`, `1Q_RESULT`, `1Q_SCORE`, `1Q_GRADE`, `2Q_RESULT`, `2Q_SCORE`, `2Q_GRADE`, `3Q_RESULT`, `3Q_SCORE`, `3Q_GRADE`, `4Q_RESULT`, `4Q_SCORE`, `4Q_GRADE`, `FINAL_RESULT`, `FINAL_SCORE`, `FINAL_GRADE` FROM `kpi_masterlist` WHERE CONCAT(KPI_USER, COALESCE(DELETED_AT, '')) = '$user'";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        
        $records["a"] = $row['RID'];
        $records["b"] = $row['DEPARTMENT_ID'];
        $records["c"] = $row['KPI_USER'];
        $records["Q1R"] = $row['1Q_RESULT'];
        $records["Q1S"] = $row['1Q_SCORE'];
        $records["Q1G"] = $row['1Q_GRADE'];
        $records["Q2R"] = $row['2Q_RESULT'];
        $records["Q2S"] = $row['2Q_SCORE'];
        $records["Q2G"] = $row['2Q_GRADE'];
        $records["Q3R"] = $row['3Q_RESULT'];
        $records["Q3S"] = $row['3Q_SCORE'];
        $records["Q3G"] = $row['3Q_GRADE'];
        $records["Q4R"] = $row['4Q_RESULT'];
        $records["Q4S"] = $row['4Q_SCORE'];
        $records["Q4G"] = $row['4Q_GRADE'];
        $records["RR"] = $row['FINAL_RESULT'];
        $records["RS"] = $row['FINAL_SCORE'];
        $records["RG"] = $row['FINAL_GRADE'];
        
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