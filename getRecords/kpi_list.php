<?php
include "connection.php";

$id = $_POST['id'];

$sql = "SELECT `RID`, `KPI_ID`, `KPI_CATEGORY`, `KPI_DESC`, `WEIGH`, `FORMULA`, `GOAL`, `ROW_COUNT`, `LAST_YEAR_SCORE`, `LAST_YEAR_GRADE`, `1Q_RESULT`, `1Q_SCORE`, `1Q_GRADE`, `2Q_RESULT`, `2Q_SCORE`, `2Q_GRADE`, `3Q_RESULT`, `3Q_SCORE`, `3Q_GRADE`, `4Q_RESULT`, `4Q_SCORE`, `4Q_GRADE`, `FINAL_RESULT`, `FINAL_SCORE`, `FINAL_GRADE` FROM `kpi_list` WHERE CONCAT(kpi_list.KPI_ID, COALESCE(kpi_list.DELETED_AT, '')) = '$id' ORDER BY ROW_COUNT ASC";

$result = $conn->query($sql);

// Convert result set to JSON
$records = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $records[] = array(
            "a"=>$row['RID'],
            "b"=>$row['KPI_CATEGORY'],
            "c"=>$row['KPI_DESC'],
            "d"=>$row['WEIGH'],
            "e"=>$row['FORMULA'],
            "f"=>$row['GOAL'],
            "Q1R"=>$row['1Q_RESULT'],
            "Q1S"=>$row['1Q_SCORE'],
            "Q1G"=>$row['1Q_GRADE'],
            "Q2R"=>$row['2Q_RESULT'],
            "Q2S"=>$row['2Q_SCORE'],
            "Q2G"=>$row['2Q_GRADE'],
            "Q3R"=>$row['3Q_RESULT'],
            "Q3S"=>$row['3Q_SCORE'],
            "Q3G"=>$row['3Q_GRADE'],
            "Q4R"=>$row['4Q_RESULT'],
            "Q4S"=>$row['4Q_SCORE'],
            "Q4G"=>$row['4Q_GRADE'],
            "resultR"=>$row['FINAL_RESULT'],
            "resultS"=>$row['FINAL_SCORE'],
            "resultG"=>$row['FINAL_GRADE'],
            "lastS"=>$row['LAST_YEAR_SCORE'],
            "lastG"=>$row['LAST_YEAR_GRADE'],

            
            
        );
    }
}

header('Content-Type: application/json');
echo json_encode($records);

?>