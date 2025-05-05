<?php
include "connection.php";

// $data = json_decode(file_get_contents("php://input"), true);

$dataArray = $_POST['dataArray'];
$year = $_POST['year'];

$records = array();

foreach($dataArray as $value){
    $name = $value['name'];
    $nameDesc = $value['nameDesc'];
    $dept = $value['dept'];
    $position = $value['position'];
    $jobtitle = $value['jobtitle'];

    $find = $name.'-'.$year;

    $sql = "SELECT `RID` FROM `kpi_masterlist` WHERE CONCAT(KPI_USER,'-',YEAR_ID, COALESCE(DELETED_AT, '')) = '$find'";
    $result = mysqli_query($conn, $sql);
    $fetch = mysqli_fetch_assoc($result);

    if(mysqli_num_rows($result) > 0){
        $kpiID = $fetch['RID'];

        $sqlKpi = "SELECT `RID`, `KPI_ID`, `KPI_CATEGORY`, `KPI_DESC`, `WEIGH`, `FORMULA`, `GOAL`, `ROW_COUNT`, `1Q_RESULT`, `1Q_SCORE`, `1Q_GRADE`, `2Q_RESULT`, `2Q_SCORE`, `2Q_GRADE`, `3Q_RESULT`, `3Q_SCORE`, `3Q_GRADE`, `4Q_RESULT`, `4Q_SCORE`, `4Q_GRADE`, `FINAL_RESULT`, `FINAL_SCORE`, `FINAL_GRADE` FROM `kpi_list` WHERE CONCAT(KPI_ID, COALESCE(kpi_list.DELETED_AT, '')) = '$kpiID' ORDER BY ROW_COUNT ASC";
        $resultKpi = $conn->query($sqlKpi);

        if ($resultKpi->num_rows > 0) {
            while ($row = $resultKpi->fetch_assoc()) {
                $records[] = array(
                    "name"=> $nameDesc,
                    "dept"=> $dept,
                    "position"=> $position,
                    "jobtitle"=> $jobtitle,
                    "c"=> $row['KPI_DESC'],
                    "d"=> $row['WEIGH'],
                    "e"=> $row['FORMULA'],
                    "f"=> $row['GOAL'],
                    "Q1R"=> formatNumber($row['1Q_RESULT']),
                    "Q1S"=> formatNumber($row['1Q_SCORE']),
                    "Q1G"=> $row['1Q_GRADE'],
                    "Q2R"=> formatNumber($row['2Q_RESULT']),
                    "Q2S"=> formatNumber($row['2Q_SCORE']),
                    "Q2G"=> $row['2Q_GRADE'],
                    "Q3R"=> formatNumber($row['3Q_RESULT']),
                    "Q3S"=> formatNumber($row['3Q_SCORE']),
                    "Q3G"=> $row['3Q_GRADE'],
                    "Q4R"=> formatNumber($row['4Q_RESULT']),
                    "Q4S"=> formatNumber($row['4Q_SCORE']),
                    "Q4G"=> $row['4Q_GRADE'],
                    "resultR"=> formatNumber($row['FINAL_RESULT']),
                    "resultS"=> formatNumber($row['FINAL_SCORE']),
                    "resultG"=> $row['FINAL_GRADE'],


                );
            }
        }

    }
}

echo json_encode($records);


function formatNumber($value) {
    // Remove unwanted characters like '%' and whitespace
    $cleanValue = str_replace('%', '', trim($value));


    // Convert to float and format to 2 decimal places
    $number = hasDecimal($cleanValue) ? number_format(floatval($cleanValue), 2, '.', '') : number_format(floatval($cleanValue));
    
    return $number;
}

function hasDecimal($value) {
    // Check if there's a decimal point in the value
    return strpos((string)$value, '.') !== false;
}

?>